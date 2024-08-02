import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://ramsscr:10235190@products.a2wewsc.mongodb.net/'

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connect() {
    try {
        await client.connect()
        const database = client.db('Products')
        return database.collection('product')
    } catch (error) {
        console.error('Error connecting to the database')
        console.error(error)
        await client.close()
    }
}

export class ProductModel {
    // obtain all products or by category (if any)
    static async getAll({ category }) {
        const db = await connect()

        if (category) {
            return db.find({ categoria: category }).toArray()
        }

        return db.find().toArray()
    }

    // obtain a product by ID
    static async getId({ id }) {
        const db = await connect()
        const objectId = new ObjectId(id)
        return db.findOne({ _id: objectId })
    }

    // create a new product
    static async create({ input }) {
        const db = await connect()
        const { insertedId } = db.insertOne(input)

        const newProduct = {
            id: insertedId,
            ...input
        }

        return newProduct
    }

    // modify a product information
    static async modify({ id, input }) {
        const db = await connect()
        const objectId = new ObjectId(id)

        const { acknowledged } = await db.updateOne({ _id: objectId }, { $set: input })

        if (!acknowledged) return false
        return db.findOne({ _id: objectId })
    }

    // delete a product
    static async remove({ id }) {
        const db = await connect()
        const objectId = new ObjectId(id)
        const { deletedCount } = await db.deleteOne({ _id: objectId })
        return deletedCount > 0
    }
}