import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkLoaded>
			<div className="flex-1 flex flex-col h-screen"><Header />
			<main className="flex-1">{children}</main></div>
		</ClerkLoaded>
	);
}

export default DashBoardLayout;
