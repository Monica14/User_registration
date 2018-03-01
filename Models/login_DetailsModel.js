var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema;

var userfields = new schema({
    _id: {
        type: String,
        default: new Date().getTime()
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('login_Details', userfields);

module.exports.save_application = function(data,callback)
{
    data.save(callback);
}

// var userdata = mongoose.model('userfields');

// module.exports.createuser = function (dataval, callback) {
//     bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(dataval.password, salt, function (err, hash) {
//             dataval.password = hash;
//             dataval.save(callback);
//         });
//     });
// }

// module.exports.selectuser = function (dataval, callback) {
    
//     // bcrypt.genSalt(10, function (err, salt) {
//     //     bcrypt.hash(dataval.password, salt, function (err, hash) {
//             userdata.find({username: dataval.username},function(err,result){
//                 console.log(result)
//             })            
//     //    })
//     // })
// }