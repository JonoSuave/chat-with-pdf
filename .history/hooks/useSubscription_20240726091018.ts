"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { doc } from "firebase/firestore";

const PRO_LIMIT = 20;
const FREE_LIMIT = 3;

function useSubscription() {
	const [hasActiveMembership, setHasActiveMembership] = useState(null);
	const [isOverFileLimit, setIsOverFileLimit] = useState(false);
	const { user } = useUser();

    // Listen to the User document
	const [snapshot, loading, error] = useDocument(user && doc(db, "users", user.id),
    {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    const [fileSnap]
}

export default useSubscription;
