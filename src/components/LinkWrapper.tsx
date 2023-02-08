import LinkBox from './LInkBox';

const LinkWrapper = ({ links }) => {
	return (
		<div className='w-full md:my-6'>
			<h1 className='text-xl md:text-2xl font-bold mb-2 md:mb-4'>
				Your Link Box:
			</h1>
			{links ? (
				<div className='flex flex-wrap items-center gap-4 md:gap-8'>
					{links.map((link) => (
						<LinkBox key={link.id} link={link} />
					))}
				</div>
			) : (
				<p>No links</p>
			)}
		</div>
	);
};

export default LinkWrapper;
