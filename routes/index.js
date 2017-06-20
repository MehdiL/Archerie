var express = require('express');
var router = express.Router();


   router.get(['/', '/login'], function (req, res, next) {
    if (req.originalUrl === '/' || req.originalUrl === '/login') {
        if (req.isAuthenticated()) {
            res.redirect('/index');
        } else {

            res.render('login', {layout: false});
        }
    }
   });
   //isLoggedIn,
       router.get('/index',  function (req, res) {
           //var username = req.user.prenom+req.user.nom;
           console.log(req);
           res.render('index');
           // , {title: 'Archerie',username:username}
       });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        // si utilisateur authentifié, continuer
        console.log(req);
        if (req.isAuthenticated()) {
            return next();
        }
        // sinon afficher formulaire de login
        console.log("tet");
        res.redirect('/login');
    }


module.exports = router;
