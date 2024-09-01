import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Page() {
	const session = await getServerSession(authOptions);
	console.log("session2", session);
	return (
		<main>
			<h1>Task Page</h1>
		</main>
	);
}
