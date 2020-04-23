const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());

const users = ['asad','monira','tareq','sagor'];

app.get('/',(req,res) =>{
    res.send('thanks');
})
app.get('/fruit/:id' ,(req,res) =>{
    res.send({fruit: 'banana' ,quantity:100,price:2000});
})

app.get('/users/:id',(req, res) =>{
    const id = req.params.id;
    console.log(req.query.sort);
    const name = users[id];
    res.send({id, name});
})

//post 
app.post('/addUser',(req,res) =>{
    //save to database
    const user = req.body;
    user.id = 55;
    res.send(user);
})

app.listen(3000, () => console.log('listening to port 3000'));