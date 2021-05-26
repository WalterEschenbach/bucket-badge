const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

module.exports = function (passport) {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ email: username }, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        });
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            const userInfo = {
                username: user.email
            }
            done(err, userInfo)
        });
    });

}

