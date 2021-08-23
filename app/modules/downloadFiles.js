const downloadFromSGCE = require('./downloadFromSGCE');
const zipDirectory = require('./zipDirectory');
const path = require('path');
const fs = require('fs');
const deleteDir = require('./deleteDir');

module.exports = async (userId, arrayCodes, user_id = '') => {
	const pathToDir = path.join(process.cwd(), 'uploads', 'temp', userId);

	if (fs.existsSync(pathToDir)) {
		deleteDir(pathToDir);
	}
	try {
		fs.mkdirSync(pathToDir, { recursive: true });
		fs.mkdirSync(path.join(pathToDir, 'files'), { recursive: true });
		for (group in arrayCodes)
			fs.mkdirSync(path.join(pathToDir, 'files', group), {
				recursive: true,
			});
	} catch (err) {
		console.log('Err CreateDir: ' + err);
	}

	try {
		for (group in arrayCodes)
			await downloadFromSGCE(
				arrayCodes[group],
				path.join(pathToDir, 'files', group),
				user_id
			);

		await zipDirectory(pathToDir);
	} catch (err) {
		console.log('Erro: ' + err);
	}
};
