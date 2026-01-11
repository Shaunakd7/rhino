import { NextResponse } from "next/server";
import Twilio from "twilio";

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    const whatsappMessage = `
📩 *New Website Lead*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone || "N/A"}

💬 *Message:*
${message}
    `;

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to: process.env.TWILIO_WHATSAPP_TO!,
      body: whatsappMessage,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Twilio error:", err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
