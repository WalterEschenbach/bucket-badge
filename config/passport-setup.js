const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        function (username, password, done) {
            User.findOne({ email: username }, function (err, user) {
                if (err) {
                    console.log('error:', err)
                    return done(err);
                }
                if (!user) {
                    console.log('no user')
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result === false) {
                        console.log('password failed')
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    console.log('u:', user)
                    return done(null, user);
                })

            });
        }
    ));

    passport.serializeUser((user, done) => {
        console.log('serialize user:', user._id)
        return done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        console.log('deserialize id:', id)
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

