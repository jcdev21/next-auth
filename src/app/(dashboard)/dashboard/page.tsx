import Link from 'next/link';
import React from 'react';

export default async function Dashboard() {
	console.log('DASHBOARD');

	return (
		<div>
			<h1>Dashboard</h1>
			<div>
				<Link href="/about">About</Link>
			</div>
		</div>
	);
}
