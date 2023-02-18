import { Inter } from '@next/font/google';
import Header from './Header';
import ErrorBox from '@/components/general/ErrorBox';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main
			className={`${inter.className} --font-sans text-black-500 max-w-[80rem] mx-auto px-4 md:px-8`}
		>
			<Header />
			{children}
			<ErrorBox />
		</main>
	);
};

export default Layout;
