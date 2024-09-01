import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		access_token?: string;
		user: {
			access_token?: string;
		} & DefaultSession["user"];
	}

	interface User {
		access_token?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		access_token?: string;
	}
}
