var express = require('express');
var app = module.exports = express();
var mongoose = require ('mongoose');

//Display login page
app.get('/login', function(req, res) {
    res.render('login', {pageTitle: 'Please Login'});

}); //end of Display login


//Authenticate login
app.post('/login', function(req, res) {
    var input_user = req.body.user_login;
    var input_pass = req.body.pass_login
    //check if username and password match
    if(input_user === "daking") {
        if(input_pass === "kingtak") {
            //create session if matched
            req.session.name = input_user;
            //res.send('Welcome '+input_user+'. You are now logged in!');
            //send to ajax call if matched
            res.send({redirect: '/'});
        } else {
            //send to ajax call if password is wrong
            res.send('Wrong password, please try again.');
        }
    } else {
        //send to ajax call if username is wrong
        res.send('Your username doesn\'t exist, please try again.');
    }

}); //end of Authenticate login


//Logout user session
app.get('/logout', function(req, res) {
    //Destroy user session
    req.session.destroy();
    res.send({redirect: '/'});
});