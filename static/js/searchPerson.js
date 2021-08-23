// var personSearch;
var pathPersonSearch = '/searchPerson/personSearch/';
var pathPersonList = '/searchPerson/personList/';
var pathPersonDownload = '/searchPerson/download/';

async function requestGetAjax(_path, _id = '') {
	return new Promise((res, rej) => {
		const xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				res(xmlhttp.responseText);
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

		requestGetAjax(pathPersonSearch, inputSearchP).then(
			(_personSearchAA) => {
				let personSearch = JSON.parse(_personSearchAA);

				personSearch.forEach((value, index, array) => {
					ulSearchInnerHTML += value.li;
				});

				if (ulSearchInnerHTML.length > 0) {
					ulSearch.innerHTML = ulSearchInnerHTML;
					ulSearch.classList.remove('d-none');
				} else {
					ulSearch.classList.add('d-none');
				}
			}
		);
	} else {
		ulSearch.classList.add('d-none');
	}
}

function mountCard(name, numCerts) {
	let aux = '<div class="col-6 col-sm-5 col-md-4 col-lg-3 my-3">';
	aux +=
		'<a role="button" class="info-box mx-auto" data-bs-toggle="modal" data-bs-target="#modal';

	aux += name;

	aux += '"><img class="img-fluid info-border" src="./assets/images/years/';

	aux += name;

	aux +=
		'.png"><div class="info-caption info-border"><div class="info-nCert">N# Certificados</div>';
	aux += '<div class="info-nNum">';

	aux += numCerts;

	aux += '</div></div></a></div>';

	return aux;
}

function mountModal(modalTable, name, numCerts) {
	let aux = '<div class="modal fade" id="modal';
	aux += name;
	aux +=
		'" tabindex="-1"><div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">';
	aux +=
		'<div class="modal-content"><div class="modal-header"><h5 class="modal-title">';
	aux += name + '(' + numCerts + ')';
	aux +=
		'</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>';
	aux +=
		'<div class="modal-body"><div class="row align-items-center justify-content-center text-center">';
	aux += '<div class="col-12 col-lg-8 mb-3"><div class="input-group">';
	aux += '<input id="inputSearchE';
	aux +=
		name +
		'" type="text" class="form-control text-center" placeholder="Digite um Nome" onkeyup="eventSearch(this.value, \'';
	aux += name + '\')">';
	aux +=
		'<button class="btn btn-dark" type="button" onclick="clearInputSearchE(\'';
	aux += name + '\')">Limpar</button></div></div>';
	aux += '<div class="col-12">';
	aux +=
		'<table class="table table-light table-hover table-bordered text-center"><thead class="table-dark">';
	aux += '<tr><th scope="col" class="align-middle">';
	aux += '<div class="btn-group dropend">';
	aux += '<label class="btn btn-sm btn-outline-secondary" for="btnCheck';
	aux += name + '">';
	aux +=
		'<input type="checkbox" class="form-check-input" onchange="checkboxDownload(this.checked, \'';
	aux += name;
	aux += '\')" id="btnCheck';
	aux += name + '" autocomplete="off">';
	aux += '</label>';
	aux +=
		'<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"';
	aux += '<span class="visually-hidden"></span></button>';
	aux += '<ul class="dropdown-menu">';
	aux +=
		'<li><a role="button" class="dropdown-item" onclick="downloadFiles(\'select\', \'';
	aux += name;
	aux += '\')">Baixar Selecionados</a></li>';
	aux +=
		'<li><a role="button" class="dropdown-item" onclick="downloadFiles(\'all\', \'';
	aux += name;
	aux += '\')">Baixar Todos</a></li></ul></div>';
	aux += '</th><th scope="col" class="align-middle">Ano</th>';
	aux += '<th scope="col" class="align-middle">Nome</th></tr></thead><tbody>';
	aux += modalTable;
	aux += '</tbody></table></div></div></div></div></div></div>';

	return aux;
}

function setCheckboxIndeterminate(allTables) {
	allTables.forEach((year) => {
		document.getElementById('btnCheck' + year).indeterminate = true;
	});
}

function getPersonList(personId) {
	document.getElementById('ulSearch').classList.add('d-none');
	let divInfo = document.getElementById('divInfo');
	let infoAll = document.getElementById('infoAll');

	requestGetAjax(pathPersonList, personId).then((_personListAA) => {
		let _personList = JSON.parse(_personListAA);
		let certsList = _personList.certificates;

		let infoCardAll = '';
		let infoCardYear = '';
		let infoModalAll = '';
		let infoModalYear = '';
		let countCerts = 0;
		let allTables = [];

		for (const [year, certArray] of Object.entries(certsList)) {
			let countCertsYear = 0;
			let modalTable = '';

			certArray.forEach((certObj, index, array) => {
				modalTable += certObj.table;
				countCertsYear++;
			});

			infoModalAll += modalTable;
			infoCardAll = mountCard(year, countCertsYear) + infoCardAll;
			infoModalYear += mountModal(modalTable, year, countCertsYear);

			countCerts += countCertsYear;

			allTables.push(year);
		}

		if (countCerts > 0) {
			infoCardAll = mountCard('Todos', countCerts) + infoCardAll;
			infoModalAll =
				mountModal(infoModalAll, 'Todos', countCerts) + infoModalYear;
			divInfo.classList.remove('d-none');
			allTables.push('Todos');
		}

		infoAll.innerHTML = infoCardAll + infoModalAll;

		setCheckboxIndeterminate(allTables);

		document.getElementById('inputSearchP').value = _personList.name;
	});
}

function eventSearch(inputSearchE, _name) {
	let tagA = document
		.getElementById('modal' + _name)
		.getElementsByTagName('tbody')[0]
		.getElementsByTagName('a');

	inputSearchE = inputSearchE.toUpperCase();

	for (i = 0; i < tagA.length; i++) {
		if (tagA[i].innerHTML.toUpperCase().indexOf(inputSearchE) <= -1) {
			tagA[i].parentNode.parentNode.classList.add('d-none');
		} else {
			tagA[i].parentNode.parentNode.classList.remove('d-none');
		}
	}
}

function clearInputSearchE(_name) {
	document.getElementById('inputSearchE' + _name).value = '';
	eventSearch('', _name);
}

function checkboxDownload(isChecked, where) {
	let allChecks = document
		.getElementById('modal' + where)
		.getElementsByClassName('btnCheckRow');

	for (checkbox of allChecks) checkbox.checked = isChecked;
}

function downloadFiles(type, where) {
	let allChecks = document
		.getElementById('modal' + where)
		.getElementsByClassName('btnCheckRow');

	let arrayCodes = [];

	if (type == 'select') {
		for (checkbox of allChecks) {
			if (checkbox.checked) arrayCodes.push({ code: checkbox.id });
		}
	} else if (type == 'all') {
		for (checkbox of allChecks) arrayCodes.push({ code: checkbox.id });
	}

	$('#modal' + where).modal('hide');

	let modalLoading = document.getElementById('modalLoading');
	modalLoading.classList.add('show', 'd-block');

	requestGetAjax(pathPersonDownload, JSON.stringify(arrayCodes)).then(
		(respDown) => {
			window.location = '/download/' + respDown;
			modalLoading.classList.remove('show', 'd-block');
		}
	);
}
