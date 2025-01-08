"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { collection, doc } from "firebase/firestore";

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

    // Listen to the user's files collection
    const [fileSnapshot, fileLoading, fileError] = useCollection(
        user && collection(db, "users", user.id, "files")
    )

    useEffect(() => {
        if (!snapshot) return;

        const data = snapshot.data();
        if (!data) return;

        setHasActiveMembership(data.activeMembership);
        
    }, [snapshot]);

    useEffect(() => {
        if(!fileSnapshot || hasActiveMembership === null) return; // null is for loading state

        const files = fileSnapshot.docs;
        const usersLimit = hasActiveMembership ? PRO_LIMIT : FREE_LIMIT;

    }, [fileSnapshot, hasActiveMembership]);
}

export default useSubscription;
