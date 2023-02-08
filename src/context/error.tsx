import { createContext, useContext, useState } from 'react';

type ErrorState = {
	isError: boolean;
	msg: string;
	timeOut?: number;
};

const ErrorContext = createContext({
	errorState: { isError: false, msg: 'Error' },
	changeErrorState: ({ isError, msg, timeOut }: ErrorState) => {},
});

export const ErrorProvider = ({ children }) => {
	const [errorState, setErrorState] = useState<{
		isError: boolean;
		msg: string;
	}>({
		isError: false,
		msg: 'Error',
	});

	const changeErrorState = ({ isError, msg, timeOut = 3000 }: ErrorState) => {
		setErrorState({
			isError,
			msg,
		});
		setTimeout(() => {
			setErrorState({
				isError: false,
				msg: 'Error',
			});
		}, timeOut);
	};

	const value = {
		errorState,
		changeErrorState,
	};

	return (
		<ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
	);
};

export const useError = () => useContext(ErrorContext);
