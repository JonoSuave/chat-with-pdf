import { auth } from "@clerk/nextjs/server";

function PricingPage() {
	auth().protect(); // Protect this route with Clerk
	return (
		<div>
			<div className="py-24 sm:py-32">
				<div className="mx-w-4xl mx-auto text-center">
					<h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
					<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:tex-5xl">
						Supercharge your Document Companion
					</p>
				</div>

                <p>
                    Choose an affordable plan that
                </p>
			</div>
		</div>
	);
}

export default PricingPage;
