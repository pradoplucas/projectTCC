var eventSearch;
var pathEventSearch = '/searchEvent/eventSearch/';
var pathEventList = '/searchEvent/eventList/';
var pathPersonDownload = '/searchEvent/download/';

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

function getEventSearch(inputSearchE) {
	let ulSearch = document.getElementById('ulSearch');

	if (isSelectedValid()) {
		if (inputSearchE.length >= 3) {
			let ulSearchInnerHTML = '';

			eventSearch.forEach((value, index, array) => {
				if (
					value.eventName
						.toUpperCase()
						.indexOf(inputSearchE.toUpperCase()) > -1
				) {
					ulSearchInnerHTML +=
						'<li><a href="javascript:getEventList(\'' +
						value._id.toString() +
						'\');">' +
						value.eventName +
						'</a></li>';
				}
			});

			if (ulSearchInnerHTML.length > 0) {
				ulSearch.innerHTML = ulSearchInnerHTML;
				ulSearch.classList.remove('d-none');
			} else ulSearch.classList.add('d-none');
		} else {
			ulSearch.classList.add('d-none');
		}
	} else {
		document.getElementById('selectYear').classList.add('border-red');
		ulSearch.classList.add('d-none');
	}
}

function getEventList(eventId) {
	document.getElementById('ulSearch').classList.add('d-none');

	requestGetAjax(pathEventList, eventId).then((_eventListStr) => {
		let _eventList = JSON.parse(_eventListStr);
		let certs = _eventList.certificates;
		let certsInnerHTML = '';

		certs.forEach((value, index, array) => {
			certsInnerHTML +=
				'<tr><td><input class="form-check-input btnCheckRow" type="checkbox" value="" id="';
			certsInnerHTML += value.code + '"></td><td>';
			certsInnerHTML += _eventList.year;
			certsInnerHTML +=
				'</td><td><a href="http://apl.utfpr.edu.br/extensao/certificados/validar/' +
				value.code;
			certsInnerHTML +=
				'" target="_blank" class="link-dark text-decoration-none">' +
				value.owner +
				'</a></td></tr>';
		});

		document.getElementById('tbodyTable').innerHTML = certsInnerHTML;
		document.getElementById('divTable').classList.remove('d-none');
		document.getElementById('inputSearchE').value = _eventList.eventName;

		document.getElementById('btnCheck').indeterminate = true;
	});
}

function personSearch(inputSearchP) {
	const tagA = document
		.getElementById('tbodyTable')
		.getElementsByTagName('a');

	inputSearchP = inputSearchP.toUpperCase();

	for (i = 0; i < tagA.length; i++) {
		if (tagA[i].innerHTML.toUpperCase().indexOf(inputSearchP) <= -1) {
			tagA[i].parentNode.parentNode.classList.add('d-none');
		} else {
			tagA[i].parentNode.parentNode.classList.remove('d-none');
		}
	}
}

function clearInputSearchP() {
	document.getElementById('inputSearchP').value = '';
	personSearch('');
}

function isSelectedValid() {
	return document.getElementById('selectYear').value != 'Ano';
}

function selectChanged() {
	let ulSearch = document.getElementById('ulSearch');
	let selectYear = document.getElementById('selectYear');

	if (isSelectedValid()) {
		selectYear.classList.remove('border-red');
		document.getElementById('divTable').classList.add('d-none');
		requestGetAjax(pathEventSearch, selectYear.value).then(
			(_eventSearchStr) => (eventSearch = JSON.parse(_eventSearchStr))
		);
	} else {
		selectYear.classList.add('border-red');
	}
}

function checkboxDownload(isChecked) {
	let allChecks = document
		.getElementById('tbodyTable')
		.getElementsByClassName('btnCheckRow');

	for (checkbox of allChecks) checkbox.checked = isChecked;
}

function downloadFiles(type) {
	let allChecks = document
		.getElementById('tbodyTable')
		.getElementsByClassName('btnCheckRow');

	let arrayCodes = [];

	if (type == 'select') {
		for (checkbox of allChecks) {
			if (checkbox.checked) arrayCodes.push({ code: checkbox.id });
		}
	} else if (type == 'all') {
		for (checkbox of allChecks) arrayCodes.push({ code: checkbox.id });
	}

	let modalLoading = document.getElementById('modalLoading');
	modalLoading.classList.add('show', 'd-block');

	requestGetAjax(pathPersonDownload, JSON.stringify(arrayCodes)).then(
		(respDown) => {
			window.location = '/download/' + respDown;
			modalLoading.classList.remove('show', 'd-block');
		}
	);
}
