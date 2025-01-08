"use client";

import { useRouter } from "next/navigation";
import byteSize from "byte-size";
import { DownloadCloud, Trash2Icon } from "lucide-react";
import useSubscription from "../../hooks/useSubscription";
import { useTransition } from "react";

function Document({
	id,
	name,
	size,
	downloadUrl,
}: {
	id: string;
	name: string;
	size: string;
	downloadUrl: string;
}) {
	const router = useRouter();
	const { hasActiveMembership } = useSubscription();
	const [isDeleting, startTransition] = useTransition();



	return (
		<div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white cursor-pointer group">
			<div
				className="flex-1"
				onClick={() => {
					router.push(`/dashboard/files/${id}`);
				}}>
				<p className="font-semibold line-clamp-2">{name}</p>
				{/* render size of file */}
				{byteSize(parseInt(size)).value} KB
			</div>

			d
		</div>
	);
}

export default Document;
