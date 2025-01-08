"use client";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import useSubscription from "../../hooks/useSubscription";

function PlaceholderDocument() {
	const {isOverFileLimit} = useSubscription();
	const router = useRouter();
	const handleClick = () => {
        // Check if user is FREE tier and if they're over the file limit, push to upgrade page
        if (isOverFileLimit) {
			return router.push("/dashboard/upgrade");
		} else

		router.push("/dashboard/upload");
	};

	return (
		<Button
			onClick={handleClick}
			className="flex flex-col items-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400">
			<PlusCircleIcon className="h-16 w-16" />
			<p>Add a document</p>
		</Button>
	);
}

export default PlaceholderDocument;
