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
		const link = await prisma.link.delete({
			where: { id: id as string },
		});

		return res.status(200).json({ data: link.id });
	} catch (e) {
		return res.status(404).json({ message: 'No link founded' });
	}
});
