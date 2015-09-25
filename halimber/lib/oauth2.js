var oauth2orize         = require('oauth2orize');
var passport            = require('passport');
var crypto              = require('crypto');
//var config              = require('./config');
var db = require('../models');

var UserModel               = db.usuario;
var ClientModel             = db.appClient;
var AccessTokenModel        = db.accessToken;
var RefreshTokenModel       = db.refreshToken;

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Grant
server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {   
  var code = 'utils.uid(16)'; 
  console.log('MAMI'.green);
    done(null, code);

}));

// Exchange code for access token.
server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI, done) {
    db['usuario'].find({where:{fb_id:code} }).success(function(usuario){

        RefreshTokenModel.find({where:{userId: usuario.id, clientId: client.clientId} }).success(function(item){
            if(item) item.destroy().success(function(affectedRows){ });
        });

        console.log({userId: usuario.id, clientId: client.clientId});

        AccessTokenModel.find({where:{userId: usuario.id, clientId: client.clientId} }).success(function(item){
            if(item) item.destroy().success(function(affectedRows){ });
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');


        AccessTokenModel.create({ token: tokenValue, clientId: client.clientId, userId: usuario.id }).success(function(item){ 
            //if(!item) { return done(); }
            done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
        });

        RefreshTokenModel.create({ token: refreshTokenValue, clientId: client.clientId, userId: usuario.id }).success(function(item){ 
            //if(!item) { return done(); }
            //done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
        });


    });

    /*
    db.authorizationCodes.find(code, function(err, authCode) {
        if (err) { return done(err); }
        if (authCode === undefined) { return done(null, false); }
        if (client.id !== authCode.clientID) { return done(null, false); }
        if (redirectURI !== authCode.redirectURI) { return done(null, false); }

        db.authorizationCodes.delete(code, function(err) {
            if(err) { return done(err); }
            var token = utils.uid(256);
            db.accessTokens.save(token, authCode.userID, authCode.clientID, function(err) {
                if (err) { return done(err); }
                done(null, token);
            });
        });
    });
    */
}));

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    console.log('oauth2orize.exchange.password'.green);
    UserModel.find({ where: { correo: username } }).success(function(user) {
        //if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.checkPassword(password)) { return done(null, false); }

        RefreshTokenModel.find({where:{userId: user.id, clientId: client.clientId} }).success(function(item){
            if(item) item.destroy().success(function(affectedRows){ });
        });

        console.log({userId: user.id, clientId: client.clientId});

        AccessTokenModel.find({where:{userId: user.id, clientId: client.clientId} }).success(function(item){
            if(item) item.destroy().success(function(affectedRows){ });
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');


        AccessTokenModel.create({ token: tokenValue, clientId: client.clientId, userId: user.id }).success(function(item){ 
            //if(!item) { return done(); }
            done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
        });

        RefreshTokenModel.create({ token: refreshTokenValue, clientId: client.clientId, userId: user.id }).success(function(item){ 
            //if(!item) { return done(); }
            //done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
        });

        var info = { scope: '*' }
    });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshTokenModel.find({ where: { token: refreshToken } }).success(function(token) {
        //if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        UserModel.find(token.userId).success(function(user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            RefreshTokenModel.find({where:{userId: user.id, clientId: client.clientId} }).success(function(item){
            if(item) item.destroy().success(function(affectedRows){ });
            });

            AccessTokenModel.find({where:{userId: user.id, clientId: client.clientId} }).success(function(item){
                if(item) item.destroy().success(function(affectedRows){ });
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            
            AccessTokenModel.create({ token: tokenValue, clientId: client.clientId, userId: user.id }).success(function(item){ 
                //if(!item) { return done(); }
                done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
            });

            RefreshTokenModel.create({ token: refreshTokenValue, clientId: client.clientId, userId: user.id }).success(function(item){ 
                //if(!item) { return done(); }
                //done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
            });
        });
    });
}));

// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];