import { auth } from "@clerk/nextjs/server";


function Pricing() {
    auth().protect(); // Protect this route with Clerk
  return (
    <div>Pricing</div>
  )
}

export default Pricing