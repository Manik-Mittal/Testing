const mongoose = require('mongoose')

const Polloption = new mongoose.Schema({

    '1': {
        type: Number,
    },
    '2': {
        type: Number,

    },
    '3': {
        type: Number,

    },
    '4': {
        type: Number,

    },
    '5': {
        type: Number,
    },
    prodid: {
        type: String,
    },


})

module.exports = mongoose.model('Polloption', Polloption)