const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	fromUserId: {
		type: String,
		required: true,
		minlength: 3,
	},
	toUserId: {
		type: String,
		required: true,
		minlength: 3,
	},
	listingId: {
		type: String,
		required: true,
		minlength: 3,
	},
	content: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50,
	},
	dateTime: {
		type: Date,
	},
});

const Message = mongoose.model('Message', messageSchema);

exports.Message = Message;
