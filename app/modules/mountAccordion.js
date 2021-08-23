module.exports = {
	table: (oneCert, ocult, oneCourse) => {
		let auxStrTable = '<tr id="';
		auxStrTable += oneCert.code;
		auxStrTable += '">';

		auxStrTable +=
			'<td class="groupCert d-none">' + oneCert.group + '</td>';

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
	},

	accordion: (table, where) => {
		let contentH2 = '';

		if (where != 'NA') {
			contentH2 +=
				'<div class="row"><div class="col-2 col-md-1 pe-0"><label class="btn btn-sm btn-outline-light w-100 h-100 d-flex align-items-center justify-content-center" for="checkboxG';
			contentH2 += where;
			contentH2 +=
				'"><input type="checkbox" class="form-check-input" onchange="checkboxDownload(this.checked, \'G';
			contentH2 += where;
			contentH2 += '\')" id="checkboxG';
			contentH2 += where;
			contentH2 +=
				'" autocomplete="off"></label></div><div class="col-10 col-md-11 ps-0"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionCollapseG';
			contentH2 += where;
			contentH2 += '">Grupo ';
			contentH2 += where;
			contentH2 += '</button></div></div>';
		} else {
			contentH2 +=
				'<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionCollapseGNA">[N/A]</button>';
		}

		let auxStrAccordion =
			'<div class="accordion-item"><h2 class="accordion-header" id="accordionHeaderG';
		auxStrAccordion += where;
		auxStrAccordion += '">';
		auxStrAccordion += contentH2;
		auxStrAccordion += '</h2>';

		auxStrAccordion += '<div id="accordionCollapseG';
		auxStrAccordion += where;
		auxStrAccordion +=
			'" class="accordion-collapse collapse"><div class="accordion-body p-0"><table class="table table-light table-hover table-sm align-middle text-center m-0">';
		auxStrAccordion += '<tbody id="tbodyG';
		auxStrAccordion += where;
		auxStrAccordion += '">';
		auxStrAccordion += table;
		auxStrAccordion += '</tbody></table></div></div></div>';

		return auxStrAccordion;
	},
};
