const Person = require('../models/Person.model');
const mountTable = require('../modules/mountTable');
const downloadFiles = require('../modules/downloadFiles');
const path = require('path');
const fs = require('fs');
const deleteDir = require('../modules/deleteDir');

module.exports = {
	getDownloadCerts: (req, res) => {
		console.log('download controller userID: ' + req.params.userId);
		let url = path.join(
			process.cwd(),
			'uploads',
			'temp',
			req.params.userId,
			'certs.zip'
		);
		res.download(url, (err) => {
			if (err) console.log('Err Down: ' + err);
			let pathToDir = path.join(
				process.cwd(),
				'uploads',
				'temp',
				req.params.userId
			);

			deleteDir(pathToDir);
		});
	},
	getDeleteDir: (req, res) => {
		let pathToDir = path.join(
			process.cwd(),
			'uploads',
			'temp',
			req.params.userId
		);

		deleteDir(pathToDir);
	},
};
