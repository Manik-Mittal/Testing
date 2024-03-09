
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const connectDB = require('./ConnectDb/connect')
const notfound = require('./Middleware/notfound')
require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use(notfound)

const port = process.env.PORT || 4000



app.get('/', (req, res) => {
    res.send('Express App is running')
})


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening at ${port}`)
        })
    }
    catch (error) {
        console.log(error)
    }
}

start()