import Spinner from './Spinner';

const PageLoader = () => {
	return (
		<div className='center gap-8 min-h-screen -mt-28'>
			<Spinner tw='w-10 h-10' />
			<p>Please be patient......</p>
		</div>
	);
};

export default PageLoader;
