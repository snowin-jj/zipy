import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Button from '@/components/general/Button';

const SignIn = () => {
	const { data } = useSession();
	const router = useRouter();

	if (data) router.push('/dashboard');

	return (
		<div className='center gap-4 max-w-[22rem] text-center'>
			<h4 className='font-medium'>{`You're not logged in. Please sign in to get started`}</h4>
			<Button
				tw='w-fit'
				handleClick={async () => {
					signIn('google', { callbackUrl: '/dashboard' });
				}}
			>
				Sign In With Google
			</Button>
		</div>
	);
};

export default SignIn;
