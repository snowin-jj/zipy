import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import { ErrorProvider } from '@/context/error';
import Layout from '@/layout/Layout';
import '@/styles/globals.css';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<>
			<Head>
				<meta name='description' content='link management tool' />
				<meta httpEquiv='X-UA-Compatible' content='ie=edge' />
				<meta
					name='keywords'
					content='link, manage, tool, social, media, shortener, url'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='shortcut icon' href='logo.png' type='image/png' />
				<title>ZIPY</title>
			</Head>
			<SessionProvider session={session}>
				<ErrorProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
					<Analytics />
				</ErrorProvider>
			</SessionProvider>
		</>
	);
}
