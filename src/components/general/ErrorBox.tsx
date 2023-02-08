import { useError } from '@/context/error';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorBox = () => {
	const { errorState } = useError();

	return (
		<div
			className={`absolute bottom-4 md:bottom-8 max-w-xl ring-2 ring-red-400 rounded p-1 px-2 md:p-2 flex items-center gap-1 md:gap-2 transition-all duration-200 ease-in-out ${
				errorState.isError
					? 'left-4 md:left-10 opacity-[100%]'
					: '-left-[1000%] opacity-0'
			} text-sm`}
		>
			<BiErrorCircle className='text-red-400 text-xl md:text-2xl' />
			<h1>{errorState.msg}</h1>
		</div>
	);
};

export default ErrorBox;
