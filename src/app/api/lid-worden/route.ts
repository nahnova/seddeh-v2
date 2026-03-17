import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { naam, email, telefoon, adres, motivatie } = body;

    if (!naam || !email) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 },
      );
    }

    const recipientEmail =
      process.env.MEMBER_SIGNUP_EMAIL ||
      process.env.ARCHIVE_REQUEST_EMAIL ||
      "info.seddeh@gmail.com";

    await resend.emails.send({
      from: "Lidmaatschap Aanvraag <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `Nieuwe Lidmaatschap Aanvraag: ${escapeHtml(naam)}`,
      html: `
        <h2>Nieuwe Lidmaatschap Aanvraag</h2>
        <table style="border-collapse: collapse; width: 100%;">
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
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Motivatie</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(motivatie || "Niet opgegeven")}</td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send member signup email:", error);
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
