import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { token: string } }
) => {
	const { token } = params;

	const user = await db.user.findFirst({
		where: {
			active: false,
			verificationToken: {
				some: {
					AND: [
						{
							expires: {
								gt: new Date(Date.now()),
							},
						},
						{
							token,
						},
					],
				},
			},
		},
	});

	if (!user) {
		throw new Error('Token is invalid or expired');
	}

	await db.user.update({
		where: {
			id: user.id,
		},
		data: {
			active: true,
		},
	});

	redirect('/login');
};
