import { Metadata } from 'next';
import React from 'react';
import Navbar from './Navbar';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Learn Next Auth',
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="p-10">
			<Navbar />
			{children}
		</div>
	);
}
