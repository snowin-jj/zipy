import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMe } from '@/lib/hooks';
import PageLoader from '@/components/general/PageLoader';
import Dashboard from '@/layout/Dashboard';

const DashboardPage = () => {
	const { data: user, isLoading } = useMe();
	const { status } = useSession();
	const router = useRouter();

	if (status === 'loading' || isLoading) return <PageLoader />;
	if (user && !user.username) router.push('/onboarding');

	if (status === 'authenticated' && user) return <Dashboard user={user} />;
};

export default DashboardPage;
