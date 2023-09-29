'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

export default function Navbar() {
	const logoutHandle = () => {
		signOut();
	};

	return (
		<nav className="bg-slate-300 p-5">
			<button onClick={logoutHandle} className="p-3 bg-sky-400">
				Logout
			</button>
		</nav>
	);
}
