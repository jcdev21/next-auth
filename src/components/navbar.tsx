import Link from 'next/link';
import React from 'react';

export default function Navbar() {
	return (
		<div className="h-20 px-10 flex justify-between items-center bg-slate-300">
			<Link href="/" className="font-semibold">
				Logo
			</Link>
			<Link
				href="/login"
				className="p-2 bg-sky-400 text-slate-100 rounded-lg"
			>
				Login
			</Link>
		</div>
	);
}
