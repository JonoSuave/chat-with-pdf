"use server";

import { auth } from "@clerk/nextjs/server";

const FREE_LIMIT = 3;
const PRO_LIMIT = 10;

export async function askQuestion(id: string, question: string) {

}