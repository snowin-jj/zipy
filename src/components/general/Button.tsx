import Link from 'next/link';

interface IButtonProps {
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	isLink?: boolean;
	to?: string;
	tw?: string;
	handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButtonProps) => {
	const {
		children,
		type = 'button',
		isLink = false,
		to = '/',
		tw = '',
		handleClick,
	} = props;

	if (isLink)
		return (
			<Link href={to} className={`btn ${tw}`}>
				{children}
			</Link>
		);

	return (
		<button type={type} className={`btn w-full ${tw}`} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
