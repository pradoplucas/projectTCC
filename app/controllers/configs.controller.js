const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const isValid = require('../modules/isValid');

module.exports = {
	get: (req, res) => {
		const userLog = req.user;

		if (userLog.dname && userLog.dname.length > 5) {
			let objToSend = {
				dname: userLog.dname,
				fname: userLog.fname,
				lname: userLog.lname,
				ra: userLog.ra,
				period: userLog.period,
				campus: userLog.campus,
				courseInit: userLog.courseInit,
				email: userLog.email,
				username: userLog.username,
				configs: {
					recomend: userLog.configs.recomend ? 'checked' : '',
					certs: userLog.configs.certs ? 'checked' : '',
					func: userLog.configs.func ? 'checked' : '',
				},
			};

			res.render('configs', objToSend);
		} else
			res.render('indexConfig', {
				username: 'Menu',
				notifications: null,
			});
	},
	postUpProfile: (req, res) => {
		const userLog = req.user;

		let errCount = 0;

		if (
			['ADS'].includes(userLog.courseInit) &&
			parseInt(req.body.period) > 6
		)
			errCount++;
		else if (
			['ESW', 'LMT'].includes(userLog.courseInit) &&
			parseInt(req.body.period) > 8
		)
			errCount++;
		else if (
			['ECP', 'ECA', 'ELE', 'ELT', 'EMC'].includes(userLog.courseInit) &&
			parseInt(req.body.period) > 10
		)
			errCount++;
		else if (parseInt(req.body.period) < 1) errCount++;

		if (!isValid.ra(req.body.ra) && req.body.ra.length > 0) {
			res.end(JSON.stringify({ message: 'Err' }));
		} else if (errCount != 0) {
			res.end(JSON.stringify({ message: 'Err' }));
		} else {
			User.findByIdAndUpdate(userLog._id.toString(), {
				$set: {
					fname: req.body.fname,
					lname: req.body.lname,
					ra: req.body.ra,
					period: req.body.period,
				},
			})
				.then(() => {
					res.end(JSON.stringify({ message: 'Ok' }));
				})
				.catch((err) => {
					console.log('Erro:\n' + err);
					res.end(JSON.stringify({ message: 'Err' }));
				});
		}
	},
	postUpNotif: (req, res) => {
		const userLog = req.user;

		User.findByIdAndUpdate(userLog._id.toString(), {
			$set: {
				configs: {
					recomend: req.body.recomend == 'true',
					certs: req.body.certs == 'true',
					func: req.body.func == 'true',
				},
			},
		})
			.then(() => {
				res.end(JSON.stringify({ message: 'Ok' }));
			})
			.catch((err) => {
				console.log('Erro:\n' + err);
				res.end(JSON.stringify({ message: 'Err' }));
			});
	},
	postUpSeg: (req, res) => {
		let passwordCheck = true;

		let objUpdate = {
			username: req.body.username,
		};

		if (req.body.password) {
			objUpdate.pwdHash = bcrypt.hashSync(req.body.password);
			passwordCheck = isValid.password(req.body.password)[0];
		}

		const userLog = req.user;

		if (isValid.username(req.body.username)[0] && passwordCheck) {
			User.findByIdAndUpdate(userLog._id.toString(), {
				$set: objUpdate,
			})
				.then(() => {
					res.end(JSON.stringify({ message: 'Ok' }));
				})
				.catch((err) => {
					console.log('Erro:\n' + err);
					res.end(JSON.stringify({ message: 'Err' }));
				});
		} else res.end(JSON.stringify({ message: 'Err' }));
	},
};
