import useSWR from 'swr';
import useImmutableSWR from 'swr/immutable';
import fetcher from './fetcher';

export const useLink = (id: string) => {
	const {
		data: link,
		error,
		isLoading,
	} = useImmutableSWR(`/link?id=${id}`, fetcher);
	return { link, error, isLoading };
};

export const useMe = () => {
	const { data: user, error, isLoading, mutate } = useSWR('user', fetcher);

	const loading = !user || isLoading;

	async function mutateUser(data: unknown, options?: {}) {
		await mutate(fetcher('user/', data, 'PUT'), {
			...options,
		});
	}

	return {
		user,
		error,
		isLoading: loading,
		mutateUser,
	};
};
