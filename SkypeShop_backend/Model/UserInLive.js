const mongoose = require('mongoose')

const UserInLive = new mongoose.Schema({
    livename: {
        type: String,
        require: true,
    },
    isinsidelive: {
        type: Boolean,
        require: true,
        default: false
    },
    room: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model('UserInLive', UserInLive)