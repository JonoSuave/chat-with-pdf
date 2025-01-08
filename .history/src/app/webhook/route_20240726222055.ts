import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
	const headersList = headers();
	const body = await req.text();
	const signature = headersList.get("stripe-signature");

	if (!signature) {
		return new Response("No signature", { status: 400 });
	}

	if (!process.env.STRIPE_WEBHOOK_SECRET) {
		console.log("Stripe webhook secret is not set.");
		return new Response("Stripe webhook secret is not set", { status: 400 });
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.log(`Webhook Error: ${err}`);
		return new Response("Webhook Error verifying event", { status: 400 });
	}

    switch (event.type) {
}
