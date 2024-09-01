import LoginForm from "@/components/login/loginForm";

export default function Page() {
	return (
		<div className="container mx-auto h-screen flex items-center justify-center">
			<div className="w-full lg:w-8/12 px-4">
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
					<div className="rounded-t mb-0 px-6 py-6">
						<div className="text-center mb-3">
							<h6 className="text-blueGray-500 font-sm font-bold">EdTech</h6>
						</div>
						<hr className="mt-6 border-b-1 border-blueGray-300" />
					</div>
					<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
						<div className="text-center mb-3">
							<h6 className="text-blueGray-500 font-sm font-bold">LOGIN</h6>
						</div>
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}
