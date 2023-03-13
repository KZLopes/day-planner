const express = require('express');
const bodyParser = require('body-parser');
const client = require('mongodb').MongoClient;
const dotenv = require('dotenv').config();
const app = express();
const uri = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPw}@cluster0.p9xtkfo.mongodb.net/?retryWrites=true&w=majority`

async function connectDB() {
  await client.connect(uri, {
    useUnifiedTopology: true
    }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })
} 
connectDB();

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/tasks/day', (req, res) => {
  
})

app.get('/tasks/week', (req, res) => {
  
})

app.get('/tasks/month', (req, res) => {
  
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})

