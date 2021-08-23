const infoLogged = require('../modules/infoLogged');

module.exports = {
	get: (req, res) => {
		res.render('docs', infoLogged.onlyNavbar(req.user));
	},
};
