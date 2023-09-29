import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import Info from './Info';

export default async function Dashboard() {
	const session = await getServerSession(authOptions);
	console.log(session);

	return (
		<div>
			<h1>Dashboard</h1>
			<div>
				<Link href="/about">About</Link>
			</div>
			<Info />
		</div>
	);
}
