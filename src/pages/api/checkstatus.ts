import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		// Execute a query to keep the connection alive
		await prisma.$queryRaw`SELECT 1`;

		const health = {
			uptime: process.uptime(),
			message: 'OK',
			timestamps: Date.now(),
		};

		res.status(200).json(health);
	} catch (e) {
		const error = e as Error;

		res.status(503).json({ message: error.message });
	}
}
