"use server";

import { UserDetails } from "@/app/dashboard/upgrade/page";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebaseAdmin";
import stripe from "@/lib/stripe";
import getBaseUrl from "@/lib/getBaseUrl";

export async function createCheckoutSession(userDetails: UserDetails) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	// first check if the user already has a stripeCustomerId
    let stripeCustomerId;

	const user = await adminDb.collection("users").doc(userId).get();
	stripeCustomerId = user.data()?.stripeCustomerId;

	if (!stripeCustomerId) {
		// create a new stripe customer
		const customer = await stripe.customers.create({
			email: userDetails.email,
			name: userDetails.name,
			metadata: {
				userId,
			},
		});

        await adminDb.collection("users").doc(userId).set({
            stripeCustomerId: customer.id,
        });

        stripeCustomerId = customer.id;
	}

    // create a checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
            {
                price: process.env.STRIPE_PRO_TIER_PRICE_ID,
                quantity: 1,
            },
        ],
        customer: stripeCustomerId,
        success_url: `${getBaseUrl()}/dash`
        });
}
