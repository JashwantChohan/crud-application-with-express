var mongoose = require('mongoose')

var schema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    FirstName: {
        type: String,
        default: ''

    },
    LastName: {
        type: String,
        default: ''

    },
    phone: String,

})

var user = new mongoose.model('User', schema)
module.exports = user;