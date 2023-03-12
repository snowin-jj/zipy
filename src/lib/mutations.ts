import fetcher from './fetcher';

export const createLink = async (payload) => {
	const data = await fetcher('/link/create', payload, 'POST');
	return data;
};

export const updateLink = async (payload) => {
	const data = await fetcher('/link/update', payload, 'PUT');
	return data;
};

export const deleteLink = async (id: string) => {
	const data = await fetcher(`/link/delete?id=${id}`);
	return data;
};
