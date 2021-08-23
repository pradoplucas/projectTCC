var pathSaveSuggestion = '/about/saveSuggestion';

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

function saveSuggestion() {
	let suggestionTA = document.getElementById('suggestionTA').value;

	if (suggestionTA.length >= 5) {
		let dataToSend = '';

		dataToSend += 'suggestion=';
		dataToSend += suggestionTA;

		requestPostAjax(pathSaveSuggestion, dataToSend)
			.then((resData) => {
				let feedbackSuggestion =
					document.getElementById('feedbackSuggestion');

				if (resData.message == 'Ok') {
					feedbackSuggestion.innerHTML = 'Salvo com sucesso';
					feedbackSuggestion.classList.add('text-success');
					feedbackSuggestion.classList.remove(
						'text-danger',
						'd-none'
					);
				} else {
					feedbackSuggestion.innerHTML =
						'Algo deu errado, tente novamente mais tarde';
					feedbackSuggestion.classList.add('text-danger');
					feedbackSuggestion.classList.remove(
						'text-success',
						'd-none'
					);
				}
			})
			.catch((err) => {
				feedbackSuggestion.innerHTML =
					'Algo deu errado, tente novamente mais tarde';
				feedbackSuggestion.classList.add('text-danger');
				feedbackSuggestion.classList.remove('text-success', 'd-none');
			});
	}
}
