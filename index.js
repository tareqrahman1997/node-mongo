const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());



const uri = process.env.DB_PATH;


let client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
const users = ["Asad", 'Moin', 'Sabed', 'Susmita', 'Sohana', 'Sabana'];


app.get('/products', (req, res) =>{

    let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
              //  console.log(documents);
                res.send(documents);
            }
        });
     //   client.close();
      });
});

app.get('/orders', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("orders");
        collection.find().toArray((err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
        client.close();
      });
});

app.post('/getProductsByKey', (req, res) =>{
    const product = req.params.body;
    const productKeys = req.body;
    let client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.find({key:{$in:productKeys}}).toArray((err, documents)=>{
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
            }
        });
     //   client.close();
      });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/product/:key', (req, res) => {
    const key = req.params.key;
    client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.findOne({key},(err, documents)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(documents);
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
    let client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
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
//placed order
app.post('/placeOrder', (req, res) => {
    const orderDetails = req.body;
    orderDetails.orderTime = new Date();
   // console.log(orderDetails);
    let client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
    client.connect(err => {
        const collection = client.db("onlineStore").collection("orders");
        collection.insert(orderDetails, (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).send({message:err});
            }
            else{
                res.send(result.ops[0]);
            }
        });
      //  client.close();
      });
});


const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4200'));