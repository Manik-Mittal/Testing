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
const Razorpay = require('razorpay');
const { cloudinaryConnect } = require('./cloudinary');
const { uploadImageToCloudinary } = require('./media_upload');
const { mediaDeleter } = require('./media_deleter');
const AdminLogin = require('./Model/AdminLogin');

require('dotenv').config();

const port = process.env.PORT || 5500


const allowedOrigins = ['https://skype-shop.vercel.app', 'http://localhost:3000', 'http://localhost:8000', 'https://skypeshop-1.onrender.com', 'https://skype-shop-admin-livestream.vercel.app', 'http://127.0.0.1:5500', 'https://skype-shop-livestream.vercel.app'];

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
app.use(express.urlencoded({ extended: false }))
cloudinaryConnect();   //calling cloudiary connect to connect to clodinary


//IMAGE STORAGE ENGINE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Upload/images')
    },
    filename: function (req, file, cb) {
        filename = file.fieldname;
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

app.use('/images', express.static('./Upload/images'))


//api to handle orders and payments
app.post('/order', async (req, res) => {

    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const options = req.body

        const order = await razorpay.orders.create(options)
        console.log(order)
        if (!order) {
            res.status(500).send("error")
        }
        res.status(200).json(order)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("error")
    }
})


//api to upload image
app.post('/upload', upload.single('product'), async (req, res) => {
    try {
        console.log(req.file.filename, 1)
        console.log(`./Upload/images/${req.file}`)
        const image = await uploadImageToCloudinary(`./Upload/images/${req.file.filename}`, process.env.Folder)
        console.log(image)
        res.json({
            success: 1,
            image_url: image.secure_url
        })
    }
    catch (err) {
        console.log(err)
    }

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
    //console.log(useinlive, "*")
    res.status(201).json({ useinlive })
})

//api to enter a specific user in a live stream
app.post('/searchuserinlive', async (req, res) => {
    console.log(req.body)
    const users = await UserInLive.find({ email: req.body.email });

    if (users.length == 0) {
        return res.status(500).json({ msg: "err" })
    }
    return res.status(201).json({ users })
})

//api to delete users once they are inside a live 
app.post('/deleteuser', async (req, res) => {
    console.log(req.body.email, "in deleteuser")
    await UserInLive.findOneAndDelete({ email: req.body.email })
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
    res.json({ msg: "success", token })
})



