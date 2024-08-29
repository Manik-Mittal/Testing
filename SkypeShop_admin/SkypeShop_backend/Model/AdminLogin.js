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
    url: {
        type: String,
    },
})

module.exports = mongoose.model('AdminLogin', AdminLogin)