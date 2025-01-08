"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Header() {
	return (
		<div className="flex justify-between bg-white shadow-sm ">
			<Link href="/dashboard" className="text-2xl">
				Chat to <span className="text-indigo-600">PDF</span>
			</Link>
			<SignedIn>
				<div className="flex items-center space-x-2">
					<Button asChild variant="link" className="hidden md:flex">
						<Link href="/dashboard/upgrade">Pricing</Link>
					</Button>
					{/* Upgrade Button */}
					<UserButton />
				</div>
			</SignedIn>
		</div>
	);
}
