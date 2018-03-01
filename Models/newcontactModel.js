var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema;

var userfields = new schema({
    _id: {
        type: String,
        default: new Date().getTime()
    },
    nickname: {
        type: String
    },
    name: {
        type: String
    },
    email_id: {
        type: String
    },
    phone_number: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model('newcontact', userfields);

