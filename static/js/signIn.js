var pathSignIn = '/signIn';
var pathSendEmail = '/sendEmail/';

async function requestPostAjax(_path, dataToSend) {
	return new Promise((res, rej) => {
		const xmlhttp = new XMLHttpRequest();

		xmlhttp.onload = () => {
			res(xmlhttp.responseText);
		};

		xmlhttp.open('POST', _path, true);
		xmlhttp.setRequestHeader(
			'Content-type',
			'application/x-www-form-urlencoded'
		);
		xmlhttp.send(dataToSend);
	});
}

async function requestGetAjax(_path, _id = '') {
	return new Promise((res, rej) => {
		const xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				res(JSON.parse(xmlhttp.responseText));
			}
		};

		xmlhttp.open('GET', _path + _id, true);
		xmlhttp.send();
	});
}

function submitButton() {
	const inputEmail = document.getElementById('floatingEmail');
	const inputPassword = document.getElementById('floatingPassword');
	let labelEmail = document.getElementById('labelEmail');
	let labelPassword = document.getElementById('labelPassword');

	if (inputEmail.value.length > 0 && inputPassword.value.length > 0) {
		let dataToSend =
			inputEmail.name +
			'=' +
			inputEmail.value +
			'&' +
			inputPassword.name +
			'=' +
			inputPassword.value;

		requestPostAjax(pathSignIn, dataToSend)
			.then((resData) => {})
			.catch((err) => {
				console.log(err);
			});
	}
}

function resetPassword() {
	let inputEmail = document.getElementById('floatingInputEmail');
	let labelEmail = document.getElementById('floatingLabelEmail');
	let modalLoading = document.getElementById('modalLoading');

	if (emailIsValid(inputEmail.value)) {
		modalLoading.classList.add('show', 'd-block');

		requestGetAjax(pathSendEmail, inputEmail.value)
			.then((resData) => {
				modalLoading.classList.remove('show', 'd-block');
				if (resData.type == 'err') {
					inputEmail.classList.add('is-invalid');
					labelEmail.innerHTML = value.message;
				} else if (resData.type == 'success') {
					$('#modalSuccessReset').modal('show');
				}
			})
			.catch((err) => {
				modalLoading.classList.remove('show', 'd-block');
				$('#modalFailReset').modal('show');
			});
	}
}

function textIsValid(where, inputValue) {
	const inputThis = document.getElementById('floatingInput' + where);
	let errThis = 0;

	if (where == 'Email') {
		if (!emailIsValid(inputValue)) errThis++;
	} else if (where == 'Password') {
		if (!passwordIsValid(inputValue)) errThis++;
	}
	if (errThis > 0) inputThis.classList.add('is-invalid');
	else inputThis.classList.remove('is-invalid');
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
