var mongoose = require('mongoose');
var schema = mongoose.Schema;

var fields = new schema({
    _id : {
        type : String,
        default : new Date().getTime()
    },
    head_name : {
        type : String
    },
    description : {
        type : String
    },
    Bill_Amount : {
        type : String
    },
    file : {
        type : String
    },
    reimbursment_year : {
        type : String
    }
});

module.exports = mongoose.model('reimbursment_application',fields);

module.exports.save_application = function(data,callback)
{
    data.save(callback);
}