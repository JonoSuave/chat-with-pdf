import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const headersList = headers();
    const body = 
}