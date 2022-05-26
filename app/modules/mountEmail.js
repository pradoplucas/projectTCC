var urlKey = process.env.URL_LOCAL_KEY;
if (process.env.NODE_ENV == 'production') urlKey = process.env.URL_DOMAIN_KEY;

module.exports = {
	verifyEmail: (email, emailHash) => {
		const linkURL = urlKey + '/verifyEmail/' + emailHash.toString();

		let htmlStr = 'Olá, ' + email + '!<br><br>';
		let textStr = 'Olá, ' + email + '!';

		htmlStr +=
			'Agradeço por criar uma conta no CertificaUTF. Por favor, clique no link abaixo para confirmar o endereço de e-mail.<br><br>';
		textStr +=
			'Agradeço por criar uma conta no CertificaUTF. Por favor, clique no link abaixo para confirmar o endereço de e-mail.';

		htmlStr +=
			'<a href="' +
			linkURL +
			'">Confirmar endereço de e-mail.<a><br><br>';
		textStr += linkURL;

		htmlStr += 'Qualquer dúvida, responda esse e-mail explicando.<br><br>';
		textStr += 'Qualquer dúvida, responda esse e-mail explicando.';

		htmlStr += 'Obrigado.<br><br>';
		textStr += 'Obrigado.';

		htmlStr +=
			'- Se você recebeu esse e-mail por engano, apenas o ignore, por favor :) -';
		textStr +=
			'- Se você recebeu esse e-mail por engano, apenas o ignore, por favor :) -';

		return {
			from: 'CertificaUTF <certificautf@gmail.com>',
			to: email,
			subject:
				'Confirme o endereço de e-mail para a conta do CertificaUTF',
			text: textStr,
			html: htmlStr,
		};
	},
	resetPassword: (email, emailHash) => {
		const linkURL = urlKey + '/resetPassword/' + emailHash.toString();

		let htmlStr = 'Olá, ' + email + '!<br><br>';
		let textStr = 'Olá, ' + email + '!';

		htmlStr +=
			'Me parece que você esqueceu sua senha. Por favor, clique no link abaixo para redefinir a sua senha.<br><br>';
		textStr +=
			'Me parece que você esqueceu sua senha. Por favor, clique no link abaixo para redefinir a sua senha.';

		htmlStr += '<a href="' + linkURL + '">Redefinir senha.<a><br><br>';
		textStr += linkURL;

		htmlStr += 'Qualquer dúvida, responda esse e-mail explicando.<br><br>';
		textStr += 'Qualquer dúvida, responda esse e-mail explicando.';

		htmlStr += 'Obrigado.<br><br>';
		textStr += 'Obrigado.';

		htmlStr +=
			'- Se você recebeu esse e-mail por engano, apenas o ignore, por favor :) -';
		textStr +=
			'- Se você recebeu esse e-mail por engano, apenas o ignore, por favor :) -';

		return {
			from: 'CertificaUTF <certificautf@gmail.com>',
			to: email,
			subject: 'Redefinição de senha para a conta do CertificaUTF',
			text: textStr,
			html: htmlStr,
		};
	},
};
