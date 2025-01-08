'use server'

export async function createStripePortal() {
    auth().protect();
}