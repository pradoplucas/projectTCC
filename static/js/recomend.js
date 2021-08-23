var pathPrepareToEditRecomend = '/prepareToEditRecomend/';
var pathDeleteRecomend = '/deleteRecomend/';

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

function toggleManager(isChecked) {
	let divAbsolute = document.getElementsByClassName('myRecomends');

	if (isChecked)
		for (oneDiv of divAbsolute) oneDiv.classList.remove('d-none');
	else for (oneDiv of divAbsolute) oneDiv.classList.add('d-none');
}

function prepareToEditRecomend(recomendId) {
	requestGetAjax(pathPrepareToEditRecomend, recomendId)
		.then((oneRecomend) => {
			document.getElementById('editInputRecomendId').value =
				oneRecomend._id.toString();
			document.getElementById('editFloatingInputName').value =
				oneRecomend.name;
			document.getElementById('editFloatingSelectGroup').value =
				oneRecomend.group;
			document.getElementById('editFloatingTADescription').value =
				oneRecomend.description;
			document.getElementById('editFloatingInputLocal').value =
				oneRecomend.local;
			document.getElementById('editFloatingSelectPublic').value =
				oneRecomend.public;
			document.getElementById('editFloatingInputDate').value =
				oneRecomend.date;
			document.getElementById('editFloatingSelectHour').value =
				oneRecomend.hour;
			document.getElementById('editFloatingSelectMinute').value =
				oneRecomend.minute;

			$('#modalEdit').modal('show');
		})
		.catch((err) => {
			console.log(err);
		});
}

function deleteRecomend(recomendId) {
	requestGetAjax(pathDeleteRecomend, recomendId)
		.then((resData) => {
			if (resData[0] == 'Ok')
				document.getElementById(recomendId).classList.add('d-none');
		})
		.catch((err) => {
			console.log(err);
		});
}
