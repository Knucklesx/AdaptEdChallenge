import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";
import "../globals.css";

export function HeaderStats() {
	return <>{""}</>;
}

export default async function Layout({ children }: PropsWithChildren) {
	const session = await getServerSession(authOptions);
	return (
		<>
			<html lang="en">
				<head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<meta charSet="utf-8" />
					<meta name="theme-color" content="#000000" />
					<title>Adapt Edtech</title>
				</head>
				<body className={`text-blueGray-700 antialiased bg-blueGray-100`}>
					<div className="relative md:ml-64 bg-blueGray-100">
						<div className="px-4 md:px-10 mx-auto w-full">{children}</div>
					</div>
				</body>
			</html>
		</>
	);
}
