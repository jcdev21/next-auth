'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function FormRegister() {
	const router = useRouter();
	const params = useSearchParams();
	const registered = params.get('registered');
	const message = params.get('message');

	const submitHandle = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: { value: string };
			email: { value: string };
			password: { value: string };
		};
		const name = target.name.value;
		const email = target.email.value;
		const password = target.password.value;

		if (!name || !email || !password) return;

		const payload = {
			name,
			email,
			password,
			role: 'MEMBER',
		};

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			const data = await res.json();

			const paramsFailed = new URLSearchParams({
				registered: 'failed',
				message: data.message,
			});

			router.push(`/register?${paramsFailed.toString()}`);
			return;
		}

		router.push('/login?registered=success');
	};

	return (
		<div className="h-screen flex flex-col justify-center items-center gap-4">
			{registered === 'failed' ? (
				<div className="bg-red-200 p-4 rounded-lg">
					<span className="font-semibold">{message}</span>
				</div>
			) : null}
			<form
				method="POST"
				onSubmit={submitHandle}
				className="w-[350px] p-10 flex flex-col gap-8 border border-slate-200"
			>
				<div>
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="w-full px-4 py-2 border border-slate-200"
					/>
				</div>
				<div>
					<input
						type="email"
						name="email"
						placeholder="Email"
						className="w-full px-4 py-2 border border-slate-200"
					/>
				</div>
				<div>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className="w-full px-4 py-2 border border-slate-200"
					/>
				</div>
				<div className="flex gap-5">
					<button className="bg-slate-400 p-2">SignUp</button>
				</div>
				<div>
					<Link href="/login" className="text-sky-400">
						Back to Login
					</Link>
				</div>
			</form>
		</div>
	);
}
