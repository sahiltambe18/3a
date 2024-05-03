const express = require('express');

const {connectToDatabase , getDb} = require('./db.js');

const app = express()

app.use(express.json())

app.use(express.static(__dirname+"/public"))

app.get('/', (req, res) => {
  res.send('index.html')
})


app.post("/users",async(req,res)=>{
  console.log(req.body)
  const body = req.body;

  const db = await getDb()
  const response = await db.collection("users").insertOne(body)
  res.send(response)
})

app.get("/users",async (req,res)=>{
  const db = await getDb()
  const response = await db.collection("users").find().toArray()
  res.send(response)
})


app.delete("/users/:name", async(req,res)=>{
  const name = req.params.name;
  const db = await getDb()
  const response = await db.collection('users').deleteOne({name:name})
  res.send(response)
})

app.patch("/users/:name", async(req,res)=>{
  const name = req.params.name;
  const body = req.body;
  const db = await getDb()
  const response = await db.collection('users').updateOne({name:name},{$set:body})
  res.send(response)
})


connectToDatabase()
.then(()=>{

  app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
  })

})
.catch(()=>{
  console.log("Error connecting to database")
})
