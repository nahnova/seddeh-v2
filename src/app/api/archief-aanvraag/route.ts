import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, phone, subject, description, preferredDate } = body;

    if (!name || !email || !subject || !description) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 },
      );
    }

    const recipientEmail =
      process.env.ARCHIVE_REQUEST_EMAIL ||
      "info@stichting-eygelshovendoordeeeuwenheen.nl";

    await resend.emails.send({
      from: "Archief Aanvraag <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `Archief Aanvraag: ${subject}`,
      html: `
        <h2>Nieuwe Archief Aanvraag</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Naam</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefoon</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(phone || "Niet opgegeven")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Voorkeursdatum</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(preferredDate || "Niet opgegeven")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Onderwerp</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(subject)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Beschrijving</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(description)}</td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send archive request email:", error);
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
