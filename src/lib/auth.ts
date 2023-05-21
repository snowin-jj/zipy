import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from './prisma';

export const vaildate = (handler) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		// get current user session from next auth
		const session = await getServerSession(req, res, authOptions);

		if (session) {
			try {
				const user = await prisma.user.findUnique({
					where: {
						email: session.user?.email as string,
					},
				});

				if (!user) return res.status(401).json({ message: 'Not Authorizied' });

				return handler(req, res, user);
			} catch (e) {
				return res.status(401).json({ message: 'Something went wrong' });
			}
		}

		// no token
		return res.status(401).json({ message: 'Not Authorizied' });
	};
};
