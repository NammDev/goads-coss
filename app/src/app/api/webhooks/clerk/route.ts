import { headers } from "next/headers";
import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type ClerkUserEvent = {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email_addresses: Array<{ email_address: string; id: string }>;
    primary_email_address_id: string;
    deleted?: boolean;
  };
};

function getPrimaryEmail(data: ClerkUserEvent["data"]): string {
  const primary = data.email_addresses.find(
    (e) => e.id === data.primary_email_address_id
  );
  return primary?.email_address ?? data.email_addresses[0]?.email_address ?? "";
}

function getFullName(data: ClerkUserEvent["data"]): string {
  return [data.first_name, data.last_name].filter(Boolean).join(" ") || "User";
}

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();

  let event: ClerkUserEvent;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkUserEvent;
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  const { type, data } = event;

  try {
    if (type === "user.created") {
      // Insert user into DB with default customer role
      await db.insert(users).values({
        id: data.id,
        name: getFullName(data),
        email: getPrimaryEmail(data),
        role: "customer",
      });
      // Set Clerk publicMetadata so requireRole() picks up the role
      const clerk = await clerkClient();
      await clerk.users.updateUserMetadata(data.id, {
        publicMetadata: { role: "customer" },
      });
    } else if (type === "user.updated") {
      await db
        .update(users)
        .set({
          name: getFullName(data),
          email: getPrimaryEmail(data),
          updatedAt: new Date(),
        })
        .where(eq(users.id, data.id));
    } else if (type === "user.deleted") {
      await db.delete(users).where(eq(users.id, data.id));
    }
  } catch (err) {
    console.error(`[clerk-webhook] failed to handle ${type}:`, err);
    return new Response("Database error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
