var pathGroupList = '/groupList';
var pathOcultCert = '/ocultCert';
var pathShowCert = '/showCert';
var pathPrepareToEditCert = '/prepareToEditCert/';
var pathPrepareToInsertCert = '/prepareToInsertCert/';
var pathEditCert = '/editCert';
var pathInsertCert = '/insertCert';
var pathDeleteCert = '/deleteCert';
var pathCertsDownload = '/myCerts/download/';

var oneCourse;
var oneCert;

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

async function requestPostAjax(
	_path,
	dataToSend,
	contentType = 'application/x-www-form-urlencoded'
) {
	return new Promise((res, rej) => {
		const xmlhttp = new XMLHttpRequest();

		xmlhttp.onload = () => {
			res(JSON.parse(xmlhttp.responseText));
		};

		xmlhttp.open('POST', _path, true);
		xmlhttp.setRequestHeader('Content-type', contentType);
		xmlhttp.send(dataToSend);
	});
}

requestGetAjax(pathGroupList).then((accordionAll) => {
	document.getElementById('accordionLoading').classList.add('d-none');
	document.getElementById('accordionPanels').classList.remove('d-none');
	document.getElementById('accordionPanels').innerHTML = accordionAll[0];

	oneCourse = accordionAll[1];

	var tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});

	setCheckboxIndeterminate();
});

function mountTableAccordion(oneCert, ocult) {
	let auxStrTable = '<tr id="';
	auxStrTable += oneCert.code;
	auxStrTable += '">';

	auxStrTable += '<td class="groupCert d-none">' + oneCert.group + '</td>';

	let auxOcultIcon1 = 'show';
	let auxOcultIcon2 = '';
	let auxOcultIcon3 = 'Mostrar';

	if (!ocult) {
		auxStrTable +=
			'<td><input class="form-check-input" type="checkbox" id="';
		auxStrTable += oneCert.code;
		auxStrTable += '"></td>';
		auxOcultIcon1 = 'ocult';
		auxOcultIcon2 = '-slash';
		auxOcultIcon3 = 'Ocultar';
	}

	let auxDeleteIcon = '';
	let auxColSpan = '';

	if (oneCert.delete && ocult) {
		auxDeleteIcon += '<td><a role="button" onclick="deleteCert(\'';
		auxDeleteIcon += oneCert.code;
		auxDeleteIcon +=
			'\')" class="link-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Excluir"><i class="fas fa-trash-alt"></i></a></td>';
	} else {
		auxStrTable += '';
		auxColSpan = ' colspan=2';
	}

	auxStrTable += '<td>';

	auxStrTable += '<a role="button" onclick="prepareToEditCert(\'';
	auxStrTable += oneCert.code;
	auxStrTable += '\')" class="nameCert link-dark text-decoration-none">';
	auxStrTable += oneCert.eventName;
	auxStrTable += '</a>';

	auxStrTable += '<a role="button" onclick="prepareToEditCert(\'';
	auxStrTable += oneCert.code;
	auxStrTable +=
		'\')" class="typeCert d-none link-dark text-decoration-none">';

	let textActivity = 'na';

	for (group of oneCourse.groups) {
		if (group.groupId == oneCert.group) {
			for (activityG of group.activities) {
				if (activityG.someId == oneCert.activity)
					textActivity = activityG.name;
			}
		}
	}

	auxStrTable += textActivity;

	auxStrTable += '</a>';

	auxStrTable += '</td>';

	auxStrTable += '<td>';
	auxStrTable += oneCert.value;
	auxStrTable += '</td>';
	auxStrTable += auxDeleteIcon;

	auxStrTable += '<td';
	auxStrTable += auxColSpan;
	auxStrTable += '><a role="button" onclick="';
	auxStrTable += auxOcultIcon1;
	auxStrTable += "Cert('";
	auxStrTable += oneCert.code;
	auxStrTable +=
		'\')" class="link-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="';
	auxStrTable += auxOcultIcon3;
	auxStrTable += '"><i class="fas fa-eye';
	auxStrTable += auxOcultIcon2;
	auxStrTable += '"></i></a></td></tr>';

	return auxStrTable;
}

