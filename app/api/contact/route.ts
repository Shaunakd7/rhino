import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Correct Twilio client initialization
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    const whatsappMessage = `
Rhino inquiry from website

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone || "Not provided"}

💬 Message:
${message}
    `;

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to: process.env.TWILIO_WHATSAPP_TO!,
      body: whatsappMessage,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
