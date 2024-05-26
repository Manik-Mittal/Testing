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
const Polloption = require('./Model/Polloption')

require('dotenv').config();

const port = process.env.PORT || 5000

const allowedOrigins = ['https://skype-shop.vercel.app', 'http://localhost:3000', 'http://localhost:8000', 'https://skypeshop-1.onrender.com', 'https://66528b7543d1d245c37aa122--cerulean-kashata-374ab4.netlify.app', 'https://66528b5e39c2b0e24dabbdef--inspiring-zuccutto-cbb4b9.netlify.app', 'http://127.0.0.1:5500'];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);  // Allow the origin
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,  // If you're sending credentials
    })
);

app.options('*', cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json())


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
        image_url: `https://skypeshop.onrender.com/images/${req.file.filename}`
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


app.get('/getproduct', async (req, res) => {
    const { id } = req.body
    let newcollections = await Product.find({ id: id })
    res.json({ newcollections })
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
        const data = {    //data is object with user field inside it 
            //user field has been mapped to an object with id field inside it
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
    console.log(token)
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

// //api to get usercart
// app.post('/getcart', authenticateuser, async (req, res) => {
//     const user = await UserLogin.find({ _id: req.user.id })
//     console.log(user[0].cartdata)
//     let cart = user[0].cartdata;
//     // await UserLogin.findOneAndUpdate({ _id: req.user.id }, { cartdata: user[0].cartdata })
//     res.status(200).json({ cartdata: cart })
// })

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

//api to getthe product for polling  entered by admin 
app.post('/getproductforpoll', async (req, res) => {

    const product = await LiveStream.find({ _id: req.body.id })
    console.log(product[0], 1);
    const opt = {};
    opt.op1 = product[0].op1;
    opt.op2 = product[0].op2;
    opt.op3 = product[0].op3;
    opt.op4 = product[0].op4;
    opt.op5 = product[0].op5;

    res.status(200).json(opt)
})

//api to intialize the poll options in database  
app.post('/polloptions', async (req, res) => {
    const product = await Polloption.create(req.body)
    console.log(product);
    res.status(200).json(product)
})

//api to get polloptions
app.post('/getpolloptions', async (req, res) => {
    console.log(req.body.id)
    const product = await Polloption.find({ prodid: req.body.id })
    console.log(product);
    res.status(200).json(product[0])
})

//update the count of polloptions on userclick
app.post('/updatepolloptions', async (req, res) => {
    console.log(req.body.id, req.body.optno)
    const optno = req.body.optno;
    const product = await Polloption.find({ prodid: req.body.id })
    if (optno == '1') {
        let newcount = product[0][1] + 1;
        const newprod = await Polloption.findOneAndUpdate({ prodid: req.body.id }, { '1': newcount })
    }
    else if (optno == '2') {
        let newcount = product[0][2] + 1;
        const newprod = await Polloption.findOneAndUpdate({ prodid: req.body.id }, { '2': newcount })
    }
    else if (optno == '3') {
        let newcount = product[0][3] + 1;
        const newprod = await Polloption.findOneAndUpdate({ prodid: req.body.id }, { '3': newcount })
    }
    else if (optno == '4') {
        let newcount = product[0][4] + 1;
        const newprod = await Polloption.findOneAndUpdate({ prodid: req.body.id }, { '4': newcount })
    }
    else if (optno == '5') {
        let newcount = product[0][5] + 1;
        const newprod = await Polloption.findOneAndUpdate({ prodid: req.body.id }, { '5': newcount })
    }
    res.status(200).json({ msg: "success" })
    // console.log(product);
    // res.status(200).json(product[0])
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