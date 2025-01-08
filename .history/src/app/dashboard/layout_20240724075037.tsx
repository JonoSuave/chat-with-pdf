import { ClerkLoaded } from "@clerk/nextjs";

function DashBoardLayout({ children }: { children: React.ReactNode }) {
	return <ClerkLoaded>
        
        {children}
        </ClerkLoaded>;
}

export default DashBoardLayout;
