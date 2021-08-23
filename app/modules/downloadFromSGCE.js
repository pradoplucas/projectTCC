const fs = require('fs');
const path = require('path');
const http = require('http');

module.exports = (arrayCodes, pathToDir, user_id = '') => {
	const urlBase = 'http://apl.utfpr.edu.br/extensao/emitir/';

	return new Promise((resolve, reject) => {
		let count = 0;
		let arraySize = arrayCodes.length;
		arrayCodes.forEach((objCode) => {
			if (!objCode.fromSGCE) {
				fs.copyFile(
					path.join(
						process.cwd(),
						'uploads',
						'newCerts',
						user_id,
						objCode.code
					),
					path.join(pathToDir, objCode.code),
					(err) => {
						if (err) throw err;
						console.log('source.txt was copied to destination.txt');
						count++;
						if (count == arraySize) resolve({ success: true });
					}
				);
			} else {
				http.get(urlBase + objCode.code, (res) => {
					const fileStream = fs.createWriteStream(
						path.join(pathToDir, objCode.code + '.pdf')
					);

					res.pipe(fileStream);

					fileStream.on('finish', () => {
						fileStream.close();
						console.log('Done');
						count++;
						if (count == arraySize) resolve({ success: true });
					});

					fileStream.on('error', (err) => {
						fileStream.close();
						console.log('Error: ' + err);
						reject({ success: false, err: err });
					});
				});
			}
		});
		if (count == arraySize) resolve({ success: true });
	});
};
