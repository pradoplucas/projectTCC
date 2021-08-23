const Event = require('../models/Event.model');
const downloadFiles = require('../modules/downloadFiles');
const infoLogged = require('../modules/infoLogged');

module.exports = {
	get: (req, res) => {
		res.render('searchEvent', infoLogged.onlyNavbar(req.user));
	},
	getEventSearch: (req, res) => {
		let resEventYear = req.params.eventYear;

		let eventInfo = [];

		Event.find({ year: resEventYear })
			.then((events) => {
				events.forEach((value, index, array) => {
					eventInfo.push({
						_id: value._id,
						eventName: value.eventName,
					});
				});

				res.end(JSON.stringify(eventInfo));
			})
			.catch((err) => {
				console.log('Erro:\n ' + err);
			});
	},
	getEventList: (req, res) => {
		Event.findById(req.params.eventId.toString())
			.then((event) => {
				res.end(JSON.stringify(event));
			})
			.catch((err) => {
				console.log('Erro:\n ' + err);
			});
	},
	getEventDownload: (req, res) => {
		let arrayCodes = JSON.parse(req.params.arrayCodes);

		for (objCert of arrayCodes) {
			objCert.fromSGCE = true;
		}

		let userId =
			'user_' + (Math.floor(Math.random() * 10000) + 1) + Date.now();

		downloadFiles(userId, { myCerts: arrayCodes })
			.then(() => {
				res.end(userId.toString());
			})
			.catch((err) => {
				console.log('Err: ' + err);
			});
	},
};
