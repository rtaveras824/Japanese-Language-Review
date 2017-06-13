const express = require('express');
const passport = require('passport');

const router = new express.Router();

router.post('/login', (req, res, next) => {
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

		return res.json({
			success: true,
			message: 'You have successfully logged in.',
			token,
			user: data
		});
	})(req, res, next);
});

module.exports = router;