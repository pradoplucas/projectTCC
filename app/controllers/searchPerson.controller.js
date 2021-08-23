const Person = require('../models/Person.model');
const mountTable = require('../modules/mountTable');
const downloadFiles = require('../modules/downloadFiles');
const infoLogged = require('../modules/infoLogged');

module.exports = {
	get: (req, res) => {
		res.render('searchPerson', infoLogged.onlyNavbar(req.user));
	},
	getPersonSearch: (req, res) => {
		let personInfo = [];
		let personName = req.params.personName.toUpperCase();

		Person.find({ name: { $regex: personName } })
			.then((person) => {
				person.forEach((value, index, array) => {
					personInfo.push({
						_id: value._id,
						name: value.name,
						li:
							'<li><a href="javascript:getPersonList(\'' +
							value._id.toString() +
							'\');">' +
							value.name +
							'</a></li>',
					});
				});

				res.end(JSON.stringify(personInfo));
			})
			.catch((err) => {
				console.log('Erro:\n ' + err);
			});
	},
	getPersonList: (req, res) => {
		Person.findById(req.params.personId.toString())
			.then((onePerson) => {
				res.end(JSON.stringify(mountTable.personRowCheck(onePerson)));
			})
			.catch((err) => {
				console.log('Erro:\n ' + err);
			});
	},
	getPersonListSimple: (req, res) => {
		Person.findById(req.params.personId.toString())
			.then((onePerson) => {
				res.end(
					JSON.stringify(mountTable.personTableSimple(onePerson))
				);
			})
			.catch((err) => {
				console.log('Erro:\n ' + err);
			});
	},
	getPersonDownload: (req, res) => {
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
