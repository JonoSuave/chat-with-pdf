import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.body.json();

    console.log(body);

    return {
        status: 200,
        body: { received: true },
    };
}