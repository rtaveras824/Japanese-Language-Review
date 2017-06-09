var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ListSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	cards: [{
		type: Schema.Types.ObjectId,
		ref: 'Card'
	}],
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

var List = mongoose.model('List', ListSchema);

modules.exports = List;