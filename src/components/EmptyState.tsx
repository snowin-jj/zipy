import Image from 'next/image';

const EmptyState = ({ msg }) => {
	return (
		<div className='w-full flex flex-col justify-center items-center text-center'>
			<Image
				src='/empty-box.svg'
				alt='empty box image'
				width={250}
				height={250}
				priority={true}
				className='md:w-[350px] md:h-[350px]'
			/>
			<p className='text-lg text-gray-400 md:text-xl'>{msg}</p>
		</div>
	);
};

export default EmptyState;
