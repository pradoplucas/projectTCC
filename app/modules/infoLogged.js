function navbar(userLog) {
	let objToSend = {
		logged: false,
		username: null,
		notifications: [{ code: 'na', event: '0 notificações', date: 'N/A' }],
	};

	if (userLog) {
		objToSend.logged = true;

		if (userLog.username && userLog.username.length >= 8)
			objToSend.username = userLog.username;

		if (userLog.notifications.length > 0)
			objToSend.notifications = userLog.notifications;
	}

	return objToSend;
}

var maxValue = 70;
var minMax = {
	g1: '20/30',
	g2: '20/30',
	g3: '20/40',
};

function progress(userLog, oneCourse) {
	if (['ELE', 'ELT', 'ECA', 'EMC'].includes(oneCourse.initName)) {
		maxValue = 180;
		minMax = {
			g1: '36/54',
			g2: '36/54',
			g3: '36/72',
		};
	} else if (['LMT'].includes(oneCourse.initName)) {
		maxValue = 200;
		minMax = {
			g1: '20/-',
			g2: '20/-',
			g3: '-/-',
		};
	}

	let groupValue = {
		g1: 0,
		g2: 0,
		g3: 0,
	};

	for (cert of userLog.certificates) {
		if (!cert.ocult) {
			if (cert.group == 'g1') groupValue.g1 += parseInt(cert.value);
			else if (cert.group == 'g2') groupValue.g2 += parseInt(cert.value);
			else if (cert.group == 'g3') groupValue.g3 += parseInt(cert.value);
		}
	}

	return {
		groups: {
			g1: groupValue.g1,
			pg1:
				groupValue.g1 == '0'
					? '5'
					: Math.ceil((parseInt(groupValue.g1) * 100) / maxValue),
			mmg1: minMax.g1,
			g2: groupValue.g2,
			pg2:
				groupValue.g2 == '0'
					? '5'
					: Math.ceil((parseInt(groupValue.g2) * 100) / maxValue),
			mmg2: minMax.g2,
			g3: groupValue.g3,
			pg3:
				groupValue.g3 == '0'
					? '5'
					: Math.ceil((parseInt(groupValue.g3) * 100) / maxValue),
			mmg3: minMax.g3,
		},
	};
}

function situation(userLog, oneCourse, objToSend) {
	let pctAct =
		(parseInt(objToSend.groups.g1) +
			parseInt(objToSend.groups.g2) +
			parseInt(objToSend.groups.g3)) /
		maxValue;
	let pctCourse = parseInt(userLog.period) / 10;

	if (['LMT', 'ESW'].includes(oneCourse.initName))
		pctCourse = parseInt(userLog.period) / 8;
	else if (['ADS'].includes(oneCourse.initName))
		pctCourse = parseInt(userLog.period) / 6;

	let sitUser = {
		courseStart: {
			valueStart:
				'Você ainda está no começo do curso, ainda tem muito tempo para conseguir as atividades, só não deixa tudo para a última hora.',
			valueMiddle:
				'Uau, mesmo estando no começo do curso você já atingiu um nível legal de atividades, continue assim para terminar o quanto antes.',
			valueFinal:
				'Falta só um pouquinho para você terminar as atividades, vamos lá.',
			valueDone:
				'Você já terminou as atividades e ainda está no começo do curso? Meus parabéns, poucas pessoas conseguem este feito.',
		},
		courseMiddle: {
			valueStart:
				'Você está mais ou menos no meio do curso, ainda tem algum tempo para conseguir as atividades, só não deixa tudo para a última hora.',
			valueMiddle:
				'Você já atingiu um nível bom de atividades, continue assim para terminar o quanto antes.',
			valueFinal:
				'Falta só um pouquinho para você terminar as atividades, vamos lá.',
			valueDone: 'Você já terminou as atividades, parabéns.',
		},
		courseFinal: {
			valueStart:
				'Não querendo te preocupar, mas você está no final do curso e ainda faltam muitas atividades, tente agilizar para isso não te prender no curso.',
			valueMiddle:
				'Você tem algumas atividades cadastradas, mas nem tanto, tente terminar o quanto antes.',
			valueFinal:
				'Falta só um pouquinho para você terminar as atividades, vamos lá.',
			valueDone: 'Você já terminou as atividades, parabéns.',
		},
	};

	if (pctCourse < 0.4) {
		if (pctAct > 0) objToSend.sitUser = sitUser.courseStart.valueStart;
		else if (pctAct > 0.3)
			objToSend.sitUser = sitUser.courseStart.valueMiddle;
		else if (pctAct > 0.6)
			objToSend.sitUser = sitUser.courseStart.valueFinal;
		else if (pctAct >= 1) objToSend.sitUser = sitUser.courseStart.valueDone;
	} else if (pctCourse < 0.7) {
		if (pctAct > 0) objToSend.sitUser = sitUser.courseMiddle.valueStart;
		else if (pctAct > 0.3)
			objToSend.sitUser = sitUser.courseMiddle.valueMiddle;
		else if (pctAct > 0.6)
			objToSend.sitUser = sitUser.courseMiddle.valueFinal;
		else if (pctAct >= 1)
			objToSend.sitUser = sitUser.courseMiddle.valueDone;
	} else {
		if (pctAct > 0) objToSend.sitUser = sitUser.courseFinal.valueStart;
		else if (pctAct > 0.3)
			objToSend.sitUser = sitUser.courseFinal.valueMiddle;
		else if (pctAct > 0.6)
			objToSend.sitUser = sitUser.courseFinal.valueFinal;
		else if (pctAct >= 1) objToSend.sitUser = sitUser.courseFinal.valueDone;
	}

	return objToSend;
}

module.exports = {
	onlyNavbar: (userLog) => {
		return navbar(userLog);
	},
	myCerts: (userLog, oneCourse) => {
		return {
			...navbar(userLog),
			...progress(userLog, oneCourse),
			...{ certificates: userLog.certificates },
		};
	},
	indexLog: (userLog, oneCourse) => {
		let objToSend = { ...navbar(userLog), ...progress(userLog, oneCourse) };

		objToSend.fullName = userLog.dname;
		objToSend.courseInit = oneCourse.shortName;
		objToSend.period = userLog.period + 'º Período';
		objToSend.sitUser =
			'Cadastre e organize os certificados na aba de Certificados.';

		objToSend = situation(userLog, oneCourse, objToSend);

		if (userLog.fname.length > 0 || userLog.lname.length > 0)
			objToSend.fullName = userLog.fname + ' ' + userLog.lname;

		return objToSend;
	},
};
