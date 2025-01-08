import { Button } from "@/components/ui/button";
import {
	BrainCogIcon,
	EyeIcon,
	GlobeIcon,
	MonitorSmartphoneIcon,
	ServerCogIcon,
	ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
				<div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl sm:text-center">
						<h2 className="text-base font-semibold leading-7 text-indigo-600">
							Your Interactive Dcoument Companion
						</h2>

						<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Transform Your PDFs into Interactive Conversations
						</p>
						<p>
							Introducing <span className="text-indigo-600 font-bold">Chat with PDF.</span>
							<br />
							<br /> Upload your document, and our chatbot will answer questions, summarize content,
							and asnwer all your Qs. Ideal for everyone,{" "}
							<span className="text-indigo-600"> Chat with PDF</span>{" "}
							<span className="font-bold">dynamic conversations</span>, enhancing productivity 10x
							fold effortlessly.
						</p>
					</div>

					<Button asChild className="mt-10">
						<Link href="/dashboard">Get Started</Link>
					</Button>
				</div>
				<div className="relative overflow-hidden pt-16">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<Image
							alt="App screenshot"
							src="https://i.imgur.com/VciRSTI.jpeg"
							width={2432}
							height={1442}
							className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
						/>
						<div aria-hidden="true" className="relative">
							<div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-white/95 pt-[5%]"></div>
						</div>
					</div>
				</div>
        <div className="">
          <dl>
            {features.map((feature => ()))}
          </dl>
        </div>
			</div>
		</main>
	);
}
