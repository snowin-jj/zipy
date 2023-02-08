import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ tw, size = 30 }: { tw?: string; size?: number }) => {
	return (
		<Link
			href='/'
			className={`font-semibold text-2xl flex items-center gap-2 ${tw}`}
		>
			<Image src='/logo.png' alt='app logo' width={size} height={size} />
			<h1>Zipy</h1>
		</Link>
	);
};

export default Logo;
