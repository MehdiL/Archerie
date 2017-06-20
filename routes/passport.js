var LocalStrategy = require('passport-local').Strategy;
var models = require("../models");

module.exports = function (passport) {

    var utilisateur = function(id,nom,prenom,login,password,isadmin,isrespgamme,isouvrier,isvente,isachat,iscompta) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.login = login;
        this.password = password;
        this.isadmin = isadmin;
        this.isrespgamme = isrespgamme;
        this.isouvrier = isouvrier;
        this.isvente = isvente;
        this.isachat = isachat;
        this.iscompta = iscompta;

    };

    // objet utilisateur -> identifiant de session
    passport.serializeUser(function (user, done) {
        done(null, {  'id':user.id ,'nom':user.nom ,'prenom':user.prenom ,'login':user.login ,'password':user.password ,'isadmin':user.isadmin ,'isrespgamme':user.isrespgamme ,'isouvrier':user.isouvrier,'isvente':user.isvente,'isachat':user.isachat,'iscompta':user.iscompta  });
    });

    // identifiant de session -> objet utilisateur
    passport.deserializeUser(function (user, done) {
        // console.log(user);
        done(null, new utilisateur(user.id ,user.nom ,user.prenom ,user.login ,user.password ,user.isadmin ,user.isrespgamme ,user.isouvrier,user.isvente,user.isachat,user.iscompta));
    });

    passport.use('local-login', new LocalStrategy({
            // champs du formulaire login
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, login, password, done) {

            // console.log(password+"pass");
            if(password==="" || login == ""){
                return done(null, false);
            }

            models.User.findOne({ where: {login: login} }).then(function(user) {
              //  console.log(user);
                if(user != undefined){

                    if (login === user.login && password === user.password) {
                        console.log(done);
                        return done(null, new utilisateur(user.id, user.nom, user.prenom, user.login, user.password, user.isadmin, user.isrespgamme, user.isouvrier, user.isvente, user.isachat, user.iscompta));

                    } else {
                        console.log("2");
                        return done(null, false);
                    }
                }else {
                    console.log("3");
                    return done(null, false);
                }
            })

        }));
};