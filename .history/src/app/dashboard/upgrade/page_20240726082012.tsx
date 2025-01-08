import { auth } from "@clerk/nextjs/server";

function PricingPage() {
	auth().protect(); // Protect this route with Clerk
	return <div>
        <div>
            <div>
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                    Pricing
                    </h2>
                    <p></p>
            </div>
        </div>
    
    </div>;
}

export default PricingPage;