//api for login endpoint 
app.post('/login', async (req, res) => {
    const user = await UserLogin.find({ email: req.body.email })
    console.log(req.body)
    console.log(user)

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

//singup admin api
app.post('/signupadmin', async (req, res) => {

    //fetch details
    const { name, email, password } = req.body;
    console.log(req.body)

    //check for existence
    const admin = await AdminLogin.find({ email: email })
    if (admin.length > 0) {
        res.status(400).json({ msg: "User already exists" })
    }

    //generate the data 
    let admindata = {}
    admindata.name = name;
    admindata.email = email;
    admindata.password = password;
    admindata.product = [];

    //create the admin
    const admindetails = await AdminLogin.create(admindata);
    console.log(admindetails);

    //create token
    const data = {
        user: {
            id: admindetails.id
        }
    }
    var token = jwt.sign({ data }, 'secret');
    console.log(token)

    //send token
    res.status(200).json({ msg: token })
})

//login admin api
app.post('/loginadmin', async (req, res) => {
    const { email, password } = req.body;
    const admin = await AdminLogin.find({ email: email });
    if (admin.length == 0) {
        res.status(400).send("Please Enter valid email")
    }

    const dbpassword = admin[0].password;
    if (dbpassword != password) {
        res.status(400).send("Please Enter valid Password")
    }
    else {
        const data = {
            user: {
                id: admin[0].id
            }
        }

        var token = jwt.sign({ data }, 'secret')
        res.status(200).json({ msg: token })
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

//middleware to authenticate admin
const authenticateadmin = async (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        res.status(401).json({ error: "Please Login first token not found" })
    }
    try {
        const decode = jwt.verify(token, 'secret')
        req.body = decode.data.user.id

        next()
    } catch (error) {
        res.status(401).json({ error: "Please Login first" })
    }
}

//api to add item to admin cart
app.post('/admincart', async (req, res) => {
    const { email, name, old_price, new_price, category, image, op1, op2, op3, op4, op5 } = req.body
    const admin = await AdminLogin.find({ email: req.body.email });

    let cart = admin[0].products;
    let product = {
        name: '',
        old_price: '',
        new_price: '',
        category: '',
        image: '',
        op1: '',
        op2: '',
        op3: '',
        op4: '',
        op5: ''
    };

    product.name = name;
    product.old_price = old_price;
    product.new_price = new_price;
    product.category = category;
    product.image = image;
    product.op1 = op1
    product.op2 = op2
    product.op3 = op3
    product.op4 = op4
    product.op5 = op5

    cart.push(product)

    const update = await AdminLogin.findOneAndUpdate({ email: email }, { products: cart })
    res.status(200).json({ msg: 'item added successfully to admin cart' })
})


//api to delete product from admin cart
app.post('/RemoveProductFromAdmincart', async (req, res) => {

    const admin = await AdminLogin.findOne({ email: req.body.email })
    const cart = admin.products

    const filteredcart = cart.filter(obj => obj.image !== req.body.image);

    const admincart = await AdminLogin.findOneAndUpdate({ email: req.body.email }, { products: filteredcart })


    res.json({ msg: "Deletd successfully from your inventory" })
})


app.post('/getadminproducts', async (req, res) => {
    const admin = await AdminLogin.find({ email: req.body.email })
    if (admin.length == 0) {
        res.status(400).send("No such user found")
    }
    res.status(200).json({ msg: admin[0].products })
})


//api to add  user cart items
app.post('/addtocart', authenticateuser, async (req, res) => {
    const user = await UserLogin.find({ _id: req.user.id })
    let itemid = Number(req.body.id)
    user[0].cartdata[itemid] += 1;
    await UserLogin.findOneAndUpdate({ _id: req.user.id }, { cartdata: user[0].cartdata })
    res.status(200).json({ msg: "item  added to cart" })
})


//api to delete user cart items
app.post('/deletecartitem', authenticateuser, async (req, res) => {
    const user = await UserLogin.find({ _id: req.user.id })
    let itemid = Number(req.body.id)

    user[0].cartdata[itemid] -= 1;
    await UserLogin.findOneAndUpdate({ _id: req.user.id }, { cartdata: user[0].cartdata })
    res.status(200).json({ msg: "item  deleted fromcart" })
})

//api to getall user  items
app.post('/getcartitems', authenticateuser, async (req, res) => {
    const user = await UserLogin.find({ _id: req.user.id })
    console.log(user[0].cartdata)
    res.status(200).json(user[0].cartdata)
})

//api to get user details logged in my website using his token
app.post('/getuser', authenticateuser, async (req, res) => {
    const user = await UserLogin.find({ _id: req.user.id })
    console.log(user[0].email, "**")
    res.status(200).json(user[0].email)
})

//api to get admin details logged in my website
app.post('/getadmin', authenticateadmin, async (req, res) => {
    const user = await AdminLogin.find({ _id: req.body })
    res.status(200).json(user[0].email)
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
    const prod = await Product.findOne({ image: req.body.image })
    await Product.findOneAndDelete({ image: req.body.image })
    let publicid = prod.image.split('/').pop().split('.')[0]
    const response = await mediaDeleter(publicid)
    console.log(response)
    res.json({ msg: "Deletd successfully from website" })
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

app.post('/createappointmentbooking', async (req, res) => {

    const { email, url } = req.body;
    console.log(email, url);
    const product = await AdminLogin.findOneAndUpdate(
        { email: email },
        { $set: { url: url } }, // Corrected: update operation
        { new: true, runValidators: true, upsert: true }
    );

    if (!product) {
        return res.json({ msg: "No data found" });
    }
    res.json({ product });
});


app.post('/getadminimagebases', async (req, res) => {
    const { image } = req.body;

    try {
        const response = await AdminLogin.findOne(
            { "products.image": image }, // Query to find the product with the specified image
            { url: 1 } // Project the fields you want to return
        );

        if (!response) {
            return res.json({ msg: "No seller found with the specified image URL" });
        }

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the data." });
    }
});


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