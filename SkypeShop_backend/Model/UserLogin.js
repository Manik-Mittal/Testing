const mongoose = require('mongoose')


const UserLogin = new mongoose.Schema({
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
    cartdata: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('UserLogin', UserLogin)