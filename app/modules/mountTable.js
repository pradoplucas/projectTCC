function personRowSimple(onePerson) {
	let tableRows = '';

	onePerson.certificates.forEach((cert) => {
		tableRows += '<tr><td>';
		tableRows += cert.year;
		tableRows += '</td><td>';
		tableRows +=
			'<a href="http://apl.utfpr.edu.br/extensao/certificados/validar/';
		tableRows += cert.code;
		tableRows +=
			'" target="_blank" class="link-dark text-decoration-none">';
		tableRows += cert.eventName;
		tableRows += '</a></td></tr>';
	});

	return tableRows;
}

module.exports = {
	personRowCheck: (onePerson) => {
		let auxPerson = {};
		auxPerson.name = onePerson.name;

		let newObjCerts = {};

		onePerson.certificates.forEach((cert) => {
			let aux =
				'<tr><th><input class="form-check-input btnCheckRow" type="checkbox" value="" id="';
			aux += cert.code + '"></th><td>';
			aux += cert.year;
			aux += '</td><td>';
			aux +=
				'<a href="http://apl.utfpr.edu.br/extensao/certificados/validar/';
			aux += cert.code;
			aux += '" target="_blank" class="link-dark text-decoration-none">';
			aux += cert.eventName;
			aux += '</a></td></tr>';

			cert.table = aux;

			let yearKey = cert.year;

			if (yearKey in newObjCerts) newObjCerts[yearKey].push(cert);
			else newObjCerts[yearKey] = [cert];
		});

		auxPerson.certificates = newObjCerts;

		return auxPerson;
	},

	personTableSimple: (onePerson) => {
		let aux =
			'<table class="table table-light table-hover table-bordered text-center"><thead class="table-dark">';
		aux += '<tr><th scope="col" class="align-middle">Ano</th>';
		aux +=
			'<th scope="col" class="align-middle">Nome</th></tr></thead><tbody>';
		aux += personRowSimple(onePerson);
		aux += '</tbody></table></div></div></div></div></div></div>';

		return [onePerson, aux];
	},
};
