const mongoose = require('mongoose')


const AdminLogin = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    products: {
        type: Array,
    },
})

module.exports = mongoose.model('AdminLogin', AdminLogin)