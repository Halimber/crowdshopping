var passport                = require('passport');
var LocalStrategy           = require('passport-local').Strategy;
var FacebookStrategy        = require('passport-facebook').Strategy;
var TwitterStrategy         = require('passport-twitter').Strategy;


var db = require('../models');

var UserModel               = db.haUsuario;
/*
var ClientModel             = db.appClient;
var AccessTokenModel        = db.accessToken;
var RefreshTokenModel       = db.refreshToken;
*/

passport.serializeUser(function(user, done) {
    done(null, user);
});

// Facebook LOGIN
passport.use(new FacebookStrategy({
        clientID: '778634608924068',
        clientSecret: 'eebd89d9f630faf3038309f9e79f2f76',
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id','first_name','last_name','email','displayName', 'photos','location','likes','links','movies','music','feed','events']
    },
    function(accessToken, refreshToken, profile, done) {
        if(profile){
            proccessUserData(accessToken,profile);
        }
        return done(null, false);
    }
));

passport.deserializeUser(function(id, done) {
    db['haUsuario'].findById(id).then(function(user){
        if(user){
            done(null,user);
        }else{
            UserModel.findById(id).then(function(usuario) {
                done(null,user);
            });
        }
    });
});

// Twitter Strategy
passport.use(new TwitterStrategy({
        consumerKey: 'osOLVOTIiAYaZgSHHmZJAK0h1',
        consumerSecret: 'JL05tglt5XcrYFA2AjnGrFGupDUuAnADor7uPL7uxmRaX7TZdC',
        callbackURL: "/auth/twitter/callback"
        //callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        console.log('Twitter Profile');
        console.log(profile);
        /*
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return done(err, user);
        });
        */
    }
));

// Usada para logeo Web
passport.use(new LocalStrategy({
        usernameField: 'correo',
        passwordField: 'password'
    },
    function(username, password, done) {
        UserModel.find({ where:{ correo: username } }).then(function(usuario) {
            //if (err) { return done(err); }
            if (!usuario) { return done(null, false); }
            if (usuario.hashedPassword != usuario.encryptPassword(password,usuario.salt) ) { return done(null, false); }

            return done(null, usuario.id);
        });
    }
));