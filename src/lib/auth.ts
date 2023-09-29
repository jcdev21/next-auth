import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await db.user.findUnique({
					where: { email: credentials?.email },
				});

				if (
					user &&
					credentials?.password &&
					(await compare(credentials.password, user.password))
				) {
					return user;
				} else {
					throw Error('Failed login');
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
				session.user.role = token.role;
			}

			return session;
		},
		async jwt({ token, user }) {
			const dbUser = await db.user.findFirst({
				where: { email: token.email! },
			});

			if (!dbUser) {
				if (user) {
					token.id = user.id;
				}
				return token;
			}

			return {
				id: dbUser.id,
				email: dbUser.email,
				name: dbUser.name,
				picture: dbUser.image,
				role: dbUser.role,
			};
		},
	},
};
