import { auth } from "@clerk/nextjs/server";

function PricingPage() {
	auth().protect(); // Protect this route with Clerk
	return (
		<div>
			<div>
				<div>
					<h2 className="text-base font-semibold leading- text-indigo-600">Pricing</h2>
					<p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:tex-5xl">
						Supercharge your Document Companion
					</p>
				</div>
			</div>
		</div>
	);
}

export default PricingPage;
