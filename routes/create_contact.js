var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
var mongoose = require('mongoose');
var userdata = mongoose.model("newcontact");

/* GET home page. */
router.post('/', function (req, res, next) {
    ////////////////// Express Validations ///////////////////////////////////
    req.checkBody('email_id', 'Invalid email').notEmpty().isEmail();
    req.checkBody('city', 'Only alphabets are allowed for city field').notEmpty().matches(/^[a-zA-Z]/);
    req.checkBody('name', 'Only alphabets are allowed for name field').notEmpty().matches(/^[a-zA-Z]/);
    req.checkBody('phone_number', 'Please enter valid phone number').notEmpty().matches(/^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/);
    req.checkBody('nickname', 'Please enter nickname').notEmpty();
    errors = req.validationErrors();
    if (errors) {
        for (var i = 0; i < errors.length; i++) {
            res.send(errors[i]['msg']);
            break;
        }
    }
    else {
        ////////////// Verification for unique nickname //////////////////////////////
        contact_details = new userdata(req.body);
        userdata.find({ nickname: req.body.nickname }, function (nickname_err, nickname_result) {
            if (nickname_result.length == 0) {
                contact_details.save(function (err, result) {
                    res.send("Contact Saved")
                })
            }
            else if (nickname_result.length > 0) {
                res.send("User with this nickname already exists");
            }


        })
    }   

});

/////////////// Display Contact List ////////////////////////////
router.get('/getusers', function (req, res) {
    userdata.find({}, function (err, user1) {
        res.send(user1);
    })
});

module.exports = router;
