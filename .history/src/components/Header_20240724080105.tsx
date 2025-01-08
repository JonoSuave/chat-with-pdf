"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function Header() {
	return (
		<div>
            <Link href='/dashboard'>Chat to <span className="text-indigo-600">PDF</span></Link>
            <SignedIn
			{/* <SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn> */}
		</div>
	);
}
