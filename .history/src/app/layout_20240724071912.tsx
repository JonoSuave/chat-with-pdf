import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className="min-h-screen h-screen overflow-hidden flex flex-col"><Header /> {children}</body>
			</html>
		</ClerkProvider>
	);
}
