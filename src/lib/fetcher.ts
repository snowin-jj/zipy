export default async function fetcher(url: string, data?: unknown) {
	const options = {
		method: data ? 'POST' : 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	// @ts-ignore
	const res = await fetch(`${window.location.origin}/api/${url}`, options);
	const jsonData = await res.json();

	if (res.status > 399 || res.status < 200) {
		throw new Error(jsonData.message);
	}

	return jsonData.data;
}
