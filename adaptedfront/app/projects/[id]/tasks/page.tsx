import TasksPage from "@/components/tasks/tasks";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { id: number } }) {
	const session = await getServerSession(authOptions);
	return <TasksPage id={params.id} />;
}
