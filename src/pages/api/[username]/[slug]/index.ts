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
		const user = await prisma.user.findUnique({
			where: { username: username as string },
			include: {
				links: true,
			},
		});

		if (!user) return res.status(400).json({ message: 'user not found' });

		const link = await prisma.link.findFirst({
			where: { userId: user.id, slug: slug as string },
		});

		return res.redirect(link.url);
	} catch (e) {
		return res.status(404).json({ message: 'link not found' });
	}
}
