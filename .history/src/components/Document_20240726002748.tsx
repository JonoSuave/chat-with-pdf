'use client'

import { useRouter } from "next/navigation";

function Document({
    id, name, size, downloadUrl
}: {
    id: string;
    name: string;
    size: string;
    downloadUrl: string;
}) {
    const router = useRouter();
  return (
    <div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white cursor-pointer group">
        <div>
            <p className="font-semibold line-clamp-2">{name}</p>
            {/* render size of f}
        </div>
    </div>
  )
}

export default Document