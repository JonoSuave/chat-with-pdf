'use server'

import { UserDetails } from "@/app/dashboard/upgrade/page";
import { auth } from "@clerk/nextjs/server";

export async function createCheckoutSession(userDetails: UserDetails) {
    const { userId } = await auth();
    
}