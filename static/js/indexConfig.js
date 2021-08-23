var personSearch;
var personData;
var pathPersonSearch = '/searchPerson/personSearch/';
var pathPersonList = '/searchPerson/personListSimple/';
var pathSavePerson = '/saveName/';

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

function getPersonSearch(inputSearchP) {
	let ulSearch = document.getElementById('ulSearch');

	if (inputSearchP.length >= 5) {
		let ulSearchInnerHTML = '';

		requestGetAjax(pathPersonSearch, inputSearchP).then((personSearch) => {
			personSearch.forEach((value, index, array) => {
				ulSearchInnerHTML += value.li;
			});

			if (ulSearchInnerHTML.length > 0) {
				ulSearch.innerHTML = ulSearchInnerHTML;
				ulSearch.classList.remove('d-none');
			} else {
				ulSearch.classList.add('d-none');
			}
		});
	} else {
		ulSearch.classList.add('d-none');
	}
}

function getPersonList(personId) {
	document.getElementById('ulSearch').classList.add('d-none');
	let divInfo = document.getElementById('divInfo');
	let infoAll = document.getElementById('infoAll');

	requestGetAjax(pathPersonList, personId).then((_onePerson) => {
		let infoConfirm =
			'<div class="col-sm-7 col-lg-5 col-11 my-1"><h6>Se estes certificados são seus, confirme no botão abaixo, caso contrário, faça uma nova pesquisa</h6>';
		infoConfirm +=
			'</div><div class="w-100"></div><div class="col-12 mt-1 mb-3"><button class="btn btn-dark" onclick="saveName()">Confirmar</button>';
		infoConfirm += '</div><div class="w-100"></div>';

		personData = _onePerson[0];

		infoAll.innerHTML = infoConfirm + _onePerson[1];

		divInfo.classList.remove('d-none');

		document.getElementById('inputSearchP').value = _onePerson[0].name;
	});
}

function saveName(where = null) {
	if (!where) {
		document.getElementById('floatingInputName').value = personData.name;
		$('#modalConfirm').modal('show');
	} else {
		let selectCourse = document.getElementById('floatingSelectCourse');
		let selectPeriod = document.getElementById('floatingSelectPeriod');

		if (
			selectCourse.value != '[Selecione]' &&
			selectPeriod.value != '[Selecione]'
		) {
			requestGetAjax(
				pathSavePerson,
				personData._id +
					'/' +
					selectCourse.value +
					'/' +
					selectPeriod.value
			).then((resp) => {
				location.reload();
			});
		} else {
			if (selectCourse.value == '[Selecione]')
				selectCourse.classList.add('is-invalid');
			else selectCourse.classList.remove('is-invalid');

			if (selectPeriod.value == '[Selecione]')
				selectPeriod.classList.add('is-invalid');
			else selectPeriod.classList.remove('is-invalid');
		}
	}
}

function setOrRemove(selectPeriod, length, number) {
	if (number > 0) {
		for (let i = length; i < length + number; i++) {
			var option = document.createElement('option');
			option.text = i + 'º';
			option.value = i;
			selectPeriod.add(option);
		}
	} else {
		for (let i = length; i > length + number; i--) {
			selectPeriod.remove(i - 1);
		}
	}
}

function selectChanged(valueThis) {
	let selectPeriod = document.getElementById('floatingSelectPeriod');

	let lengthSelectPeriod = selectPeriod.length;

	if (lengthSelectPeriod == 1) {
		for (let i = 0; i < 6; i++) {
			var option = document.createElement('option');
			option.text = i + 1 + 'º';
			option.value = i + 1;
			selectPeriod.add(option);
		}
	}

	selectPeriod = document.getElementById('floatingSelectPeriod');

	lengthSelectPeriod = selectPeriod.length;

	if (valueThis == '[Selecione]') {
		setOrRemove(selectPeriod, lengthSelectPeriod, 1 - lengthSelectPeriod);
	} else if (valueThis == 'ADS') {
		setOrRemove(selectPeriod, lengthSelectPeriod, 7 - lengthSelectPeriod);
	} else if (['ESW', 'LMT'].includes(valueThis)) {
		setOrRemove(selectPeriod, lengthSelectPeriod, 9 - lengthSelectPeriod);
	} else if (['ECP', 'ECA', 'ELE', 'ELT', 'EMC'].includes(valueThis)) {
		setOrRemove(selectPeriod, lengthSelectPeriod, 11 - lengthSelectPeriod);
	}
}
