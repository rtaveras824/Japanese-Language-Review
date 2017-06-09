var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CardSchema = new Schema({
	sideA: {
		type: String,
		required: true,
		trim: true
	},
	sideB: {
		type: String,
		required: true,
		trim: true
	},
	photoUrl: String,
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

var Card = mongoose.model('Card', CardSchema);

module.exports = Card;