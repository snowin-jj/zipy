import Head from 'next/head';
import Image from 'next/image';
import Button from '@/components/general/Button';

export default function Home() {
	return (
		<>
			<Head>
				<title>ZIPY | Home</title>
			</Head>
			<section className='min-h-screen -mt-32 flex justify-between items-center'>
				<div className='w-full md:max-w-[40rem] flex flex-col items-start gap-6'>
					<h1 className='text-3xl md:text-4xl lg:text-6xl font-black'>
						Have control over your links!
					</h1>
					<p className='w-full'>
						Manage your socials, website, store, videos, music, podcast, events
						and more.
					</p>
					<Button isLink={true} to='/dashboard'>
						Get Started
					</Button>
				</div>
				<div className='hidden md:block'>
					<Image
						src='/social-tree.svg'
						alt='hero image'
						priority={true}
						width={400}
						className='w-auto h-auto max-w-[300px]'
						height={400}
					/>
				</div>
			</section>
		</>
	);
}
