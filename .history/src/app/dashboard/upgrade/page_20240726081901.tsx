import { auth } from "@clerk/nextjs/server";

function PricingPage() {
	auth().protect(); // Protect this route with Clerk
	return <div>
        div
    
    </div>;
}

export default PricingPage;
