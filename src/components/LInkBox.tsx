import Link from 'next/link';

const LinkBox = ({ link }) => {
	return (
		<Link
			href={`/dashboard/link/${link.id}`}
			className='py-2 px-4 md:py-2 md:px-6 grid place-items-center rounded-xl border-[3px] border-primary-400 text-base md:text-2xl'
		>
			{link.name}
		</Link>
	);
};

export default LinkBox;
