var pathPostReset = '/resetPassword';

async function requestPostAjax(_path, dataToSend) {
	return new Promise((res, rej) => {
		const xmlhttp = new XMLHttpRequest();

		xmlhttp.onload = () => {
			res(JSON.parse(xmlhttp.responseText));
		};

		xmlhttp.open('POST', _path, true);
		xmlhttp.setRequestHeader(
			'Content-type',
			'application/x-www-form-urlencoded'
		);
		xmlhttp.send(dataToSend);
	});
}

function submitButton() {
	const spanEmailHash = document.getElementById('spanEmailHash');

	const inputEmail = document.getElementById('floatingInputEmail');
	const inputPassword1 = document.getElementById('floatingInputPassword1');
	const inputPassword2 = document.getElementById('floatingInputPassword2');

	let labelEmail = document.getElementById('labelEmail');
	let labelPassword1 = document.getElementById('labelPassword1');
	let labelPassword2 = document.getElementById('labelPassword2');

	if (
		emailIsValid(inputEmail.value) &&
		passwordIsValid(inputPassword1.value, 'Password1') &&
		passwordIsValid(inputPassword2.value, 'Password2') &&
		spanEmailHash.innerHTML.length > 0
	) {
		if (inputPassword1.value != inputPassword2.value) {
			labelPassword1.classList.add('is-invalid');
			labelPassword1.innerHTML = 'Senhas diferentes';
			labelPassword2.classList.add('is-invalid');
			labelPassword2.innerHTML = 'Senhas diferentes';
		} else {
			let dataToSend =
				'emailHash=' +
				spanEmailHash.innerHTML +
				'&email=' +
				inputEmail.value +
				'&password=' +
				inputPassword1.value;
			requestPostAjax(pathPostReset, dataToSend)
				.then((resData) => {
					if (resData.type == 'err') {
						resData.content.forEach((value) => {
							if (value.type == 'email') {
								inputEmail.classList.add('is-invalid');
								labelEmail.innerHTML = value.message;
							} else if (value.type == 'password') {
								inputPassword1.classList.add('is-invalid');
								labelPassword1.innerHTML = value.message;
							} else {
								$('#modalFailReset').modal('show');
							}
						});
					} else if (resData.type == 'success') {
						$('#modalSuccessReset').modal('show');
					}
				})
				.catch((err) => {
					$('#modalFailReset').modal('show');
				});
		}
	}
}

function textIsValid(where, inputValue) {
	const inputThis = document.getElementById('floatingInput' + where);

	if (!passwordIsValid(inputValue, where)) {
		inputThis.classList.add('is-invalid');
	} else inputThis.classList.remove('is-invalid');
}

function emailIsValid(email) {
	let labelEmail = document.getElementById('labelEmail');

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		labelEmail.innerHTML = 'E-mail inválido';
		return false;
	}

	labelEmail.innerHTML = 'E-mail';
	return true;
}

function passwordIsValid(password, where) {
	let labelPassword = document.getElementById('label' + where);

	if (password.length < 8) {
		labelPassword.innerHTML = 'Senha muito curta';
		return false;
	} else if (password.length > 16) {
		labelPassword.innerHTML = 'Senha muito longa';
		return false;
	}

	if (where == 'Password2') {
		if (
			password == document.getElementById('floatingInputPassword1').value
		) {
			labelPassword.innerHTML = 'Digite Novamente';
			return true;
		}
		labelPassword.innerHTML = 'Senhas diferentes';
		return false;
	}

	labelPassword.innerHTML = 'Nova Senha';
	return true;
}

document.getElementById('buttonEye1').addEventListener('mousedown', () => {
	document.getElementById('floatingInputPassword1').type = 'text';
	document.getElementById('iconEye1').classList.remove('fa-eye-slash');
	document.getElementById('iconEye1').classList.add('fa-eye');
});

document.getElementById('buttonEye1').addEventListener('mouseup', () => {
	document.getElementById('floatingInputPassword1').type = 'password';
	document.getElementById('iconEye1').classList.remove('fa-eye');
	document.getElementById('iconEye1').classList.add('fa-eye-slash');
});

// Para que o password não fique exposto apos mover a imagem.
document.getElementById('buttonEye1').addEventListener('mousemove', () => {
	document.getElementById('floatingInputPassword1').type = 'password';
	document.getElementById('iconEye1').classList.remove('fa-eye');
	document.getElementById('iconEye1').classList.add('fa-eye-slash');
});

document.getElementById('buttonEye2').addEventListener('mousedown', () => {
	document.getElementById('floatingInputPassword2').type = 'text';
	document.getElementById('iconEye2').classList.remove('fa-eye-slash');
	document.getElementById('iconEye2').classList.add('fa-eye');
});

document.getElementById('buttonEye2').addEventListener('mouseup', () => {
	document.getElementById('floatingInputPassword2').type = 'password';
	document.getElementById('iconEye2').classList.remove('fa-eye');
	document.getElementById('iconEye2').classList.add('fa-eye-slash');
});

// Para que o password não fique exposto apos mover a imagem.
document.getElementById('buttonEye2').addEventListener('mousemove', () => {
	document.getElementById('floatingInputPassword2').type = 'password';
	document.getElementById('iconEye2').classList.remove('fa-eye');
	document.getElementById('iconEye2').classList.add('fa-eye-slash');
});
