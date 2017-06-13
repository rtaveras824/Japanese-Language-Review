const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config.json');

module.exports = new PassportLocalStrategy({
	usernameField: 'display_name',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, displayName, password, done) => {
	const userData = {
		displayName: displayName.trim(),
		password: password.trim()
	};

	return User.findOne({ display_name: userData.displayName }, (err, user) => {
		if (err) { return err; }

		if (!user) {
			const error = new Error('Incorrect username');
			error.name = 'IncorrectCredentialsError';
			return done(error);
		}

		return user.comparePassword(userData.password, (passwordErr, isMatch) => {
			if (passwordErr) { 
				return done(passwordErr); 
			}
			
			if (!isMatch) {
				const error = new Error('Incorrect password.');
				error.name = 'IncorrectCredentialsError';
				return done(error);
			}

			const payload = {
				sub: user._id
			}

			const token = jwt.sign(payload, config.JWT_SECRET);
			const data = {
				name: user.display_name
			};

			console.log('user', JSON.stringify(user));

			return done(null, token, data);
		});
	});
});