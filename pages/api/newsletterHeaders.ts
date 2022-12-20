import {connectToDatabase} from '../../lib/mongodb';

export default async function handler(req: any, res: any) {
    const {db} = await connectToDatabase();
    const data = await db.collection("NewsletterHeaders").find({}).limit(20).toArray();

	res.json(data)
}
