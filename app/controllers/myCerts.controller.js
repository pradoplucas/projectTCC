const Person = require('../models/Person.model');
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const fs = require('fs');
const downloadFiles = require('../modules/downloadFiles');
// const multer = require('multer');
const multerUpload = require('../modules/multerUpload');
const path = require('path');
const infoLogged = require('../modules/infoLogged');
const mountAccordion = require('../modules/mountAccordion');

const errMessage = {
	'Too many parts': 'Muitas partes foram enviadas',
	'File too large':
		'O arquivo enviado é muito grande, o tamanho máximo aceito é de 1MB',
	'Too many files': 'Muitos arquivos foram enviados, o máximo aceito é 1',
	'Field name too long': 'O nome do arquivo enviado é muito grande',
	'Field value too long': 'O valor do campo enviado é muito grande',
	'Too many fields': 'Muitos campos enviados',
	'Unexpected field': 'Campo inesperado enviado',
	'Invalid format':
		'O formato do arquivo enviado é inválido, o único formato aceito é .pdf',
};

module.exports = {
	get: (req, res) => {
		const userLog = req.user;

		if (userLog.dname && userLog.dname.length > 5) {
			Course.findOne({ initName: userLog.courseInit })
				.then((oneCourse) => {
					res.render(
						'myCerts',
						infoLogged.myCerts(userLog, oneCourse)
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
	getGroupsList: (req, res) => {
		const userLog = req.user;

		Course.findOne({ initName: userLog.courseInit })
			.then((oneCourse) => {
				let tableOcult = '';
				let tableG1 = '';
				let tableG2 = '';
				let tableG3 = '';

				userLog.certificates.forEach((oneCert) => {
					if (oneCert.ocult || oneCert.group == 'na') {
						tableOcult += mountAccordion.table(
							oneCert,
							true,
							oneCourse
						);
					} else if (oneCert.group == 'g1') {
						tableG1 += mountAccordion.table(
							oneCert,
							false,
							oneCourse
						);
					} else if (oneCert.group == 'g2') {
						tableG2 += mountAccordion.table(
							oneCert,
							false,
							oneCourse
						);
					} else if (oneCert.group == 'g3') {
						tableG3 += mountAccordion.table(
							oneCert,
							false,
							oneCourse
						);
					}
				});

				let accordionAll = mountAccordion.accordion(tableG1, '1');
				accordionAll += mountAccordion.accordion(tableG2, '2');
				accordionAll += mountAccordion.accordion(tableG3, '3');
				accordionAll += mountAccordion.accordion(tableOcult, 'NA');

				res.end(JSON.stringify([accordionAll, oneCourse]));
			})
			.catch((err) => {
				console.log('Erro:\n' + err);
				res.end(JSON.stringify(['err']));
			});
	},
	postOcultCert: (req, res) => {
		const userLog = req.user;
		let userLogEdit = userLog;
		let rightCert = {};

		for (oneCert of userLogEdit.certificates) {
			if (oneCert.code == req.body.certCode) {
				rightCert = oneCert;
				oneCert.ocult = true;
				break;
			}
		}

		User.findByIdAndUpdate(userLog._id.toString(), {
			$set: {
				certificates: userLogEdit.certificates,
			},
		})
			.then(() => {
				res.end(JSON.stringify(rightCert));
			})
			.catch((err) => {
				console.log('Erro:\n' + err);
				res.end(JSON.stringify({ message: 'Err' }));
			});
	},
	postShowCert: (req, res) => {
		const userLog = req.user;
		let userLogEdit = userLog;
		let rightCert = {};

		for (oneCert of userLogEdit.certificates) {
			if (oneCert.code == req.body.certCode) {
				rightCert = oneCert;
				oneCert.ocult = false;
				break;
			}
		}

		User.findByIdAndUpdate(userLog._id.toString(), {
			$set: {
				certificates: userLogEdit.certificates,
			},
		})
			.then(() => {
				res.end(JSON.stringify(rightCert));
			})
			.catch((err) => {
				console.log('Erro:\n' + err);
				res.end(JSON.stringify({ message: 'Err' }));
			});
	},
	getPrepareToEditCert: (req, res) => {
		const userLog = req.user;
		let certRight = {};

		for (oneCert of userLog.certificates) {
			if (oneCert.code == req.params.certCode) certRight = oneCert;
		}

		Course.findOne({ initName: userLog.courseInit })
			.then((oneCourse) => {
				res.end(JSON.stringify([certRight, oneCourse]));
			})
			.catch((err) => {
				console.log('Erro:\n' + err);
				res.end(JSON.stringify(['err']));
			});
	},
	postEditCert: (req, res) => {
		multerUpload(req, res, function (err) {
			if (err) {
				res.render('err', {
					logged: true,
					pathReload: '/myCerts',
					message: errMessage[err.message]
						? errMessage[err.message]
						: 'Tente novamente, caso não consiga, entre em contato',
				});
			} else {
				const userLog = req.user;
				let userLogEdit = userLog;

				for (oneCert of userLogEdit.certificates) {
					if (oneCert.code == req.body.code) {
						oneCert.eventName = req.body.eventName;
						(oneCert.group =
							req.body.group == '[Selecione]'
								? 'na'
								: req.body.group),
							(oneCert.activity =
								req.body.activity == '[Selecione]'
									? 'na'
									: req.body.activity),
							(oneCert.value = req.body.value);
						oneCert.year = req.body.year;

						if (req.file) {
							let codeold = oneCert.code;
							oneCert.code = req.file.filename;

							let pathFolder =
								'uploads/newCerts/' +
								userLog._id.toString() +
								'/';

							fs.readdirSync(pathFolder).forEach((file) => {
								if (file == codeold) {
									fs.unlink(pathFolder + file, (err) => {
										if (err) {
											console.log('Erro:\n' + err);
											res.end(
												JSON.stringify({
													message: 'Err',
												})
											);
										}
									});
								}
							});
						}

						break;
					}
				}

				User.findByIdAndUpdate(userLog._id.toString(), {
					$set: {
						certificates: userLogEdit.certificates,
					},
				})
					.then(() => {
						res.redirect('myCerts');
					})
					.catch((err) => {
						console.log('Erro:\n' + err);
						res.end(JSON.stringify({ message: 'Err' }));
					});
			}
		});
	},
	getPrepareToInsertCert: (req, res) => {
		const userLog = req.user;

		Course.findOne({ initName: userLog.courseInit })
			.then((oneCourse) => {
				res.end(JSON.stringify(oneCourse));
			})
			.catch((err) => {
				res.end('err');
			});
	},
	postInsertCert: (req, res) => {
		multerUpload(req, res, function (err) {
			console.log(err);
			if (err) {
				res.render('err', {
					logged: true,
					pathReload: '/myCerts',
					message: errMessage[err.message]
						? errMessage[err.message]
						: 'Tente novamente, caso não consiga, entre em contato',
				});
			} else {
				const userLog = req.user;

				let fileCode = (
					Math.floor(Math.random() * 10000) + 1000
				).toString();

				if (req.file) {
					fileCode = req.file.filename;
				}

				const newObjArray = {
					code: fileCode,
					eventId: (
						Math.floor(Math.random() * 10000) + 1000
					).toString(),
					eventName: req.body.eventName,
					year: req.body.year,
					group:
						req.body.group == '[Selecione]' ? 'na' : req.body.group,
					activity:
						req.body.activity == '[Selecione]'
							? 'na'
							: req.body.activity,
					value: req.body.value,
					ocult: true,
					delete: true,
				};

				User.findByIdAndUpdate(userLog._id.toString(), {
					$push: { certificates: newObjArray },
				})
					.then(() => {
						res.redirect('myCerts');
					})
					.catch((err) => {
						console.log('Erro:\n' + err);
						res.end(JSON.stringify({ message: 'Err' }));
					});
			}
		});
	},
	getDeleteCert: (req, res) => {
		const userLog = req.user;

		let userLogCerts = [];
		let notCertCode = '';

		for (oneCert of userLog.certificates) {
			if (oneCert.code != req.params.certCode) userLogCerts.push(oneCert);
			else notCertCode = oneCert.code;
		}

		let pathFolder = 'uploads/newCerts/' + userLog._id.toString() + '/';

		fs.readdirSync(pathFolder).forEach((file) => {
			if (file == notCertCode) {
				fs.unlink(pathFolder + file, (err) => {
					if (err) {
						console.log('Erro:\n' + err);
						res.end(JSON.stringify({ message: 'Err' }));
					}
				});
			}
		});

		User.findByIdAndUpdate(userLog._id.toString(), {
			$set: {
				certificates: userLogCerts,
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
	getCertsDownload: (req, res) => {
		let arrayCodes = JSON.parse(req.params.arrayCodes);

		for (objCert in arrayCodes) {
			if (arrayCodes[objCert].length > 0) {
				for (codes of arrayCodes[objCert]) {
					if (
						codes.code.endsWith('.pdf') ||
						codes.code.endsWith('.PDF')
					)
						codes.fromSGCE = false;
					else codes.fromSGCE = true;
				}
			} else delete arrayCodes[objCert];
		}

		let userId =
			'user_' + (Math.floor(Math.random() * 10000) + 1) + Date.now();

		downloadFiles(userId, arrayCodes, req.user._id.toString())
			.then(() => {
				res.end(JSON.stringify({ userId: userId.toString() }));
			})
			.catch((err) => {
				console.log('Err: ' + err);
			});
	},
};
