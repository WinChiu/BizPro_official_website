const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	number: {
		type: String,
		required: true
	},
	jobTitle: {
		type: String,
		required: true
	},
	exp: {
		type: [String],
		required: true
	},
	tags: {
		type: [String],
		required: true
	},
	avater: {
		type: String		
	},
});

module.exports = mongoose.model('alumni', AlumniSchema);
