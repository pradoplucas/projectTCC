const mongoose = require('mongoose');
const { Schema } = mongoose;

const suggestionSchema = new Schema({
	suggestion: {
		type: String,
	},
	date: {
		type: Date,
	},
	accepted: {
		type: Boolean,
	},
	applied: {
		type: Boolean,
	},
});

module.exports = mongoose.model('suggestion', suggestionSchema);
