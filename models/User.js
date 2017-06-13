const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
	display_name: {
		unique: true,
		type: String,
		required: true,
		trim: true
	},
	password: {
		required: true,
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
	bcryptjs.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
	const user = this;

	// proceed further only if the password is modified or user is new
	if (!user.isModified('password')) return next();

	return bcryptjs.genSalt((saltError, salt) => {
		if (saltError) { return next(saltError); }

		return bcryptjs.hash(user.password, salt, (hashError, hash) => {
			if (hashError) { return next(hashError); }

			// replace password string with hash value
			user.password = hash;

			return next();
		});
	});
});

const User = mongoose.model('User', UserSchema);

module.exports = User;