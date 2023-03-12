import { NextApiRequest, NextApiResponse } from 'next';
import { vaildate } from '@/lib/auth';
import prisma from '@/lib/prisma';

export default vaildate(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'PUT')
		return res.status(405).json({ message: 'Method not allowed' });

	let { url, id } = req.body;

	if (!url || !id)
		return res
			.status(404)
			.json({ message: 'Please provide the required fields' });

	try {
		const link = await prisma.link.update({
			where: { id },
			data: {
				url,
			},
		});

		return res.status(200).json({ data: link });
	} catch (e) {
		return res.status(404).json({ message: 'No link founded' });
	}
});
