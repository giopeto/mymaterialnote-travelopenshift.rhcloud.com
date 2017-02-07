var passport = require('passport');
var User = require('../models/users');

var LocalStrategy   = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {

	User.findOne({'email': email}, function(err, user) {
		if (err) {
			res.send(err);
		}
		if (user) {
			return done(null, false, {message: 'That email is already taken. SET IN PASSPORT JS'});
		} else {
			var newUser = new User();

			// set the user's local credentials
			newUser.name    = req.body.name;
			newUser.email    = email;
			newUser.password = newUser.encryptPassword(password);

			User.create(
				newUser
				, function (err, data) {
					console.log ('In posttt: ', err);
					if (err)
						return done(err);
					return done(null, newUser);
				});
		}

	});
}));

passport.use('local.signin', new LocalStrategy({
	// by default, local strategy uses username and password, we will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {

	User.findOne({'email': email}, function(err, user) {

		if (err) { return done(err); }
		// Return if user not found in database
		if (!user) {
			return done(null, false, {
				message: 'User not found'
			});
		}
		// Return if password is wrong
		if (!user.validPassword(password)) {
			return done(null, false, {
				message: 'Password is wrong'
			});
		}
		// If credentials are correct, return the user object
		return done(null, user);

	});
}));