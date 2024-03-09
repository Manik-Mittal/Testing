const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const connectDB = require('./ConnectDb/connect')
const notfound = require('./Middleware/notfound')
const Product = require('./Model/Product')
require('dotenv').config();

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())



//API CREATION get product
app.get('/', (req, res) => {
    res.send('Express App is running')
})

//IMAGE STORAGE ENGINE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Upload/images')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

app.use('/images', express.static('./Upload/images'))

//api to upload image
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//api to addproduct in database
app.post('/addproduct', async (req, res) => {
    const Products = await Product.find({});
    let id;
    if (Products.length > 0) {
        const last_document = Products[Products.length - 1];
        id = last_document.id + 1;

    }
    try {
        req.body.id = id;
        const prod = await Product.create(req.body)
        res.status(201).json({ prod })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
})


//if no url satisfied
app.use(notfound)

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