var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema;

var userfields = new schema({
    _id: {
        type: String,
        default: new Date().getTime()
    },
    full_name: {
        type: String
    },
    username: {
        type: String
    },
    email_id: {
        type: String
    },
    phone_number: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('userfields', userfields);

var userdata = mongoose.model('userfields');

module.exports.createuser = function (dataval, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(dataval.password, salt, function (err, hash) {
            dataval.password = hash;
            dataval.save(callback);
        });
    });
}

module.exports.selectuser = function (dataval, callback) {
    
    // bcrypt.genSalt(10, function (err, salt) {
    //     bcrypt.hash(dataval.password, salt, function (err, hash) {
            userdata.find({username: dataval.username},function(err,result){
                console.log(result)
            })            
    //    })
    // })
}