import { NextApiRequest, NextApiResponse } from 'next';
import { vaildate } from '@/lib/auth';
import prisma from '@/lib/prisma';

export default vaildate(async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;
	if (!id)
		return res
			.status(404)
			.json({ message: 'Please provide the required fields' });

	try {
		const link = await prisma.link.findUnique({
			where: { id: id as string },
			include: { User: true },
		});
		return res.status(200).json({ data: link });
	} catch (e) {
		return res.status(404).json({ message: 'No link founded' });
	}
});
