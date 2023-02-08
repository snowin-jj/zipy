import Link from 'next/link';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import Menu from '@/layout/Menu';
import Logo from '@/components/general/Logo';
import Button from '@/components/general/Button';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { status } = useSession();

	return (
		<header className='relative bg-white w-full h-28 grid place-items-center'>
			<div className='w-full flex justify-between items-center '>
				<Logo />
				<nav className='hidden md:flex items-center gap-12 text-base'>
					<Link href='/'>Home</Link>
					<Link href='/about'>About</Link>
					<Link href='https://forms.gle/2WHpavzbGMjgbo267' target='_blank'>
						FeedBack
					</Link>
					{status === 'authenticated' ? (
						<>
							<Link href='/dashboard'>Dashboard</Link>
							<Button handleClick={() => signOut()}>Sign Out</Button>
						</>
					) : (
						<Button isLink={true} to='/signin'>
							Sign In
						</Button>
					)}
				</nav>
				<button
					onClick={() => setIsMenuOpen((prev) => !prev)}
					className='md:hidden'
				>
					<MdMenu size={28} />
				</button>
			</div>
			<Menu status={status} isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
		</header>
	);
};

export default Header;
