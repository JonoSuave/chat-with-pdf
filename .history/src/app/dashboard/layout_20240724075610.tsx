import { ClerkLoaded } from "@clerk/nextjs";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
	return <ClerkLoaded>
        <Header
        {children}</ClerkLoaded>;
}

export default DashBoardLayout;
