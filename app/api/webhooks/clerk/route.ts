import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) throw new Error("Webhook secret not found.");
  try {
    const { type, data } = await verifyWebhook(request, {
      signingSecret: WEBHOOK_SECRET,
    });

    if (type === "user.created") {
      const { id, email_addresses, primary_email_address_id } = data;
      const primary_email = email_addresses.find(
        (email) => email.id === primary_email_address_id
      );

      if (!id || !primary_email) {
        return new Response("Error occured -- missing data", { status: 400 });
      }

      await prisma.user.upsert({
        where: { authId: id },
        create: {
          authId: id,
          name: data.first_name,
          email: primary_email.email_address,
        },
        update: {
          name: data.first_name,
          email: primary_email.email_address,
        },
      });
    }
    return NextResponse.json("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return NextResponse.json("Error verifying webhook", { status: 400 });
  }
}
