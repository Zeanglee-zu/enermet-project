require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')


const app = express()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND

var corsOptions = {
    origin: FRONTEND,//['http://localhost:5173', 'http://example.com'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/devices', productRoute);

app.get('/',(req, res) => {
    res.send('Hello Node API')
})

app.use(errorMiddleware);

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
.then(() =>{
    console.log('connected to MongoDB')
    app.listen(PORT, ()=>{
        console.log(`Node API app is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})