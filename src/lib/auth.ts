import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { db } from './db';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { Role } from '@prisma/client';

const prismaAdapter = PrismaAdapter(db);

// @ts-ignore
prismaAdapter.createUser = (data) => {
	const role = 'MEMBER' as Role;
	const payload = {
		...data,
		role,
		password: '',
		type: 'google',
		active: true,
	};

	return db.user.create({ data: payload });
};

export const authOptions: NextAuthOptions = {
	adapter: prismaAdapter,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await db.user.findUnique({
					where: { email: credentials?.email },
				});

				if (!user) {
					return null;
				}

				if (!user.active) {
					throw new Error('User is not active');
				}

				if (
					user &&
					credentials?.password &&
					(await compare(credentials.password, user.password))
				) {
					return user;
				} else {
					throw new Error('Failed login');
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile }) {
			if (account?.provider === 'google') {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.picture = user.image;
				token.role = user.role;
			} else if (account?.provider === 'credentials') {
				const dbUser = await db.user.findFirst({
					where: { email: token.email! },
				});

				if (!dbUser) {
					if (user) {
						token.id = user.id;
					}
					return token;
				}

				token.id = dbUser.id;
				token.email = dbUser.email;
				token.name = dbUser.name;
				token.picture = dbUser.image;
				token.role = dbUser.role;
			}

			return token;
		},
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
	},
};
