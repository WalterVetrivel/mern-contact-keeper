const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('user', UserSchema);
