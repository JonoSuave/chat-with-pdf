import { PlusCircleIcon } from "lucide-react"
import { Button } from "./ui/button"

function PlaceholderDocument() {
  return <Button>
    <PlusCircleIcon className="h-16 w-" />
    <p>Add a document</p>
  </Button>

}

export default PlaceholderDocument