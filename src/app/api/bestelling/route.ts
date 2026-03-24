import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { naam, email, telefoon, adres, publicatie, prijs } = body;

    if (!naam || !email || !publicatie) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 },
      );
    }

    const recipientEmail =
      process.env.ARCHIVE_REQUEST_EMAIL || "info.seddeh@gmail.com";

    await resend.emails.send({
      from: "Publicatie Bestelling <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `Bestelling: ${escapeHtml(publicatie)}`,
      html: `
        <h2>Nieuwe Publicatie Bestelling</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Publicatie</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(publicatie)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Prijs</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(prijs || "Onbekend")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Naam</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(naam)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefoon</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(telefoon || "Niet opgegeven")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Adres</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(adres || "Niet opgegeven")}</td>
          </tr>
        </table>
        <p style="margin-top: 16px; color: #666; font-size: 14px;">
          <em>Alle genoemde prijzen zijn excl. eventuele verzendkosten.</em>
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send order email:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verzenden." },
      { status: 500 },
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
