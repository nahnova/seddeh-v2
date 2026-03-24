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
    const { naam, email, onderwerp, bericht, website } = body;

    // Honeypot — bots fill this hidden field
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!naam || !email || !bericht) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 },
      );
    }

    const recipientEmail =
      process.env.ARCHIVE_REQUEST_EMAIL || "info.seddeh@gmail.com";

    await resend.emails.send({
      from: "Contactformulier <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `Contact: ${escapeHtml(onderwerp || "Algemene vraag")}`,
      html: `
        <h2>Nieuw contactbericht</h2>
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
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Onderwerp</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(onderwerp || "Algemene vraag")}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bericht</td>
            <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-line;">${escapeHtml(bericht)}</td>
          </tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verzenden." },
      { status: 500 },
    );
  }
}
