const mongoose = require('mongoose')

const LiveStreamSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    availabe: {
        type: Boolean,
        defaut: true,
    }
})

module.exports = mongoose.model('LiveStream', LiveStreamSchema)