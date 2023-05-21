import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

export default function Slug() {
	return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const username: string = params?.username as string;
	const slug: string = params?.slug as string;

	if (!slug && !username)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	const link = await prisma.link.findFirst({
		where: { username: username.toString(), slug: slug.toString() },
	});

	if (link) {
		return {
			redirect: {
				destination: link.url,
				permanent: false,
			},
		};
	}

	return {
		notFound: true,
	};
};
