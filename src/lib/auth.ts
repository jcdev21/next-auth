import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = Promise.resolve({
					id: 1,
					email: credentials?.email,
					role: 'ADMIN',
				});
				console.log('credentials', credentials);

				if (user) {
					return user.then();
				} else {
					throw Error('Error oii');
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},
};
