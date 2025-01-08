"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<div>
            <Link href='/dashboard' className="text-2xl">Chat to <span className="text-indigo-600">PDF</span></Link>
            <SignedIn>
                <div>
                    <Button>
                        <Link href='/dashboard'>Pricing</Link>
                    </Button>
                    {/* Upgrade Button */}
                    <UserButton />
                </div>
            </SignedIn>
			{/* <SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn> */}
		</div>
	);
}
