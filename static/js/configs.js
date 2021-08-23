const pathUpProfile = '/configs/upProfile';
const pathUpNotif = '/configs/upNotif';
const pathUpSeg = '/configs/upSeg';

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

function setOptionPeriod(selectPeriod, number) {
	for (let i = 1; i < 1 + number; i++) {
		var option = document.createElement('option');
		option.text = i + 'º';
		option.value = i;
		selectPeriod.add(option);
	}
}

function selectChanged(valueThis) {
	let selectPeriod = document.getElementById('floatingSelectPeriod');

	if (valueThis == '[Selecione]') {
		setOptionPeriod(selectPeriod, 0);
	} else if (valueThis == 'ADS') {
		setOptionPeriod(selectPeriod, 6);
	} else if (['ESW', 'LMT'].includes(valueThis)) {
		setOptionPeriod(selectPeriod, 8);
	} else if (['ECP', 'ECA', 'ELE', 'ELT', 'EMC'].includes(valueThis)) {
		setOptionPeriod(selectPeriod, 10);
	}
}

function editProfile() {
	if (document.getElementById('sliderEdit').checked) {
		document.getElementById('floatingInputPassword').disabled = false;
	} else {
		document.getElementById('floatingInputPassword').disabled = true;
	}
}

function passwordIsValid(password) {
	let labelPassword = document.getElementById('labelPassword');
	let inputPassword = document.getElementById('floatingInputPassword');
	let errThis = 0;

	if (!document.getElementById('sliderEdit').checked) {
		labelPassword.innerHTML = 'Senha';
	} else if (/\s/g.test(password)) {
		labelPassword.innerHTML = 'Senha contém espaço';
		errThis++;
	} else if (password.length < 8) {
		labelPassword.innerHTML = 'Senha muito curta';
		errThis++;
	} else if (password.length > 16) {
		labelPassword.innerHTML = 'Senha muito longa';
		errThis++;
	} else labelPassword.innerHTML = 'Senha';

	if (errThis > 0) {
		inputPassword.classList.add('is-invalid');
		return false;
	} else {
		inputPassword.classList.remove('is-invalid');
		return true;
	}
}

function usernameIsValid(username) {
	let labelUsername = document.getElementById('labelUsername');
	let inputUsername = document.getElementById('floatingInputUsername');
	let errThis = 0;

	if (/\s/g.test(username)) {
		labelUsername.innerHTML = 'Username contém espaço';
		errThis++;
	} else if (username.length < 8) {
		labelUsername.innerHTML = 'Username muito curto';
		errThis++;
	} else if (username.length > 16) {
		labelUsername.innerHTML = 'Username muito longo';
		errThis++;
	} else labelUsername.innerHTML = 'Username';

	if (errThis > 0) {
		inputUsername.classList.add('is-invalid');
		return false;
	} else {
		inputUsername.classList.remove('is-invalid');
		return true;
	}
}

function raIsValid(raStr) {
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
}

function upProfile() {
	console.log('upProfile');

	let resUp = document.getElementById('resUpProfile');
	let inputRA = document.getElementById('floatingInputRA');

	if (!raIsValid(inputRA.value) && inputRA.value.length > 0) {
		document.getElementById('floatingInputRA').classList.add('is-invalid');
		document.getElementById('labelRA').innerHTML = 'RA inválido';
		resUp.innerHTML =
			'Algo deu errado, verifique as informações e tente novamente mais tarde';
		resUp.classList.add('text-danger');
		resUp.classList.remove('text-success', 'd-none');
	} else if (
		document.getElementById('floatingSelectPeriod').value == '[Selecione]'
	) {
		document
			.getElementById('floatingSelectPeriod')
			.classList.add('is-invalid');
		document.getElementById('floatingLabelPeriod').innerHTML =
			'Período inválido';

		resUp.innerHTML =
			'Algo deu errado, verifique as informações e tente novamente mais tarde';
		resUp.classList.add('text-danger');
		resUp.classList.remove('text-success', 'd-none');
	} else {
		document
			.getElementById('floatingInputRA')
			.classList.remove('is-invalid');
		document.getElementById('labelRA').innerHTML = 'RA';

		let dataToSend = '';

		dataToSend += 'fname=';
		dataToSend += document.getElementById('floatingInputFName').value;
		dataToSend += '&lname=';
		dataToSend += document.getElementById('floatingInputLName').value;
		dataToSend += '&ra=';
		dataToSend += document.getElementById('floatingInputRA').value;
		dataToSend += '&period=';
		dataToSend += document.getElementById('floatingSelectPeriod').value;

		requestPostAjax(pathUpProfile, dataToSend)
			.then((resData) => {
				if (resData.message == 'Ok') {
					resUp.innerHTML = 'Salvo com sucesso';
					resUp.classList.add('text-success');
					resUp.classList.remove('text-danger', 'd-none');
				} else {
					resUp.innerHTML =
						'Algo deu errado, verifique as informações e tente novamente mais tarde';
					resUp.classList.add('text-danger');
					resUp.classList.remove('text-success', 'd-none');
				}
			})
			.catch((err) => {
				resUp.innerHTML =
					'Algo deu errado, verifique as informações e tente novamente mais tarde';
				resUp.classList.add('text-danger');
				resUp.classList.remove('text-success', 'd-none');
			});
	}
}

