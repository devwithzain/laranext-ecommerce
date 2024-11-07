import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "The Broadcast Store",
	description: "Laravel Backend Next Frontend",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
