"use client";

import { useRouter } from "next/navigation";
import byteSize from "byte-size";
import { DownloadCloud, Trash2Icon } from "lucide-react";
import useSubscription from "../../hooks/useSubscription";
import { useTransition } from "react";
import { Button } from "./ui/button";

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

			{/* Actions */}


			<div className="flex space-x-2 justify-end">
				<Button
					variant="outline"
					disabled={isDeleting || !hasActiveMembership}
					onClick={async() => {
						const prompt 
						}}
					>
					<Trash2Icon className="h-6 w-6 text-indigo-600" /></Button>
				<Button variant="outline" asChild>
					<a href={downloadUrl} download>
						<DownloadCloud className="h-6 w-6 text-indigo-600" />
					</a>
				</Button>
			</div>
		</div>
	);
}

export default Document;
