import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { adminDb } from "../../../firebaseAdmin";

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

    const getUserDetails = async (customerId: string) => {
        const user = await adminDb.collection("users").where("stripeCustomerId", "==", customerId)
        .limit(1)
        .get();

        if (!user.empty) {
            return user.docs[0].data();
        }

        return null;
    };

    switch (event.type) {
        case "checkout.session.completed":
        case "payment_intent.succeeded": {
            const invoice = event.data.object;
            const customerId = invoice.customer as string;

            const userDetails = await getUserDetails(customerId);
            if (!userDetails) {
                console.log("User not found");
                return new Response("User not found", { status: 404 });
            }

            //Update the user's subscription status
            await adminDb.collection("users").doc(userDetails.id).update({
                hasActiveMembership: true,
            });
            break;
        }
        case "customer.subscription.deleted":
            case "subscription_schedule.canceled": {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const userDetails = await getUserDetails(customerId);
                if (!userDetails) {
                    console.log("User not found");
                    return new Response("User not found", { status: 404 });
                }

                
            }
    }
}
