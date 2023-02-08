import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import fetcher from './fetcher';

export const useLink = (id: string) => {
	const { data, error, isLoading } = useSWRImmutable(`/link?id=${id}`, fetcher);
	return { data, error, isLoading };
};

export const useMe = () => {
	const { data, error, isLoading } = useSWR(`/user`, fetcher);
	return { data, error, isLoading };
};
