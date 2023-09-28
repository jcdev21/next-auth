import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Dashboard() {
	const session = await getServerSession();
	console.log(session);

	return <div>Dashboard</div>;
}
