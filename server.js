const express = require('express')
const dbConnect = require('./dbConnect')
const { ppid } = require('process')
var cors = require('cors')
const path = require('path')
const transactionRoute = require('./routes/transactionRoute')

const app = express()
app.use(express.json())
app.use(cors())
const userRoute = require('./routes/usersRoute')

app.use('/api/users', userRoute)
app.use('/api/transactions', transactionRoute)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 8000

app.get('/',(req,res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node js server started ${port}`))