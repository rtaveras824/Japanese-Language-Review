const express = require('express');
const passport = require('passport');

const router = new express.Router();

router.post('/login', (req, res, next) => {
	console.log('passport', req.body);
	return passport.authenticate('local-login', (err, token, data) => {
		if (err) {
			if (err.name === 'IncorrectCredentialsError') {
				return res.status(400).json({
					success: false,
					message: err.message
				});
			}

			return res.status(400).json({
				success: false,
				message: 'Could not process form.'
			});
		}

		console.log('token', token, 'data', data);

		return res.json({
			success: true,
			message: 'You have successfully logged in.',
			token,
			user: data
		});
	})(req, res, next);
});

router.post('/signup', (req, res, next) => {
	return passport.authenticate('local-signup', (err, token, data) => {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				// the 11000 Mongo code is for a duplication email error
				// the 409 HTTP status code is for conflict error
				return res.status(409).json({
					success: false,
					message: 'Check the form for errors.',
					errors: {
						email: 'This email is already taken.'
					}
				});
			}

			return res.status(400).json({
				success: false,
				message: 'Could not process form.'
			});
		}

		return res.json({
			success: true,
			message: 'You have successfully signed up!',
			token,
			user: data
		})
	})(req, res, next);
});

module.exports = router;