'use server'

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebaseAdmin";

export async function createStripePortal() {
    auth().protect();

    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    // get customer ID from firebase
    const user = await adminDb.collection("users").doc(userId).get();
    const stripeCustomerId = user.data()?.stripeCustomerId;

    if (!stripeCustomerId) {
        throw new Error("Stripe customer ID not found");
    }

    
}