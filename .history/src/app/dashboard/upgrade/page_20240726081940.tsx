import { auth } from "@clerk/nextjs/server";

function PricingPage() {
	auth().protect(); // Protect this route with Clerk
	return <div>
        <div>
            <div>
                <h2 className="text-base font-semibold ">Pricing</h2>
            </div>
        </div>
    
    </div>;
}

export default PricingPage;
