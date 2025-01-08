"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

export default function Header() {
	return (
		<div>
            <Link href='/dashboard'
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	);
}
