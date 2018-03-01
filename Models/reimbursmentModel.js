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
    total_reimbursment : {
        type : String
    },
    monthly_reimbursment : {
        type : String
    },
    quaterly_reimbursment : {
        type : String
    },
    reimbursment_year : {
        type : String
    }
});

module.exports = mongoose.model('reimbursment_head',fields);

module.exports.save_head = function(data,callback)
{
    data.save(callback);
}