import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { db } = await connectToDatabase()
		if (req.method === 'DELETE') {
			const id = req.query.subscriptionId as string
			console.log({ id })
			const data = await db.collection('subscriptions').deleteOne({ _id: id })
			return res.status(200).json({ status: 'ok' })
		}
		if (req.method === 'POST') {
			console.log(req.query.subscriptionId)

			// const id = req.query.subscriptionId as string
			const data = await db.collection('subscriptions').insertOne(req.body)
			return res.status(201).json(req.body)
		}
		return res.status(500)
	} catch (error) {
		return res.status(500)
	}
}
