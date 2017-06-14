const PassportLocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = new PassportLocalStrategy({
	usernameField: 'display_name',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, displayName, password, done) => {
	const userData = {
		display_name: displayName.trim(),
		password: password.trim()
	};

	const newUser = new User(userData);
	newUser.save((err, user) => {
		if (err) return err;

		console.log('User');

		const payload = {
			sub: user._id
		};

		const token = jwt.sign(payload, config.JWT_SECRET);
		const data = {
			name: user.display_name
		}

		return done(null, token, data);
	});
});