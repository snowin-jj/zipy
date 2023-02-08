import { NextApiRequest, NextApiResponse } from 'next';
import { vaildate } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { User } from 'next-auth';

export default vaildate(
	async (req: NextApiRequest, res: NextApiResponse, user: User) => {
		const { username } = req.body;

		// Check if the request method is post or not
		if (req.method !== 'POST')
			return res.status(401).json({ message: 'Method not allowed' });

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
				id: user.id,
			},
			data: {
				username: username as string,
			},
		});

		// Send back the updated user
		return res.status(200).json({ data: updatedUser });
	}
);
