const isValid = require('../modules/isValid');
const transporter = require('../../configs/nodemailer');
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const mountEmail = require('../modules/mountEmail');

module.exports = {
	get: (req, res) => {
		res.render('signUp');
	},
	post: (req, res) => {
		const emailBody = req.body.email;
		const pwdBody = req.body.password;
		let responseArray = { type: 'success', content: [] };

		if (!isValid.email(emailBody)) {
			responseArray.type = 'err';
			responseArray['content'].push({
				type: 'email',
				message: 'E-mail inválido',
			});
		}

		if (!isValid.password(pwdBody)[0]) {
			responseArray.type = 'err';
			responseArray['content'].push({
				type: 'password',
				message: isValid.password(pwdBody)[1],
			});
		}

		if (responseArray.type == 'err') {
			res.end(JSON.stringify(responseArray));
		} else {
			const emailHash = bcrypt
				.hashSync(emailBody)
				.replace(/\/|\$|\%|\&/gi, 'x');
			const bodyEmail = mountEmail.verifyEmail(emailBody, emailHash);

			User.findOne({ email: emailBody })
				.then((resUser) => {
					if (!resUser) {
						new User({
							ownerId: '',
							emailConfirm: false,
							toReset: false,
							dname: '',
							fname: '',
							lname: '',
							ra: '',
							period: '',
							campus: 'CP',
							courseInit: '',
							email: emailBody,
							emailHash: emailHash,
							username: '',
							pwdHash: bcrypt.hashSync(pwdBody),
							notifications: [],
							certificates: [],
							groups: {
								g1: '0',
								g2: '0',
								g3: '0',
							},
							configs: {
								recomend: false,
								certs: false,
								func: false,
							},
						})
							.save()
							.then(() => {
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
											message:
												'O e-mail não pôde ser verificado',
										});
										res.end(JSON.stringify(responseArray));
									});
							})
							.catch((err) => {
								responseArray.type = 'err';
								responseArray['content'].push({
									type: 'problem',
									message:
										'O cadastro não pôde ser finalizado',
								});
								res.end(JSON.stringify(responseArray));
							});
					} else {
						console.log(
							bcrypt.compareSync(pwdBody, resUser.pwdHash)
						);
						if (
							!resUser.emailConfirm &&
							bcrypt.compareSync(pwdBody, resUser.pwdHash)
						) {
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
										message:
											'O e-mail não pôde ser verificado',
									});
									res.end(JSON.stringify(responseArray));
								});
						} else {
							responseArray.type = 'err';
							responseArray['content'].push({
								type: 'problem',
								message: 'O cadastro não pôde ser finalizado',
							});
							res.end(JSON.stringify(responseArray));
						}
					}
				})
				.catch((err) => {
					responseArray.type = 'err';
					responseArray['content'].push({
						type: 'problem',
						message: 'O cadastro não pôde ser finalizado',
					});
					res.end(JSON.stringify(responseArray));
				});
		}
	},
};
