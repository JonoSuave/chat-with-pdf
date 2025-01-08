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
    <div className="flex flex-col w-64 ">Document</div>
  )
}

export default Document