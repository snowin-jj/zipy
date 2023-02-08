import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) return res.status(401).json({ message: 'Not Authorizied' });

	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
			include: { links: true },
		});
		return res.status(200).json({ data: user });
	} catch (e) {
		return res.status(401).json({ message: 'Something went wrong' });
	}
}
