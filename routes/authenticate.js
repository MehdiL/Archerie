var express = require('express');

module.exports = function (app,passport) {
    app.post('/authenticate', passport.authenticate('local-login', {
            successRedirect: '/index',
            failureRedirect: '/login'
        }
    ));
}