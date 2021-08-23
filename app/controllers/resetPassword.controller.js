const User = require('../models/User.model');
const isValid = require('../modules/isValid');
const bcrypt = require('bcryptjs');
const transporter = require('../../configs/nodemailer');
const mountEmail = require('../modules/mountEmail');

module.exports = {
	get: (req, res) => {
		let emailId = req.params.emailId;

		User.findOne({ emailHash: emailId })
			.then((resUser) => {
				if (!resUser) {
					res.render('err', {
						logged: false,
						pathReload: '/signIn',
						message:
							'O link para redefinição não está correto ou não é mais válido, tente novamente mais tarde',
					});
				} else {
					if (resUser.toReset) {
						res.render('resetPassword', {
							email: resUser.email,
							emailHash: emailId,
						});
					} else {
						res.render('err', {
							logged: false,
							pathReload: '/signIn',
							message:
								'O link para redefinição não está correto ou não é mais válido, tente novamente mais tarde',
						});
					}
				}
			})
			.catch((err) => {
				res.render('err', {
					logged: false,
					pathReload: '/signIn',
					message:
						'O link para redefinição não está correto ou não é mais válido, tente novamente mais tarde',
				});
			});
	},
	post: (req, res) => {
		let emailHash = req.body.emailHash;
		let emailId = req.body.email;
		let passwordId = req.body.password;
		let responseArray = { type: 'success', content: [] };

		if (!isValid.email(emailId)) {
			responseArray.type = 'err';
			responseArray['content'].push({
				type: 'email',
				message: 'E-mail inválido',
			});
		}

		if (!isValid.password(passwordId)[0]) {
			responseArray.type = 'err';
			responseArray['content'].push({
				type: 'password',
				message: isValid.password(passwordId)[1],
			});
		}

		if (responseArray.type == 'err') {
			res.end(JSON.stringify(responseArray));
		} else {
			User.findOneAndUpdate(
				{ emailHash: emailHash, email: emailId },
				{ toReset: false, pwdHash: bcrypt.hashSync(passwordId) }
			)
				.then((resUser) => {
					if (!resUser) {
						responseArray.type = 'err';
						responseArray['content'].push({
							type: 'err',
							message: 'Algo deu errado',
						});
						res.end(JSON.stringify(responseArray));
					} else {
						responseArray['content'].push('Ok');
						res.end(JSON.stringify(responseArray));
					}
				})
				.catch((err) => {
					responseArray.type = 'err';
					responseArray['content'].push({
						type: 'err',
						message: 'Algo deu errado',
					});
					res.end(JSON.stringify(responseArray));
				});
		}
	},
	getSendEmail: (req, res) => {
		const emailParams = req.params.emailId;
		let responseArray = { type: 'success', content: [] };

		if (!isValid.email(emailParams)) {
			responseArray.type = 'err';
			responseArray['content'].push({
				type: 'email',
				message: 'E-mail inválido',
			});
			res.end(JSON.stringify(responseArray));
		} else {
			User.findOneAndUpdate({ email: emailParams }, { toReset: true })
				.then((resUser) => {
					if (resUser) {
						const emailHash = resUser.emailHash;
						const bodyEmail = mountEmail.resetPassword(
							emailParams,
							emailHash
						);
						transporter
							.sendMail(bodyEmail)
							.then((message) => {
								console.log(message);
								responseArray['content'].push('Ok');
								res.end(JSON.stringify(responseArray));
							})
							.catch((err) => {
								responseArray.type = 'err';
								responseArray['content'].push({
									type: 'problem',
									message: 'O e-mail não pôde ser verificado',
								});
								res.end(JSON.stringify(responseArray));
							});
					} else {
						responseArray.type = 'err';
						responseArray['content'].push({
							type: 'problem',
							message: 'A redefinição não pôde ser finalizada',
						});
						res.end(JSON.stringify(responseArray));
					}
				})
				.catch((err) => {
					responseArray.type = 'err';
					responseArray['content'].push({
						type: 'problem',
						message: 'A redefinição não pôde ser finalizada',
					});
					res.end(JSON.stringify(responseArray));
				});
		}
	},
};
