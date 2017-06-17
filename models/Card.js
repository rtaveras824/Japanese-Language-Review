var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CardSchema = new Schema({
	side_a: {
		type: String,
		required: true,
		trim: true
	},
	side_b: {
		type: String,
		required: true,
		trim: true
	},
	photo_url: String,
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