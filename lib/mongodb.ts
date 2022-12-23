import { Db, MongoClient } from 'mongodb'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
if (!MONGODB_DB) {
	throw new Error('Invalid/Missing environment variable: "MONGODB_DB"')
}

/*Global is used here to maintain a cached connection across hot reloads in development.
This prevents connections growing exponentially during API Route usage.
*/
let cached = global.mongo
if (!cached) {
	cached = global.mango = { conn: null, promise: null }
}

export async function connectToDatabase(): Promise<{db: Db}> {
	if (cached.conn) {
		return cached.conn
	}
	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
		cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
			return {
				client,
                db: client.db(MONGODB_DB),
			}
		})
	}
    cached.conn = await cached.promise
    return cached.conn
}

// const uri = MONGODB_URI
// const options = {}

// let client
// let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === 'development') {
// 	// In development mode, use a global variable so that the value
// 	// is preserved across module reloads caused by HMR (Hot Module Replacement).
// 	if (!global._mongoClientPromise) {
// 		client = new MongoClient(uri, options)
// 		global._mongoClientPromise = client.connect()
// 	}
// 	clientPromise = global._mongoClientPromise
// } else {
// 	// In production mode, it's best to not use a global variable.
// 	client = new MongoClient(uri, options)
// 	clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise
