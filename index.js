const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());



const uri = process.env.DB_PATH;


let client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true});
const users = ["Asad", 'Moin', 'Sabed', 'Susmita', 'Sohana', 'Sabana'];


app.get('/products', (req, res) =>{

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                console.log(documents);
                res.send(documents);
            }
        });
     //   client.close();
      });
});

app.get('/getProductsByKey', (req, res) =>{
    const product = req.params.body;
    const productKeys = req.body;

    client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({key}).toArray((err, documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(documents[0]);
            }
        });
        client.close();
      });
});

app.post('/product/:key', (req, res) =>{
    const key = req.params.key;

    client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({key}).toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents[0]);
            }
        });
        client.close();
      });
});
//,{useUnifiedTopology: true}
//delete
//update
// post
app.post('/addProduct', (req, res) => {
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true});
    console.log(product);
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(product, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                console.log(result.ops[0]);
                res.send(result.ops[0]);
            }
        });
      //  client.close();
      });
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4200'));