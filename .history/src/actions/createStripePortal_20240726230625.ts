'use server'

import { auth } from "@clerk/nextjs/server";

export async function createStripePortal() {
    auth().protect();
}