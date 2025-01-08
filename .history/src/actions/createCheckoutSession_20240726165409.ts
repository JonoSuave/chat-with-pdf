'use server'

import { UserDetails } from "@/app/dashboard/upgrade/page";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebaseAdmin";

export async function createCheckoutSession(userDetails: UserDetails) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    // first check if the user already has a stripeCustomerId
    const user = await adminDb.collection("users").doc(userId).get();
    const stripeCustomerId = user.data()?.stripeCustomerId;

    if

}