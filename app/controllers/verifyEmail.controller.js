const mongoose = require('mongoose');
const User = require('../models/User.model');

module.exports = {
    get: (req, res) => {
        let emailId = req.params.emailId;

        User.findOneAndUpdate({emailHash: emailId},{emailConfirm: true}).then((resUser) => {
            if(!resUser) res.render('verifyEmail', {text: "#modalFail"});
            else res.render('verifyEmail', {text: "#modalEmail"});
        }).catch((err) => {
            res.render('verifyEmail', {text: "#modalFail"})
        });
    }
}