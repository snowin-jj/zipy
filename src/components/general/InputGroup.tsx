import React from 'react';
import { capitalize } from '@/lib/helper';

interface IInputProps {
	value?: string;
	type: string;
	name: string;
	placeholder?: string;
	minLength?: number;
	required?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	tw?: string;
}

// eslint-disable-next-line react/display-name
const InputGroup = React.forwardRef((props: IInputProps, ref) => {
	return (
		<div className='w-full flex flex-col items-start gap-2'>
			<label htmlFor='username'>{capitalize(props.name)}</label>
			<input
				// @ts-ignore
				ref={ref}
				{...props}
				className={`focus:ring-4 focus:ring-primary-400 focus:outline-none appearance-none w-full text-sm leading-6 placeholder-c-gray-700 rounded-md py-2 px-4 ring-1 ring-black-500 shadow-sm ${props.tw}`}
			/>
		</div>
	);
});

export default InputGroup;
