const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		},
		name: {
			type: String
		},
		email: {
			type: String
		},
		phone: {
			type: String
		},
		type: {
			type: String,
			default: 'personal'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('contact', ContactSchema);
