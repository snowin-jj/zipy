import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { vaildate } from '@/lib/auth';

export default vaildate(
	async (req: NextApiRequest, res: NextApiResponse, currentUser) => {
		switch (req.method) {
			case 'GET': {
				try {
					const user = await prisma.user.findUnique({
						where: { email: currentUser.email },
						include: { links: true },
					});
					return res.status(200).json({ data: user });
				} catch (e) {
					return res.status(401).json({ message: 'Something went wrong' });
				}
			}

			case 'PUT': {
				const { username } = req.body;

				// Check for the payload from the client
				if (!username)
					return res
						.status(404)
						.json({ message: 'Please provide the vaild fields' });

				const isUsernameExists = await prisma.user.findUnique({
					where: { username: username as string },
				});

				// Check for the username
				if (isUsernameExists)
					return res.status(404).json({ message: 'Username not available' });

				// Update the user using the user id from the session
				const updatedUser = await prisma.user.update({
					where: {
						id: currentUser.id,
					},
					data: {
						username: username as string,
					},
				});

				// Send back the updated user
				return res.status(200).json({ data: updatedUser });
			}
		}
	}
);
