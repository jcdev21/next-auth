'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function FormLogin() {
	const router = useRouter();
	const params = useSearchParams();
	const registered = params.get('registered');

	const submitHandle = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;
		const res = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (!res?.error) {
			router.push('/dashboard');
		} else {
			console.log('ERROR');
			console.log(res);
		}
	};

	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
			{registered === 'success' ? (
				<div className="bg-sky-200 p-4 rounded-lg">
					<span className="font-semibold">
						Check your email to account verification
					</span>
				</div>
			) : null}
			<form
				method="POST"
				onSubmit={submitHandle}
				className="w-[350px] p-10 flex flex-col gap-8 border border-slate-200"
			>
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
					<button className="bg-slate-400 p-2">SignIn</button>
					<button
						type="button"
						className="bg-slate-400 p-2"
						onClick={() => signIn('google', { redirect: false })}
					>
						Google
					</button>
				</div>
				<div>
					<p>don&apos;t have an account?</p>
					<Link href="/register" className="text-sky-400">
						Register
					</Link>
				</div>
			</form>
		</div>
	);
}
