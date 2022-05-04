const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json());


//database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h5pfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const itemsCollection = client.db('eElectronics').collection('items');

        app.get('/items', async(req, res) => {
            const query = {}
            const cursor = itemsCollection.find(query)
            const items = await cursor.toArray()
            res.send(items)
        })

        app.get('/items/:id', async(req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const items = await itemsCollection.findOne(query)
            res.send(items)
        })
    }
    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('eElectronics runing')
})

app.listen(port, () => {
    console.log(`eElectronics started on ${port}`)
})