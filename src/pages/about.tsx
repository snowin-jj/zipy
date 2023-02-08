import Head from 'next/head';

const About = () => {
	return (
		<div className='max-w-[80rem] mx-auto'>
			<Head>
				<title>ZIPY | About</title>
			</Head>
			<section className='min-h-screen max-w-2xl mx-auto -mt-32 flex flex-col justify-center md:items-center gap-4 text-left md:text-center'>
				<h1 className='text-3xl md:text-6xl font-black'>What is zipy?</h1>
				<p>
					Zipy is a link management app that allows you to manage all of your
					social media links, among other things. Simply create a single link,
					distribute it across all platforms, and manage it with zipy.
				</p>
			</section>
		</div>
	);
};

export default About;
