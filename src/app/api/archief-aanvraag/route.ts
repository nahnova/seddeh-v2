import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/escapeHtml";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Te veel verzoeken. Probeer het later opnieuw." },
        { status: 429 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { name, email, phone, subject, description, preferredDate, website } =
      body;

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true });
    }

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
      subject: `Archief Aanvraag: ${escapeHtml(subject)}`,
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
