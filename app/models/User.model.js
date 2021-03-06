const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	ownerId: {
		type: String,
	},
	emailConfirm: {
		type: Boolean,
	},
	toReset: {
		type: Boolean,
	},
	dname: {
		type: String,
	},
	fname: {
		type: String,
	},
	lname: {
		type: String,
	},
	ra: {
		type: String,
	},
	period: {
		type: String,
	},
	campus: {
		type: String,
	},
	courseInit: {
		type: String,
	},
	email: {
		type: String,
	},
	emailHash: {
		type: String,
	},
	username: {
		type: String,
	},
	pwdHash: {
		type: String,
	},
	notifications: {
		type: [
			{
				code: {
					type: String,
				},
				event: {
					type: String,
				},
				date: {
					type: String,
				},
			},
		],
	},
	certificates: {
		type: [
			{
				code: {
					type: String,
				},
				eventId: {
					type: String,
				},
				eventName: {
					type: String,
				},
				year: {
					type: String,
				},
				group: {
					type: String,
				},
				activity: {
					type: String,
				},
				value: {
					type: String,
				},
				ocult: {
					type: Boolean,
				},
				delete: {
					type: Boolean,
				},
			},
		],
	},
	groups: {
		type: {
			g1: {
				type: String,
			},
			g2: {
				type: String,
			},
			g3: {
				type: String,
			},
		},
	},
	configs: {
		type: {
			notifications: {
				type: {
					recomend: {
						type: Boolean,
					},
					certs: {
						type: Boolean,
					},
					func: {
						type: Boolean,
					},
				},
			},
		},
	},
});

module.exports = mongoose.model('user', userSchema);
