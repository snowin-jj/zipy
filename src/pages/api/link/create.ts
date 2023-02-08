import { User } from '@prisma/client';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import { vaildate } from '@/lib/auth';
import prisma from '@/lib/prisma';

export default vaildate(
	async (req: NextApiRequest, res: NextApiResponse, user: User) => {
		if (req.method !== 'POST')
			return res.status(405).json({ message: 'Method not allowed' });

		let { name, url, slug } = req.body;

		if (!name || !url)
			return res
				.status(404)
				.json({ message: 'Please provide the required fields' });

		if (!slug) slug = nanoid(3);
		const isSlugExist = await prisma.link.findFirst({
			where: { slug, userId: user.id },
		});

		if (isSlugExist)
			return res.status(400).json({ message: 'Slug not available' });

		try {
			const link = await prisma.link.create({
				data: {
					name,
					url,
					slug,
					userId: user.id,
				},
			});

			return res.status(200).json({ data: link.id });
		} catch (e) {
			return res
				.status(200)
				.json({ message: 'Oops, something went wrong! Try again later.' });
		}
	}
);
