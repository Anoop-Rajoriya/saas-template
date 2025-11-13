import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      try {
        const { email_addresses, primary_email_address_id } = evt.data;
        const primary_email = email_addresses.find(
          (e) => e.id === primary_email_address_id
        );

        if (!primary_email) {
          console.error("No primary_email found");
          return NextResponse.json("No primary_email found", { status: 404 });
        }

        // create user in application db

        const userRowRes = await prisma.user.create({
          id: evt.data.id,
          email: primary_email.email_address,
          name: `${evt.data.first_name} ${evt.data.last_name}`,
          subscribed: false,
        });
      } catch (error) {}
    } else {
      console.error(
        "Unexpacted event type occur in register webhook: ",
        eventType
      );
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
