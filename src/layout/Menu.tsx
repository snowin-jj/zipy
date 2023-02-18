import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { MdClose } from 'react-icons/md';
import Button from '@/components/general/Button';

interface IMenuBarProps {
	status: 'loading' | 'authenticated' | 'unauthenticated';
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu = (props: IMenuBarProps) => {
	const { status, isOpen, setIsOpen } = props;
	return (
		<div
			className={`absolute w-screen h-screen flex flex-col justify-center items-center gap-3 text-base bg-white transition-all duration-300 ease-in-out ${
				isOpen ? 'top-0 opacity-[100%]' : '-top-[1000%] opacity-0'
			} md:hidden`}
		>
			<button onClick={() => setIsOpen((prev) => !prev)}>
				<MdClose className='absolute top-14 right-9 text-2xl' />
			</button>
			<Link href='/' onClick={() => setIsOpen((prev) => !prev)}>
				Home
			</Link>
			<Link href='/about' onClick={() => setIsOpen((prev) => !prev)}>
				About
			</Link>
			<Link
				href='https://forms.gle/2WHpavzbGMjgbo267'
				target='_blank'
				onClick={() => setIsOpen((prev) => !prev)}
			>
				FeedBack
			</Link>
			<Link href='/dashboard' onClick={() => setIsOpen((prev) => !prev)}>
				Dashboard
			</Link>
			{status === 'authenticated' && (
				<Button handleClick={() => signOut()} tw='w-fit'>
					Sign Out
				</Button>
			)}
		</div>
	);
};

export default Menu;
