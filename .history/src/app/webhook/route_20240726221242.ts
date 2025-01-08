import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const headersList = headers();
    const body = await req.text();
    const signature = headersList.get("stripe-signature");

    if(!signature) {
        return new Response("No signature", { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console
        return new Response("No webhook secret", { status: 400 });
    }

}