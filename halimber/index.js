// Require Modules
var express = require('express')
db = require('./models');
bodyParser = require('body-parser');
passport = require('passport');
oauth2 = require('./lib/oauth2');
cookieSession = require('cookie-session');
//twitter = require('twitter');

fbgraph = require('fbgraphapi');

var app = express();

// Carga el motor de renderización de EJS
app.set('view engine','ejs');
// Permite pasar elementos de los formularios como parte de Body
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded());

app.use(cookieSession({
    keys: ['secret1']
}));
// Configurar Passport para validación de login
app.use(passport.initialize());
app.use(passport.session());

require('./lib/auth');
Auth = require('./lib/authorization');

app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname+'/views');

// Renderiza por método GET la vista INDEX
app.get('/login', function(req, res, next) {
	res.render('index');
});

app.get('/', Auth.isAuthenticated, function(req, res, next) {
	res.render('home');
});

app.get('/home', Auth.isAuthenticated, function(req, res, next) {
	res.render('home');
});

app.post('/login', passport.authenticate('local',{successRedirect:'/home', failureRedirect:'/'}) );

app.get('/logout',function(req,res,next){
	req.logout();
	res.redirect('/');
});

// Facebook Request
app.get('/auth/facebook', passport.authenticate('facebook',{scope:['user_posts','user_status','user_location','email','user_events','rsvp_event','user_likes']} ));
app.get('/auth/facebook/callback',
  	passport.authenticate('facebook', { 
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

// Twitter Request
app.get('/auth/twitter',
passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
	passport.authenticate('twitter', { failureRedirect: '/login' }),
function(req, res) {
	// Successful authentication, redirect home.
	res.redirect('/');
});

// Foursquare Request
app.get('/auth/foursquare',
	passport.authenticate('foursquare'));

app.get('/auth/foursquare/callback', 
	passport.authenticate('foursquare', { failureRedirect: '/login' }),
	function(req, res) {
    	// Successful authentication, redirect home.
    	res.redirect('/');
});

// Linkedin Request
app.get('/auth/linkedin', passport.authenticate('linkedin'));
app.get('/auth/linkedin/callback', 
	passport.authenticate('linkedin', { failureRedirect: '/login' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
});


/* 
	Name: proccessUserData
	Autor: Yamil Díaz Aguirre
	Description: Procesa la información obtenida del usuario y la almacena en sus respectivos modelos 
*/
proccessUserData = function(accessToken,profile){
	//console.log('accessToken: '+ accessToken);
    var fb = new fbgraph.Facebook(accessToken, 'v2.2');
    /*
    fb.me(function(err, me) {
        console.log(me);
    });
    */

    //var imagen = 'https://graph.facebook.com/'+profile._json.id+'/picture/picture?width=250&height=250';

    //console.log('PROFILE_JSON:');
    /*
    console.log('Eventos:');
    console.log(profile['_json']['events']);
    */
    // Obtener Comentarios de páginas a las que el usuario ha dado like
    /*
    console.log('Page/Feed');
    profile['_json']['likes']['data'].some(function(like){
        fb.graph('/'+like['id']+'/feed',function(err, res) {
            console.log(err, res);
        });
    });
	*/

	// 1- Crear usuario
	var data = {
        fb_id: profile._json.id,
        nombres: profile._json.first_name,
        apellidos: profile._json.last_name,
        correo: (profile._json.email) ? profile._json.email : null,
        estado: (profile._json.location) ? profile._json.location.name : null
    };

	db['haUsuario'].findOrCreate({where:data,defaults:{fb_id: profile._json.id} }).then(function(usuario){
		if(usuario){
			profile['_json']['likes']['data'].some(function(like){

				var pagina = {
					name: like['name'],
					category: like['category'],
					fb_id: like['id'],
					ha_usuario_id: usuario[0]['dataValues']['id']
				};
				// 2- Crea páginas que le gustan a usuario
				console.log('2');
				console.log(pagina);
				db['fbPagina'].findOrCreate({where:pagina,defaults:pagina}).then(function(haPagina){
					//console.log(haPagina);
				});
				/*
				fb.graph('/'+like['id']+'/feed',function(err, res) {

				});
				*/
			});
		}
	});
	
	// 3- Crea comentarios de páginas (Aplicando filtros de marcas productos o keywords)
	// 4- Crea comentarios de su muro (Aplicando filtros de marcas productos o keywords)
	// 5- Crea eventos próximos
        
    /*
    db['usuario'].findOrCreate({where:{correo:(data['correo']) ? data['correo'] : ''},defaults:data}).then(function(item){
        //console.log('USUARIO ES:');
        //console.log(item);
    })
    .catch(function(reason){
        console.log('FALLO POR:');
        console.log(reason);
    });
    */
};

// Sincroniza los modelos a la base de datos
sequelize.sync();

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})
