const multer = require('multer');
const fs = require('fs');

module.exports = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			var dir = 'uploads/newCerts/' + req.user._id.toString();

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}
			cb(null, dir);
		},
		filename: (req, file, cb) =>
			cb(null, Date.now() + '_' + file.originalname),
	}),
	fileFilter: (req, file, cb) => {
		console.log(file.size);
		try {
			if (file.mimetype != 'application/pdf') {
				cb(null, false);
				cb(new Error('Invalid format'));
			} else {
				cb(null, true);
			}
		} catch (err) {
			console.log('Err File: ' + err);
		}
	},
	limits: {
		fileSize: 1 * 1000 * 1024,
		files: 1,
	},
}).single('newFile');
