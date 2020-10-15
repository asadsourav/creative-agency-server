const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxwjp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const ordersCollection = client.db("creativeAgency").collection("orderedServices");
  const reviewsCollection = client.db("creativeAgency").collection("userReviews");
  const adminsCollection = client.db("creativeAgency").collection("admins");
  const newServiceCollection = client.db("creativeAgency").collection("newServices");


  app.post("/addOrder", (req, res) => {
    const newOrder = req.body
    // console.log(newOrder)
    ordersCollection.insertOne(newOrder)
      .then(result => {
    
      res.send(result)
      })
  })

  app.get('/orderedServicesByUser', (req, res) => {
    // console.log(req.query.email)
    ordersCollection.find({email: req.query.email})
    .toArray((err,documents) =>{

      res.send(documents)
    })
  })

  app.post("/addReview", (req, res) => {
    const newReview = req.body
    console.log(newReview)
    reviewsCollection.insertOne(newReview)
      .then(result => {

      res.send(result)
      })
  })

  app.post("/addAdmin", (req, res) => {
    const newAdmin = req.body
    console.log(newAdmin)
    adminsCollection.insertOne(newAdmin)
      .then(result => {

      res.send(result)
      })
  })

  app.get('/getAdmin', (req, res) => {
    // console.log(req.query.email)
    adminsCollection.find({email: req.query.email})
    .toArray((err,documents) =>{

      res.send(documents)
    })
  })

  app.get('/getAllOrderedServices', (req, res) => {
    
    ordersCollection.find({})
    .toArray((err,documents) =>{

      res.send(documents)
    })
  })


  app.get('/getReviews', (req, res) => {
    
    reviewsCollection.find({})
    .toArray((err,documents) =>{

      res.send(documents)
    })
  })

  app.post("/addService", (req, res) => {
    const newService = req.body
    console.log(newService)
    newServiceCollection.insertOne(newService)
      .then(result => {

      res.send(result)
      })
  })

  app.get('/getNewServices', (req, res) => {
    
    newServiceCollection.find({})
    
    .toArray((err,documents) =>{

      res.send(documents)
    })
  })
//   console.log(err,'db connection established')
//   client.close();
});






app.get('/', (req, res) => {
  res.send('Hello World! I am running')
})

app.listen( process.env.PORT || port)