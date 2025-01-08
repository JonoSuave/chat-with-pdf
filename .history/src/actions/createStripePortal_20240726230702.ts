'use server'

import { auth } from "@clerk/nextjs/server";

export async function createStripePortal() {
    auth().protect();

    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    // get customer ID from firebase
    const user = await adminDb.collection("users").doc(userId).get();
    c
}