import EditProject from "@/components/projects/editProject";

export default function Page({ params }: { params: { id: number } }) {
	return <EditProject id={params.id} />;
}
