const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// use middleware 
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bytmc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const carCollection = client.db('inventory').collection('car');

        // Car API
        app.get('/car', async (req, res) => {
            const query = {};
            const cursor = carCollection.find(query);
            const cars = await cursor.toArray();
            res.send(cars);
        })

        // get single car API by id
        app.get('/car/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const car = await carCollection.findOne(query);
            res.send(car)
        })

        // update a car 
        app.put('/car/:id', async (req, res) => {
            const id = req.params.id;
            const updateCar = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updateCar.quantity,
                    sold: updateCar.sold
                }
            };
            const result = await carCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        // post
        app.post('/car', async (req, res) => {
            const newCar = req.body;
            const result = await carCollection.insertOne(newCar);
            res.send(result);
        })

        // delete
        app.delete('/car/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await carCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('This is our car ghoor API');
});

app.listen(port, () => {
    console.log('The server running by PORT', port);
})