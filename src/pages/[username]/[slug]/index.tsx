import { GetServerSideProps } from 'next';
import prisma from '@/lib/prisma';

export default function Slug() {
	return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { username, slug } = params;

	console.log(params);

	if (!slug && !username)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	const link = await prisma.link.findFirst({
		where: { username: username as string, slug: slug as string },
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
