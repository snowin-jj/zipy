import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const usercount = await prisma.user.count();

		res.status(200).json({ usercount });
	} catch (e) {
		const error = e as Error;

		res.status(200).json({ message: error.message });
	}
}
