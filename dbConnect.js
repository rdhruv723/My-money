const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Dhruv:Rajan%4072@cluster0.5jroi.mongodb.net/my-moneys',
{ useNewUrlParser: true , useUnifiedTopology: true })

.then(()=>{ return console.log("Connected to MongoDB Localhost...");
 })
.catch(err => console.log("Could not connect",err))

const connection = mongoose.connection

