import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				// get data from db with credentials

				if (credentials?.email !== 'superadmin@gmail.com') {
					throw Error('Failed login');
				}

				const user = Promise.resolve({
					id: 'userId',
					email: credentials?.email,
				});

				if (user) {
					return user.then();
				} else {
					throw Error('Error oii');
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
			// get data from db

			return {
				id: 'userId',
				email: user?.email || token.email,
				name: 'JUNDI',
				picture: 'image-path',
				role: 'ADMIN',
			};
		},
	},
};
