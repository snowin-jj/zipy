import { useMe } from '@/lib/hooks';
import Dashboard from '@/layout/Dashboard';
import Onboard from '@/layout/Onboard';
import PageLoader from '@/components/general/PageLoader';

const DashboardPage = () => {
	const { user, isLoading } = useMe();

	if (isLoading) return <PageLoader />;
	if (!user.username) return <Onboard />;

	if (user) return <Dashboard user={user} />;
};

export default DashboardPage;
