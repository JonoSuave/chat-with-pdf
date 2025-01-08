'use client'

import useSubscription from "../../hooks/useSubscription"
import { Button } from "./ui/button"
import Link from "next/link"
import { Loader2Icon, StarIcon } from "lucide-react"
import { createStripePortal } from "@/actions/createStripePortal"
import { user}


function UpgradeButton() {
  return (
    <div>UpgradeButton</div>
  )
}

export default UpgradeButton