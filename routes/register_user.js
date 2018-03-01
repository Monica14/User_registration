var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userdata = mongoose.model("userfields");

////////////////// Passport Strategy ////////////////////
passport.use('local.usercheck', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    userdata.findOne({ 'username': username }, function (err, user1) {
        if (err) {
            return done(err);
        }
        if (!user1) {
            return done(null, false); 
        }
        return done(null, user1);      

    })
}))

///////////////// Passport Login Verfication /////////////////////////
router.post('/auth', passport.authenticate('local.usercheck', {failureRedirect: '/register_user/error_occured'}),function(req,res){
    res.send("user found")   
});

//////////////// Add New User ////////////////////////////////////
router.post('/',function(req,res){
    var details = new userdata(req.body);
    userdata.createuser(details, function (err, result) {
        if (!err) {
            res.send("success");
        }
    })
});

/////////////// Display Error while passport authentication ////////////
router.get('/error_occured', function (req, res, next) {
    res.send("User already exists with same username");
});



module.exports = router;
