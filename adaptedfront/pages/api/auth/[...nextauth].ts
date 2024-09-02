import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const secret = process.env.NEXTAUTH_SECRET;

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials, _) {
				const { username, password } = credentials as {
					username: string;
					password: string;
				};
				if (!username || !password) {
					throw new Error("Missing username or password");
				}

				const email = `${username}@${username}`;

				const auth = await fetch("http://localhost:3001/auth", {
					body: JSON.stringify({
						username,
						password,
					}),
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				});
				if (!auth.ok) {
					throw new Error("ops, something went wrong");
				}
				const user = await auth.json();
				return {
					name: user.username,
					email: email,
					image: `https://robohash.org/${email}`,
					sub: user.id,
					role: user.role,
					access_token: user.token,
					...user,
				};
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.access_token = user.access_token;
			}
			return token;
		},
		session: async ({ session, token }) => {
			session.access_token = token.access_token;
			session.user = {
				...session.user,
				access_token: token.access_token,
			};
			return session;
		},
	},
	debug: true,
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
