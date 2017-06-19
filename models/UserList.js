const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserListSchema = new Schema({
	user_id: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	list_id: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'List'
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

const UserList = mongoose.model('UserList', UserListSchema);

module.exports = UserList;