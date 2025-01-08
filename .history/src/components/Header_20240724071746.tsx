"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import React from "react";

export default function Header() {
    return (
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <UserButton />
        </div>
    )
};


