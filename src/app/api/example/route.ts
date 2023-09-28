import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		const token = await getToken({ req });
		console.log(session);
		console.log(token);

		return new Response(null, { status: 200 });
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}
