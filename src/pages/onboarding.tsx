import PageLoader from '@/components/general/PageLoader';
import Onboard from '@/layout/Onboard';
import { useMe } from '@/lib/hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const OnboardingPage = () => {
	const { data: user, isLoading } = useMe();
	const { status, data: session } = useSession();

	const router = useRouter();

	if (status === 'loading' || isLoading) return <PageLoader />;
	if (user && user.username) router.push('/dashboard');
	return (
		<section className='center min-h-screen -mt-28'>
			<Onboard session={session} />
		</section>
	);
};

export default OnboardingPage;
