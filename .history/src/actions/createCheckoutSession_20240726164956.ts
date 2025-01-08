'use server'

import { UserDetails } from "@/app/dashboard/upgrade/page";
import { auth } from "@clerk/nextjs/server";

export async function createCheckoutSession(userDetails: UserDetails) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    // first check if the user already has a stripeCustomerId
    const user = await db.collection("users").doc(userId).get();
    

}