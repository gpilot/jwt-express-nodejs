/*
* @Author: Guillaume Pilot
* @Date:   2016-09-09
* @Last Modified by:   Guillaume Pilot
* @Last Modified time: 2016-09-09
*/
var express = require('express');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

//Init Express
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


var USERNAME = 'user';
var PASSWORD = 'pwd';

var app_port = process.env.PORT || 3000;
//Define option for JWT
var secret = process.env.SECRET || 'secret';
var expiresIn = process.env.EXPIRE_TIME || 30;//Seconds or string
/*
	Define JWT passport strategy
*/
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = secret;
opts.ignoreExpiration = false;
opts.jwtFromRequest = ExtractJwt.versionOneCompatibility({ authScheme:'bearer' });
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	console.log(jwt_payload);
	done(null, jwt_payload.iat);
}));

/*
	No auth route
*/
app.get('/', function (req, res) {
	res.send('Hey');
});

/*
	Signin route, return token if username and password valid
*/
app.post('/signin', function(req, res) {
	if(!req.body || !req.body.username || !req.body.password) return res.sendStatus(400);
	if(req.body.username !== USERNAME || req.body.password!==PASSWORD) return res.sendStatus(401);
	console.log(req.body);
	var options = {};
	if(!req.body.remember && req.body.remember!==true){
		options.expiresIn=expiresIn;
	}
	var token = jwt.sign({name:'user'}, secret, options);
	res.send({token:token});
});

/*
	Auth route
*/
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send('Seems good');
    }
);

app.listen(app_port, function () {
	console.log('JWT app listening on port ', app_port, '!');
	console.log('You can define environment variable SECRET & EXPIRE_TIME, default to secret & 30');
});

