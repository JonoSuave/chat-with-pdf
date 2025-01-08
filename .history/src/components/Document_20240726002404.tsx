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
    <div className="">Document</div>
  )
}

export default Document