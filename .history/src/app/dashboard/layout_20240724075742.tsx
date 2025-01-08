import Header from "@/components/Header";
import { ClerkLoaded } from "@clerk/nextjs";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkLoaded>
			<div className="flex-1 flex flex-col"><Header />
			{children}</div>
		</ClerkLoaded>
	);
}

export default DashBoardLayout;
