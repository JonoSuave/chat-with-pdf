import { auth } from "@clerk/nextjs/server";


function Upgrade() {
    auth().protect(); // Protect this route with Clerk
  return (
    <div>Upgrade</div>
  )
}

export default Upgrade