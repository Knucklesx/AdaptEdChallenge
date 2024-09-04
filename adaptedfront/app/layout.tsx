// These styles apply to every route in the application

import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
	variable: "--font-inter",
	preload: false,
});

import ClientLayout from "@/components/clientLayout";
// import "@/styles/app.css";
import "@/styles/globals.css";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang="en">
				<head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<title>Adapt Edtech</title>
				</head>
				<body className={`${inter.variable} text-blueGray-700 antialiased`}>
					<main>
						{/* <section className="relative w-full h-full py-40 min-h-screen"> */}
						<div className="absolute top-0 w-full h-full bg-purple-300"></div>
						<ClientLayout>{children}</ClientLayout>
						{/* </section> */}
					</main>
				</body>
			</html>
		</>
	);
}
