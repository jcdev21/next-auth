import { db } from '@/lib/db';
import { sendMail } from '@/lib/mailService';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';

export const POST = async (req: Request) => {
	try {
		const { name, email, password, role } = await req.json();

		const user = await db.user.findUnique({ where: { email } });

		if (user) {
			return NextResponse.json(
				{
					message: 'Email already exists',
				},
				{
					status: 409,
				}
			);
		}

		const userCreated = await db.user.create({
			data: {
				name,
				email,
				password: await hash(password, 10),
				role,
			},
		});

		const { password: _, ...restUserCreated } = userCreated;

		const token = await db.verificationToken.create({
			data: {
				token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
				identifier: userCreated.id,
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
			},
		});

		// get email template
		const dirr = path.resolve(
			path.join(process.cwd(), 'public/html', 'email-verification.html')
		);
		const template = fs.readFileSync(dirr);
		await sendMail(
			'Verification Acoount : LearnNextAuth',
			userCreated.email,
			template.toString(),
			{
				token: token.token,
				name: userCreated.name,
			}
		);

		return NextResponse.json(
			{
				message: 'Successfully registered user',
				data: restUserCreated,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		console.log('ERROR', error);

		return NextResponse.json(
			{
				message: 'Server Error',
			},
			{
				status: 500,
			}
		);
	}
};
