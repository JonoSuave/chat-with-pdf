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
    <div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:t">Document</div>
  )
}

export default Document