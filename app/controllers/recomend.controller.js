const Recomend = require('../models/Recomend.model');
const infoLogged = require('../modules/infoLogged');

var controlGroup = ['g1', 'g2', 'g3'];

var selectPublic = [
	'???',
	'Geral',
	'Somente do DACOM',
	'Somente do DAMEC',
	'Somente do DAMAT',
	'Somente do DAELE',
	'Somente de Eng. Computação',
	'Somente de Eng. Software',
	'Somente de A. Des. Sist.',
	'Somente de Eng. Mecânica',
	'Somente de Eng. Elétrica',
	'Somente de Eng. Eletrônica',
	'Somente de Eng. Contr. Aut.',
	'Somente de Lic. Matemática',
];

var controlHour = [
	'00h',
	'01h',
	'02h',
	'03h',
	'04h',
	'05h',
	'06h',
	'07h',
	'08h',
	'09h',
	'10h',
	'11h',
	'12h',
	'13h',
	'14h',
	'15h',
	'16h',
	'17h',
	'18h',
	'19h',
	'20h',
	'21h',
	'22h',
	'23h',
];

var controlMinute = [
	'00m',
	'05m',
	'10m',
	'15m',
	'20m',
	'25m',
	'30m',
	'35m',
	'40m',
	'45m',
	'50m',
	'55m',
];

function mountRecomendCards(allRecomend, userId) {
	let recomendCards = '';

	allRecomend.forEach((oneRecomend) => {
		let manageOptions = '">';

		if (oneRecomend.userId == userId) {
			manageOptions = ' position-relative">';
			manageOptions +=
				'<div class="position-absolute myRecomends d-none" style="right: 1%; top: 2%">';
			manageOptions +=
				'<button class="btn btn-warning btn-sm" onclick="prepareToEditRecomend(\'';
			manageOptions += oneRecomend._id.toString();
			manageOptions += '\')"><i class="far fa-edit"></i></button>';
			manageOptions +=
				'<button class="btn btn-danger btn-sm" onclick="deleteRecomend(\'';
			manageOptions += oneRecomend._id.toString();
			manageOptions +=
				'\')"><i class="far fa-trash-alt"></i></button></div>';
		}

		recomendCards += '<div id="';
		recomendCards += oneRecomend._id.toString();
		recomendCards +=
			'" class="col-11 col-md-5 col-lg-4 py-3 box-custom mx-2' +
			manageOptions;

		recomendCards +=
			'<div class="row justify-content-center mb-2"><div class="col-5"><div class="h5 text-white">Nome</div><div class="h6 text-white-50">';
		recomendCards += oneRecomend.name;
		recomendCards +=
			'</div></div><div class="col-5"><div class="h5 text-white">Grupo</div><div class="h6 text-white-50">';
		recomendCards += oneRecomend.group[1];
		recomendCards +=
			'</div></div></div><div class="row justify-content-center mb-2"><div class="col-10"><div class="h5 text-white">Descrição</div><div class="h6 text-white-50">';
		recomendCards += oneRecomend.description;
		recomendCards +=
			'</div></div></div><div class="row justify-content-center mb-2"><div class="col-5"><div class="h5 text-white">Local</div><div class="h6 text-white-50">';
		recomendCards += oneRecomend.local;
		recomendCards +=
			'</div></div><div class="col-5"><div class="h5 text-white">Público</div><div class="h6 text-white-50">';
		recomendCards += selectPublic[oneRecomend.public];
		recomendCards +=
			'</div></div></div><div class="row justify-content-center"><div class="col-5"><div class="h5 text-white">Data</div><div class="h6 text-white-50">';
		recomendCards +=
			oneRecomend.date.substr(8, 2) +
			'/' +
			oneRecomend.date.substr(5, 2) +
			'/' +
			oneRecomend.date.substr(0, 4);
		recomendCards +=
			'</div></div><div class="col-5"><div class="h5 text-white">Horário</div><div class="h6 text-white-50">';
		recomendCards += oneRecomend.hour + oneRecomend.minute;
		recomendCards += '</div></div></div></div>';
	});

	return recomendCards;
}

