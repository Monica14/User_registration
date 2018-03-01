var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
var mongoose = require('mongoose');
var multer = require('multer');
// var express_session = require('express-session');
var login_Details = mongoose.model("login_Details");
// router.use(express_session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
//   }));


/* GET home page. */
// router.post('/', function (req, res, next) {
//     ////////////////// Express Validations ///////////////////////////////////
//     req.checkBody('email_id', 'Invalid email').notEmpty().isEmail();
//     req.checkBody('city', 'Only alphabets are allowed for city field').notEmpty().matches(/^[a-zA-Z]/);
//     req.checkBody('name', 'Only alphabets are allowed for name field').notEmpty().matches(/^[a-zA-Z]/);
//     req.checkBody('phone_number', 'Please enter valid phone number').notEmpty().matches(/^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/);
//     req.checkBody('nickname', 'Please enter nickname').notEmpty();
//     errors = req.validationErrors();
//     if (errors) {
//         for (var i = 0; i < errors.length; i++) {
//             res.send(errors[i]['msg']);
//             break;
//         }
//     }
//     else {
//         ////////////// Verification for unique nickname //////////////////////////////
//         contact_details = new userdata(req.body);
//         userdata.find({ nickname: req.body.nickname }, function (nickname_err, nickname_result) {
//             if (nickname_result.length == 0) {
//                 contact_details.save(function (err, result) {
//                     res.send("Contact Saved")
//                 })
//             }
//             else if (nickname_result.length > 0) {
//                 res.send("User with this nickname already exists");
//             }


//         })
//     }

// });

/////////////// Display Contact List ////////////////////////////
router.post('/authenticate', function (req, res) {
    // login_Details.find({username:req.body.username,password:req.body.password}, function (err, user1) {
    //     req.session.emaildata = req.body.username;
    //     console.log(req.session);
    //     //req.session.save();
    //     res.send(req.session);
    // });
    // req.session.cookie.expires = Date.now() + (30 * 86400 * 1000);
    req.session.emaildata = req.body.username;
    res.send(req.body.username);
});

router.post('/add_new', function (req, res) {
    login_data = new login_Details(req.body)
    login_Details.save_application(login_data, function (err, user1) {
        res.send(user1);
    })
});

router.get('/sess_data_set', function (req, res) {
    req.session.emaildata = "req.body.username";
    res.send(req.session);
})

router.get('/sess_data', function (req, res) {
    emaildata = req.session.emaildata;
    console.log(req.session);
    res.send(req.session);
});

module.exports = router;