const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rdhruv72:{password}@cluster0.aaenjc0.mongodb.net/my-money',
{ useNewUrlParser: true , useUnifiedTopology: true })

.then(()=>{ return console.log("Connected to MongoDB Localhost...");
 })
.catch(err => console.log("Could not connect",err))

const connection = mongoose.connection

