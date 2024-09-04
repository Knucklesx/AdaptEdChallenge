import Projects from "@/components/projects/projects";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Page() {
	const session = await getServerSession(authOptions);
	return <Projects />;
}
