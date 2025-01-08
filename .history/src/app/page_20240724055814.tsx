import {
	BrainCogIcon,
	EyeIcon,
	GlobeIcon,
	MonitorSmartphoneIcon,
	ServerCogIcon,
	ZapIcon,
} from "lucide-react";

const features = [
	{
		name: "Store your PDF Documents",
		description: "Keep all your PDF documents in one place.",
		item: GlobeIcon,
	},
	{
		name: "Blazing Fast Responses",
		description: "Our servers are optimized for speed.",
		item: ZapIcon,
	},
	{
		name: "Secure and Encrypted",
		description: "Your data is safe with us.",
		item: ServerCogIcon,
	},
	{
		name: "Responsive Across Devices",
		description: "Access and chat with your PDFs on any device.",
		item: MonitorSmartphoneIcon,
	},
	{
		name: "AI Powered Search",
		description: "Find your documents in seconds.",
		item: BrainCogIcon,
	},
	{
		name: "Accessibility",
		description: "Our app is designed for everyone.",
		item: EyeIcon,
	},
];

export default function Home() {
	return (
		<main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600">
			<div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
				<div
        
        ></div>
			</div>
		</main>
	);
}
