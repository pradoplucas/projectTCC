const Person = require('../models/Person.model');
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const infoLogged = require('../modules/infoLogged');

module.exports = {
	get: (req, res) => {
		const userLog = req.user;

		if (userLog.dname && userLog.dname.length > 5) {
			Course.findOne({ initName: userLog.courseInit })
				.then((oneCourse) => {
					res.render(
						'indexLog',
						infoLogged.indexLog(userLog, oneCourse)
					);
				})
				.catch((err) => {
					console.log('Erro:\n' + err);
				});
		} else
			res.render('indexConfig', {
				username: 'Menu',
				notifications: null,
			});
	},
	getSaveName: (req, res) => {
		let errCount = 0;

		if (
			['ADS'].includes(req.params.course) &&
			parseInt(req.params.period) > 6
		)
			errCount++;
		else if (
			['ESW', 'LMT'].includes(req.params.course) &&
			parseInt(req.params.period) > 8
		)
			errCount++;
		else if (
			['ECP', 'ECA', 'ELE', 'ELT', 'EMC'].includes(req.params.course) &&
			parseInt(req.params.period) > 10
		)
			errCount++;
		else if (parseInt(req.params.period) < 1) errCount++;

		if (errCount == 0) {
			Person.findById(req.params.personId.toString())
				.then((onePerson) => {
					let upCerts = [];

					onePerson.certificates.forEach((cert) => {
						upCerts.push({
							code: cert.code,
							eventId: cert.eventId,
							eventName: cert.eventName,
							year: cert.year,
							group: 'na',
							activity: 'na',
							value: '0',
							ocult: true,
							delete: false,
						});
					});

					Course.findOne({ initName: req.params.course })
						.then((oneCourse) => {
							User.findByIdAndUpdate(req.user._id.toString(), {
								$set: {
									ownerId: onePerson._id,
									dname: onePerson.name,
									period: req.params.period,
									courseInit: oneCourse.initName,
								},
								$push: {
									certificates: upCerts,
								},
							})
								.then(() => {
									console.log('Foooi');
									res.end(
										JSON.stringify({ message: 'Aeeeee' })
									);
								})
								.catch((err) => {
									console.log('Erro:\n' + err);
									res.end(JSON.stringify({ message: 'Err' }));
								});
						})
						.catch((err) => {
							console.log('Erro:\n' + err);
							res.end(JSON.stringify({ message: 'Err' }));
						});
				})
				.catch((err) => {
					console.log('Erro:\n' + err);
					res.end(JSON.stringify({ message: 'Err' }));
				});
		} else res.end(JSON.stringify({ message: 'Err' }));
	},
	getIndex: (req, res) => {
		let objToSend = {
			logged: false,
			username: null,
			notifications: null,
		};

		if (req.user) {
			objToSend.logged = true;

			if (req.user.username && req.user.username.length >= 8)
				objToSend.username = req.user.username;

			if (req.user.notifications.length > 0)
				objToSend.notifications = req.user.notifications;
		}

		res.render('indexNot', objToSend);
	},
};
