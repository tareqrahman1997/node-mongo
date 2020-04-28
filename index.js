const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = ['asad','monira','tareq','sagor'];

app.get('/',(req,res) =>{
    res.send('thanks');
})

app.get('/users/:id',(req, res) =>{
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})

//post 
app.post('/addProduct',(req, res) =>{

  const product = req.body;

  console.log(product);
  client.connect(err => {
    const collection = client.db("databaseStore").collection("product");
    collection.insertOne( product, (error, res)=>{
        console.log("successfully inserted", res);
        res.send(product);
    });
    client.close();
  });
  
});

app.listen(4200, () => console.log('listening to port 4200'));