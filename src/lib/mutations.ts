import fetcher from './fetcher';

export const updateUser = async (payload) => {
	await fetcher('/user/update', payload);
};

export const getUser = async (email: string) => {
	const data = await fetcher(`/user?email=${email}`);
	return data;
};

export const createLink = async (payload) => {
	const data = await fetcher('/link/create', payload);
	return data;
};

export const updateLink = async (payload) => {
	const data = await fetcher('/link/update', payload);
	return data;
};

export const deleteLink = async (id: string) => {
	const data = await fetcher(`/link/delete?id=${id}`);
	return data;
};
