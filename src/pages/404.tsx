import Image from 'next/image';

const ErrorPage = () => {
	return (
		<main className='center min-h-screen -mt-28'>
			<Image
				src='/page-not-found.svg'
				alt='error state image'
				width={400}
				height={400}
			/>
		</main>
	);
};

export default ErrorPage;
