var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
var mongoose = require('mongoose');
var multer = require('multer');
var userdata = mongoose.model("reimbursment_head");
var reimbursment_application = mongoose.model("reimbursment_application");
var fs = require('fs');
var del = require('node-delete');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log("hkjhjkhj")
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({ storage: storage });

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

/////////////// Display Contact List ////////////////////////////
router.post('/demo', function (req, res) {
    head_details = new userdata(req.body);
    userdata.save_head(head_details, function (err, result) {
        if (err) {
            res.send(err)
        }
        else {
            res.send("Saved")
        }
    })
});

/////////////// Display Contact List ////////////////////////////
router.get('/get_applications', function (req, res) {
    reimbursment_application.find({}, function (err, result) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
});

/////////////// reimbursment_application ////////////////////////////
router.post('/reimbursment_application', upload.any(), function (req, res) {
    head_details = new reimbursment_application({
        _id : new Date().getTime(),
        head_name: req.body.head_name,
        file: req.files[0].filename,
        description: req.body.description,
        Bill_Amount: req.body.Bill_Amount,
        reimbursment_year: req.body.reimbursment_year,
    });
    console.log(head_details);
    reimbursment_application.save_application(head_details, function (err, result) {
        if (err) {
            res.send(err)
        }
        else {
            res.send("File Uploaded")
        }
    })
});

router.post('/reimbursment_clear_data', function (req, res) {
    console.log(req.body.id);
    
    fs.access("/var/www/html/User_registration/uploads/", error => {
        if (!error) {
            fs.unlink("/var/www/html/User_registration/uploads/"+req.body.filename,function(error){
                if(error)
                {
                    res.send(error)
                }
                else {
                    reimbursment_application.remove({_id:req.body.id},function(e,r){
                        res.send("File Deleted")
                    })                    
                }
            });
        } else {
            console.log(error);
        }
    });

   
});

module.exports = router;
