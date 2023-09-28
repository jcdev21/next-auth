import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<h1>HOMEPAGE</h1>
			<div>
				<Link href="/login">Login</Link>
			</div>
		</div>
	);
}
