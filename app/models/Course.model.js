const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
	initName: {
		type: String,
	},
	shortName: {
		type: String,
	},
	fullName: {
		type: String,
	},
	docLink: {
		type: String,
	},
	groups: {
		type: [
			{
				groupId: {
					type: String,
				},
				groupName: {
					type: String,
				},
				activities: {
					type: [
						{
							someId: {
								type: String,
							},
							name: {
								type: String,
							},
							value: {
								type: String,
							},
							valueBy: {
								type: String,
							},
						},
					],
				},
			},
		],
	},
});

module.exports = mongoose.model('course', courseSchema);