module.exports = {
	get: (req, res) => {
		let objToSend = infoLogged.onlyNavbar(req.user);
		objToSend.userId = null;
		objToSend.recomendCards = '';

		if (req.user) objToSend.userId = req.user._id.toString();

		Recomend.find()
			.then((allRecomend) => {
				objToSend.recomendCards = mountRecomendCards(
					allRecomend,
					objToSend.userId
				);

				if (objToSend.recomendCards.length == 0)
					objToSend.recomendCards = 'Não há recomendações no momento';

				res.render('recomend', objToSend);
			})
			.catch((err) => {
				console.log('Erroooou: ' + err);
				res.render('err', {
					logged: logged,
					pathReload: '/recomend',
					message:
						'Não foi possível visualizar os dados, tente novamente',
				});
			});
	},
	postInsertRecomend: (req, res) => {
		if (
			req.body.date[4] == '-' &&
			req.body.date[7] == '-' &&
			controlHour.includes(req.body.hour) &&
			controlMinute.includes(req.body.minute) &&
			req.body.local.length >= 3 &&
			req.body.name.length >= 5
		) {
			let objToSave = {
				userId: req.user._id.toString(),
				name: req.body.name,
				description:
					req.body.description.length > 5
						? req.body.description
						: '???',
				local: req.body.local,
				public:
					req.body.public > 0 && req.body.public <= 13
						? req.body.public
						: '???',
				date: req.body.date,
				hour: req.body.hour,
				minute: req.body.minute,
				group: controlGroup.includes(req.body.group)
					? req.body.group
					: '???',
			};

			new Recomend(objToSave)
				.save()
				.then(() => {
					res.redirect('/recomend');
				})
				.catch((err) => {
					console.log('Erroooou: ' + err);
					res.render('err', {
						logged: true,
						pathReload: '/recomend',
						message:
							'Não foi possível salvar os dados, tente novamente',
					});
				});
		} else {
			res.render('err', {
				logged: true,
				pathReload: '/recomend',
				message:
					'Um ou mais campos obrigatórios não foram preenchidos, tente novamente',
			});
		}
	},
	getPrepareToEditRecomend: (req, res) => {
		Recomend.findById(req.params.recomendId)
			.then((oneRecomend) => {
				if (oneRecomend.userId == req.user._id.toString()) {
					if (oneRecomend) {
						res.end(JSON.stringify(oneRecomend));
					} else
						res.render('err', {
							logged: true,
							pathReload: '/recomend',
							message:
								'Não foi possível encontrar as informações requisitadas no banco de dados, tente novamente',
						});
				} else
					res.render('err', {
						logged: true,
						pathReload: '/recomend',
						message:
							'Não foi possível encontrar as informações requisitadas no banco de dados, tente novamente',
					});
			})
			.catch((err) => {
				console.log('Erroooou: ' + err);
				res.render('err', {
					logged: true,
					pathReload: '/recomend',
					message:
						'Não foi possível encontrar as informações requisitadas no banco de dados, tente novamente',
				});
			});
	},
	postEditRecomend: (req, res) => {
		if (
			req.body.date[4] == '-' &&
			req.body.date[7] == '-' &&
			controlHour.includes(req.body.hour) &&
			controlMinute.includes(req.body.minute) &&
			req.body.local.length >= 3 &&
			req.body.name.length >= 5
		) {
			Recomend.findByIdAndUpdate(req.body.recomendId, {
				$set: {
					userId: req.user._id.toString(),
					name: req.body.name,
					description:
						req.body.description.length > 5
							? req.body.description
							: '???',
					local: req.body.local,
					public:
						req.body.public > 0 && req.body.public <= 13
							? req.body.public
							: '???',
					date: req.body.date,
					hour: req.body.hour,
					minute: req.body.minute,
					group: controlGroup.includes(req.body.group)
						? req.body.group
						: '???',
				},
			})
				.then(() => {
					res.redirect('/recomend');
				})
				.catch((err) => {
					console.log('Erroooou: ' + err);
					res.render('err', {
						logged: true,
						pathReload: '/recomend',
						message:
							'Não foi possível salvar os dados, tente novamente',
					});
				});
		} else {
			res.render('err', {
				logged: true,
				pathReload: '/recomend',
				message:
					'Um ou mais campos obrigatórios não foram preenchidos, tente novamente',
			});
		}
	},
	getDeleteRecomend: (req, res) => {
		Recomend.findById(req.params.recomendId)
			.then((oneRecomend) => {
				if (oneRecomend.userId == req.user._id.toString()) {
					Recomend.findByIdAndDelete(oneRecomend._id.toString())
						.then(() => {
							res.end(JSON.stringify(['Ok']));
						})
						.catch((err) => {
							console.log('Erroooou: ' + err);
							res.render('err', {
								logged: true,
								pathReload: '/recomend',
								message:
									'Não foi possível deletar os dados, tente novamente',
							});
						});
				} else
					res.render('err', {
						logged: true,
						pathReload: '/recomend',
						message:
							'Não foi possível deletar os dados, tente novamente',
					});
			})
			.catch((err) => {
				console.log('Erroooou: ' + err);
				res.render('err', {
					logged: true,
					pathReload: '/recomend',
					message:
						'Não foi possível deletar os dados, tente novamente',
				});
			});
	},
};
