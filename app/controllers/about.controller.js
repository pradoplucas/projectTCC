const infoLogged = require('../modules/infoLogged');
const Suggestion = require('../models/Suggestion.model');

module.exports = {
	get: (req, res) => {
		res.render('about', infoLogged.onlyNavbar(req.user));
	},
	postSaveSuggestion: (req, res) => {
		if (req.body.suggestion.length >= 5) {
			new Suggestion({
				suggestion: req.body.suggestion,
				date: Date.now(),
				accepted: false,
				applied: false,
			})
				.save()
				.then(() => {
					res.end(JSON.stringify({ message: 'Ok' }));
				})
				.catch((err) => {
					res.end(JSON.stringify({ message: 'Err' }));
				});
		}
	},
};
