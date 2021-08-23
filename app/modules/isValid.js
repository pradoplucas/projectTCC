const isValid = {
	email: (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	},
	password: (password) => {
		if (/\s/g.test(password)) return [false, 'Senha contem espaços'];
		else if (password.length < 8) return [false, 'Senha muito curta'];
		else if (password.length > 16) return [false, 'Senha muito longa'];

		return [true, 'Success'];
	},
	username: (username) => {
		if (/\s/g.test(username)) return [false, 'Senha contem espaços'];
		else if (username.length < 8) return [false, 'Senha muito curta'];
		else if (username.length > 16) return [false, 'Senha muito longa'];

		return [true, 'Success'];
	},
	ra: (raStr) => {
		const raLength = raStr.length;
		let nMult = raLength;
		let sum = 0;

		for (let i = 0; i < raLength - 1; i++) {
			sum += parseInt(raStr.charAt(i)) * nMult;
			nMult--;
		}

		let res = (sum * 10) % 11;

		res = res == 10 || res == 11 ? 0 : res;

		return res == raStr[raLength - 1];
	},
};

module.exports = isValid;
