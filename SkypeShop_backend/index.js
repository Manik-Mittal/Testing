const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const connectDB = require('./ConnectDb/connect')
const notfound = require('./Middleware/notfound')
const Product = require('./Model/Product')
const LiveStream = require('./Model/LiveStream')
const UserInLive = require('./Model/UserInLive')
const UserLogin = require('./Model/UserLogin')

require('dotenv').config();

const port = process.env.PORT || 5000

app.use(express.json())
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


//new_collection_endpoint
app.get('/newcollections', async (req, res) => {
    let newcollections = await Product.find({});
    let mycollection = newcollections.slice(0, 8);
    res.json({ mycollection })
})


//.................................................................
//api to getall live streams
app.get('/livestreams', async (req, res) => {
    let livestreams = await LiveStream.find({})
    res.json({ livestreams });
})

//api to  post the livestream in database
app.post('/postlive', async (req, res) => {
    const streams = await LiveStream.create(req.body)
    res.status(201).json({ streams })
})

//api to post the details of user wanting to join live stream 
app.post('/goinlive', async (req, res) => {
    const useinlive = await UserInLive.create(req.body)
    res.status(201).json({ useinlive })
})

//api to get all those user who are not in a live yet
app.get('/usersinlive', async (req, res) => {
    const users = await UserInLive.find({ isinsidelive: false });
    res.status(201).json({ users })
})

//api to delete users once they are inside a live 
app.post('/deleteuser', async (req, res) => {
    await UserInLive.findOneAndDelete({ id: req.body.id })
    res.status(201).json({ msg: "Deletd successfully bro" })
})


//api fo signup end point 
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const check = await UserLogin.find({ email: email })

    if (check.length > 0) {
        return res.status(400).json({ msg: "User already exists" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++)cart[i] = 0;

    let user = {};
    user.name = name
    user.email = email
    user.password = password
    user.cartdata = cart

    const registereduser = await UserLogin.create(user);
    console.log(registereduser.id)

    const data = {
        user: {
            id: registereduser.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({ masg: "success", token })
})

//api for login endpoint 
app.post('/login', async (req, res) => {
    const user = await UserLogin.find({ email: req.body.email })

    if (user.length == 0) {
        return res.status(400).json({ msg: "Please enter correct emailid" })
    }
    // console.log(user[0], 1)
    if (user[0].password == req.body.password) {
        const data = {
            user: {
                id: user[0].id
            }
        }
        //console.log(user[0].id)
        const token = jwt.sign(data, 'secret_ecom')
        res.json({ msg: "success", token })
    }
    else {
        res.status(400).json({ msg: "Incorrect Password" })
    }
})

//middleware to authenticate user
const authenticateuser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).json({ error: "Please Login first token not found" })
    }
    try {
        const data = jwt.verify(token, 'secret_ecom')
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).json({ error: "Please Login first" })
    }
}

//api to add cart items
app.post('/addtocart', authenticateuser, async (req, res) => {
    const user = await UserLogin.find({ _id: req.user.id })
    let itemid = Number(req.body.id)
    // console.log(itemid)
    // console.log(req.user.id)
    // console.log(user[0])
    user[0].cartdata[itemid] += 1;
    console.log(user)
    await UserLogin.findOneAndUpdate({ _id: req.user.id }, { cartdata: user[0].cartdata })
    res.status(200).json({ msg: "item  added to cart" })
})

//api to delete cart items
app.post('/deletecartitem', authenticateuser, async (req, res) => {
    const user = await UserLogin.find({ _id: req.user.id })
    let itemid = Number(req.body.id)
    // console.log(itemid)
    // console.log(req.user.id)
    // console.log(user[0])
    user[0].cartdata[itemid] -= 1;
    console.log(user)
    await UserLogin.findOneAndUpdate({ _id: req.user.id }, { cartdata: user[0].cartdata })
    res.status(200).json({ msg: "item  deleted fromcart" })
})

//api to getall cart items
app.post('/getcartitems', authenticateuser, async (req, res) => {
    const user = await UserLogin.find({ _id: req.user.id })
    console.log(user[0].cartdata)
    res.status(200).json(user[0].cartdata)
})
//..............................................................................

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