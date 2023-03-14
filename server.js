const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    uri = process.env.DB_STRING,
    dbName = 'taskplanner';

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/', async (req, res) => {
  db.collection('tasks').find().sort({date: 1}).toArray()
    .then(data => {
        res.render('index.ejs', { tasksArr: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTask', async (req, res) => {
  try {
    await db.collection('tasks').insertOne({
      date: req.body.date,
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
      completed: false
    });
    console.log('Task Added');
    res.redirect('/')

  } catch (err) {
    console.error(err)
  }
})

app.put('/taskCompletion', async (req, res) => {
  try {
    await db.collection('tasks').updateOne({
      date: req.body.date,
      title: req.body.title,
      start: req.body.start
      },
      {
        $set:{
          completed: !req.body.completed
        }
      },
      {
      upsert: true
      }
    );
    console.log('completion status modified');
    res.json('Completion Status Modified')
  } catch (err) {
    console.error(err)
  }
})

app.delete('/deleteTask', async (req, res) => {
  try {
    await db.collection('tasks').deleteOne({date: req.body.date, title: req.body.title, start: req.body.start});
    console.log('Task Deleted');
    res.json('Task Deleted');
  } catch (err) {
    console.error(err)  
  }  
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})