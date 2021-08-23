const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/User.model')

module.exports = (passport) => {
    function findUserByEmail(email) {
        User.findOne({email: email}).then((resUser) => {
            return resUser;
        }).catch((err) => {
            console.log(err);
        })
    }

    function findUserById(id) {
        User.findById(id).then((resUser) => {
            return resUser;
        }).catch((err) => {
            console.log(err);
        })
    }

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        try{
            User.findById(id).then((resUser) => {
                done(null, resUser);
            }).catch((err) => {
                return done(err, null);
            })   
        }
        catch(err){
            console.log(err);
            return done(err, null);
        }
    })

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    (username, password, done) => {
        try{
            User.findOne({email: username}).then((resUser) => {
                if(!resUser) return done(null, false);

                const isValid = bcrypt.compareSync(password, resUser.pwdHash);

                if(!isValid) return done(null, false);

                if(!resUser.emailConfirm) return done(null, false);

                return done(null, resUser);
            }).catch((err) => {
                console.log(err);
                return done(err, false);
            })
        }
        catch(err){
            console.log(err);
            return done(err, false);
        }
    }))
}