function showCert(certCode) {
	let trCert = document.getElementById(certCode);
	let groupCert = trCert.getElementsByClassName('groupCert')[0].innerHTML;

	if (groupCert == 'na') {
		document.getElementById('modalInfoTitle').innerHTML =
			'Uma coisinha antes';
		document.getElementById('modalInfoLabel').innerHTML =
			'Primeiro adicione este certificado em um grupo';
		$('#modalInfo').modal('show');
	} else {
		trCert.remove();

		let dataToSend = '';

		dataToSend += 'certCode=';
		dataToSend += certCode;

		requestPostAjax(pathShowCert, dataToSend)
			.then((oneCert) => {
				let tbody = document.getElementById(
					'tbodyG' + oneCert.group[1]
				);

				let tbodyNew =
					tbody.innerHTML + mountTableAccordion(oneCert, false);
				tbody.innerHTML = tbodyNew;
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

function ocultCert(certCode) {
	let trCert = document.getElementById(certCode);

	trCert.remove();

	let dataToSend = '';

	dataToSend += 'certCode=';
	dataToSend += certCode;

	requestPostAjax(pathOcultCert, dataToSend)
		.then((oneCert) => {
			let tbody = document.getElementById('tbodyGNA');

			let tbodyNew = tbody.innerHTML + mountTableAccordion(oneCert, true);
			tbody.innerHTML = tbodyNew;
		})
		.catch((err) => {
			console.log(err);
		});
}

function selectGroupChange(valueSelected, where) {
	let selectActivity = document.getElementById(where + 'SelectActivity');

	selectActivity.innerHTML = '<option selected>[Selecione]</option>';

	oneCourse.groups.forEach((oneGroup) => {
		if (oneGroup.groupId == valueSelected) {
			oneGroup.activities.forEach((oneActivity) => {
				var option = document.createElement('option');
				option.text = oneActivity.name;
				option.value = oneActivity.someId;
				selectActivity.add(option);
			});
		}
	});
}

function selectActivityChange(valueSelected, where) {
	let selectGroup = document.getElementById(where + 'SelectGroup');
	let linkValue = document.getElementById(where + 'LinkValue');

	if (valueSelected != '[Selecione]') {
		oneCourse.groups.forEach((oneGroup) => {
			if (oneGroup.groupId == selectGroup.value) {
				oneGroup.activities.forEach((oneActivity) => {
					if (oneActivity.someId == valueSelected) {
						let myPopContent =
							'Normalmente certificados relacionados a este Grupo e a esta Atividade têm um valor de ';
						myPopContent += oneActivity.value;
						myPopContent += ' pontos por ';
						myPopContent += oneActivity.valueBy + '.';

						linkValue.setAttribute('data-bs-content', myPopContent);
					}
				});
			}
		});
	}
}

function prepareToEditCert(certCode) {
	requestGetAjax(pathPrepareToEditCert, certCode)
		.then((resData) => {
			oneCert = resData[0];
			oneCourse = resData[1];

			let editDivFile = document.getElementById('editDivFile');
			let editDivLink = document.getElementById('editDivLink');
			let editInputLink = document.getElementById('editInputLink');

			let editInputCode = document.getElementById('editInputCode');
			let editInputEvent = document.getElementById('editInputEvent');
			let editSelectGroup = document.getElementById('editSelectGroup');
			let editSelectActivity =
				document.getElementById('editSelectActivity');
			let editInputValue = document.getElementById('editInputValue');
			let editInputYear = document.getElementById('editInputYear');

			let editDivSlider = document.getElementById('editDivSlider');

			if (oneCert.delete) {
				editDivFile.classList.add('d-none');
				editDivLink.classList.add('d-none');

				editDivSlider.classList.remove('d-none');
			} else {
				editDivFile.classList.add('d-none');
				editDivLink.classList.remove('d-none');
				editInputLink.value =
					'http://apl.utfpr.edu.br/extensao/certificados/validar/' +
					oneCert.code;

				editDivSlider.classList.add('d-none');
			}

			if (oneCert.group == 'na') editSelectGroup.value = '[Selecione]';
			else editSelectGroup.value = oneCert.group;

			if (oneCert.activity == 'na') {
				editSelectActivity.value = '[Selecione]';
			} else {
				selectGroupChange(oneCert.group, 'edit');

				editSelectActivity.value = oneCert.activity;

				selectActivityChange(oneCert.activity, 'edit');
			}

			editInputCode.value = oneCert.code;
			editInputEvent.value = oneCert.eventName;
			editInputValue.value = oneCert.value;
			editInputYear.value = oneCert.year;

			$('#modalEdit').modal('show');
		})
		.catch((err) => {
			console.log(err);
		});
}

function sliderFile(isChecked) {
	if (isChecked) {
		document.getElementById('editDivFile').classList.remove('d-none');
		document
			.getElementById('editInputFile')
			.setAttribute('name', 'newFile');
	} else {
		document.getElementById('editDivFile').classList.add('d-none');
		document.getElementById('editInputFile').setAttribute('name', '');
	}
}

function sendCert(where) {
	insertForm;
	insertInputEvent;
	let inputEvent = document.getElementById(where + 'InputEvent');
	let labelEvent = document.getElementById(where + 'LabelEvent');

	if (inputEvent.value.length <= 5) {
		inputEvent.classList.add('is-invalid');
		labelEvent.innerHTML = 'Nome muito curto *';
	} else {
		inputEvent.classList.remove('is-invalid');
		labelEvent.innerHTML = 'Nome do Evento *';
		document.getElementById(where + 'Form').submit();
	}
}

function prepareToInsertCert() {
	requestGetAjax(pathPrepareToInsertCert)
		.then((resData) => {
			oneCourse = resData;

			document.getElementById('insertInputFile').value = '';

			document.getElementById('insertInputEvent').value = '';
			document.getElementById('insertSelectGroup').value = '[Selecione]';
			document.getElementById('insertSelectActivity').value =
				'[Selecione]';
			document.getElementById('insertInputValue').value = '';
			document.getElementById('insertInputYear').value = '';

			$('#modalInsert').modal('show');
		})
		.catch((err) => {
			console.log(err);
		});
}

function nameTypeCert(isChecked) {
	let labelNameType = document.getElementById('labelNameType');

	let allTypeCert = document.getElementsByClassName('typeCert');
	let allNameCert = document.getElementsByClassName('nameCert');

	if (isChecked) {
		labelNameType.innerHTML = 'Mostrar Nome';
		for (element of allTypeCert) element.classList.remove('d-none');
		for (element of allNameCert) element.classList.add('d-none');
	} else {
		labelNameType.innerHTML = 'Mostrar Tipo';
		for (element of allTypeCert) element.classList.add('d-none');
		for (element of allNameCert) element.classList.remove('d-none');
	}
}

function deleteCert(certCode) {
	console.log('delete');

	requestGetAjax(pathDeleteCert, certCode)
		.then((resData) => {
			if (resData.message == 'Ok')
				document.getElementById(certCode).remove();
			else console.log('err');
		})
		.catch((err) => {
			console.log(err);
		});
}

function checkboxDownload(isChecked, where) {
	let allChecks = document
		.getElementById('accordionCollapse' + where)
		.getElementsByTagName('INPUT');

	for (checkbox of allChecks) checkbox.checked = isChecked;

	console.log(allChecks);
}

function downloadFiles(type) {
	let allChecks = {
		g1: document
			.getElementById('accordionCollapseG1')
			.getElementsByTagName('INPUT'),
		g2: document
			.getElementById('accordionCollapseG2')
			.getElementsByTagName('INPUT'),
		g3: document
			.getElementById('accordionCollapseG3')
			.getElementsByTagName('INPUT'),
	};

	let arrayCodes = {
		g1: [],
		g2: [],
		g3: [],
	};

	for (const [key, value] of Object.entries(allChecks)) {
		if (type == 'select') {
			for (checkbox of value) {
				if (checkbox.checked)
					arrayCodes[key].push({ code: checkbox.id });
			}
		} else if (type == 'all') {
			for (checkbox of value) arrayCodes[key].push({ code: checkbox.id });
		}
	}

	let modalLoading = document.getElementById('modalLoading');
	modalLoading.classList.add('show', 'd-block');

	requestGetAjax(pathCertsDownload, JSON.stringify(arrayCodes)).then(
		(respDown) => {
			window.location = '/download/' + respDown.userId;
			modalLoading.classList.remove('show', 'd-block');
		}
	);
}

function setCheckboxIndeterminate() {
	document.getElementById('checkboxG1').indeterminate = true;
	document.getElementById('checkboxG2').indeterminate = true;
	document.getElementById('checkboxG3').indeterminate = true;
}
