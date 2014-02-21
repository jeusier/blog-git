var express = require('express');
var app = module.exports = express();

app.get('/login', function(req, res) {
    res.render('login', {pageTitle: 'Please Login'});
});

app.post('/login', function(req, res) {
    var input_user = req.body.user_login;
    var input_pass = req.body.pass_login

    if(input_user === "testuser") {
        if(input_pass === "kingtak") {
            req.session.name = input_user;
            res.send('You are now logged in as '+input_user+', please <a href="/blogs">click here</a> to return to the home page');
            return;
        } else {
            res.send('Wrong password, please log in again <a href="/login">here</a>.');
        }
    } else {
        res.send('Your username does not exist, please log in again <a href="/login">here</a>.');
    }

});


app.get('/logout', function(req, res) {
    req.session.destroy();
    res.send('You have logged out. <a href="/login">Login</a> again or return to <a href="/blogs">home page</a>.');
});