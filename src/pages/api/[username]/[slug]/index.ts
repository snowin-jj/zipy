import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { slug, username } = req.query;

	if (!slug && !username)
		return res.status(400).json({ message: 'slug, name are required' });
	try {
		const link = await prisma.link.findFirst({
			where: { username: username as string, slug: slug as string },
		});

		return res.redirect(link?.url as string);
	} catch (e) {
		return res.status(404).json({ message: 'link not found' });
	}
}
