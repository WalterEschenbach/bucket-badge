const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user === null) {
            return done(null, false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password is incorrect' })
            }
        } catch (error) {
            return done(error)
        }

    }


    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => {
        console.log('serialize', user.id)
        return done(null, user.id)

    });
    passport.deserializeUser((id, done) => {
        console.log('deserialize')

        return done(null, getUserById(id))
    });
}

module.exports = initialize