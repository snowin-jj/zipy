import Button from '@/components/general/Button';
import Head from 'next/head';
import { capitalize } from '@/lib/helper';
import LinkWrapper from '@/components/LinkWrapper';
import EmptyState from '@/components/EmptyState';

const Dashboard = ({ user }) => {
	return (
		<>
			<Head>
				<title>ZIPY | Dashboard</title>
			</Head>
			<div className='flex flex-col items-start'>
				<div className='mt-2 mb-6 md:mt-10 md:mb-10'>
					<p className='text-md md:text-2xl pb-1'>
						Hi {capitalize(user?.name)},
					</p>
					<h1 className='text-4xl md:text-6xl font-black'>Welcome back 🎉</h1>
				</div>
				{user?.links.length ? (
					<LinkWrapper links={user?.links} />
				) : (
					<EmptyState msg='Your link box is empty' />
				)}
			</div>
			<Button
				isLink={true}
				to='dashboard/link/new'
				tw='fixed w-fit py-0 px-2 lg:px-4 lg:py-2 bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-20 lg:right-50 text-4xl'
			>
				+
			</Button>
		</>
	);
};

export default Dashboard;
