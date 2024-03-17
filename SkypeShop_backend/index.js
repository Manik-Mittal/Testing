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
app.use(express.urlencoded({ extended: false }));
app.use(cors())


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

//API to get product
app.get('/', async (req, res) => {
    let products = await Product.find({})
    res.json({ products })
})

//api to addproduct in database
app.post('/addproduct', async (req, res) => {
    const Products = await Product.find({});
    let id;
    if (Products.length > 0) {
        const last_document = Products[Products.length - 1];
        id = last_document.id + 1;

    }
    else id = 1;

    try {
        req.body.id = id;
        const prod = await Product.create(req.body)
        res.status(201).json({ prod })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
})


//api to delete a document in database
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    res.json({ msg: "Deletd successfully bro" })
})


//api to update product
app.patch('/updateproduct', async (req, res) => {
    const body = req.body;
    const product = await Product.findOneAndUpdate({ id: req.body.id }, req.body, { new: true, runValidators: true })
    if (!product) {
        res.json({ msg: "No data found" })
    }
    res.json({ product })
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