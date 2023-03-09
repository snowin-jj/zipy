import SignIn from '@/layout/SignIn';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const SigninPage = () => {
	return (
		<main className='center min-h-screen -mt-28'>
			<SignIn />
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async (cxt) => {
	const session = await getServerSession(cxt.req, cxt.res, authOptions);

	if (session) {
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default SigninPage;