function upNotif() {
	console.log('upNotif');

	let dataToSend = '';

	dataToSend += 'recomend=';
	dataToSend += document.getElementById('sliderRecomend').checked;
	dataToSend += '&certs=';
	dataToSend += document.getElementById('sliderCerts').checked;
	dataToSend += '&func=';
	dataToSend += document.getElementById('sliderFunc').checked;

	let resUp = document.getElementById('resUpNotif');

	requestPostAjax(pathUpNotif, dataToSend)
		.then((resData) => {
			if (resData.message == 'Ok') {
				resUp.innerHTML = 'Salvo com sucesso';
				resUp.classList.add('text-success');
				resUp.classList.remove('text-danger', 'd-none');
			} else {
				resUp.innerHTML =
					'Algo deu errado, verifique as informações e tente novamente mais tarde';
				resUp.classList.add('text-danger');
				resUp.classList.remove('text-success', 'd-none');
			}
		})
		.catch((err) => {
			resUp.innerHTML =
				'Algo deu errado, verifique as informações e tente novamente mais tarde';
			resUp.classList.add('text-danger');
			resUp.classList.remove('text-success', 'd-none');
		});
}

function upSeg() {
	console.log('upSeg');

	let username = document.getElementById('floatingInputUsername').value;
	let password = document.getElementById('floatingInputPassword').value;

	let passwordStr = '';

	if (document.getElementById('sliderEdit').checked) {
		passwordStr += '&password=';
		passwordStr += password;
	}

	let resUp = document.getElementById('resUpSeg');

	if (usernameIsValid(username) && passwordIsValid(password)) {
		let dataToSend = '';

		dataToSend += 'username=';
		dataToSend += username;
		dataToSend += passwordStr;

		requestPostAjax(pathUpSeg, dataToSend)
			.then((resData) => {
				if (resData.message == 'Ok') {
					resUp.innerHTML = 'Salvo com sucesso';
					resUp.classList.add('text-success');
					resUp.classList.remove('text-danger', 'd-none');
				} else {
					resUp.innerHTML =
						'Algo deu errado, verifique as informações e tente novamente mais tarde';
					resUp.classList.add('text-danger');
					resUp.classList.remove('text-success', 'd-none');
				}
			})
			.catch((err) => {
				resUp.innerHTML =
					'Algo deu errado, verifique as informações e tente novamente mais tarde';
				resUp.classList.add('text-danger');
				resUp.classList.remove('text-success', 'd-none');
			});
	} else {
		resUp.innerHTML =
			'Algo deu errado, verifique as informações e tente novamente mais tarde';
		resUp.classList.add('text-danger');
		resUp.classList.remove('text-success', 'd-none');
	}
}

selectChanged(document.getElementById('floatingSpanCourse').innerHTML);

document.getElementById('floatingSelectPeriod').value =
	document.getElementById('floatingSpanPeriod').innerHTML;
document.getElementById('floatingSelectCampus').value =
	document.getElementById('floatingSpanCampus').innerHTML;
document.getElementById('floatingSelectCourse').value =
	document.getElementById('floatingSpanCourse').innerHTML;

document.getElementById('buttonEye').addEventListener('mousedown', () => {
	document.getElementById('floatingInputPassword').type = 'text';
	document.getElementById('iconEye').classList.remove('fa-eye-slash');
	document.getElementById('iconEye').classList.add('fa-eye');
});

document.getElementById('buttonEye').addEventListener('mouseup', () => {
	document.getElementById('floatingInputPassword').type = 'password';
	document.getElementById('iconEye').classList.remove('fa-eye');
	document.getElementById('iconEye').classList.add('fa-eye-slash');
});

// Para que o password não fique exposto apos mover a imagem.
document.getElementById('buttonEye').addEventListener('mousemove', () => {
	document.getElementById('floatingInputPassword').type = 'password';
	document.getElementById('iconEye').classList.remove('fa-eye');
	document.getElementById('iconEye').classList.add('fa-eye-slash');
});
