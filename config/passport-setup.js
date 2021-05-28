const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user.model')


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        console.log('user in User.findOne', user)
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err
            if (result === true) {
                console.log('user:', user)
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
}
));

passport.serializeUser((user, done) => {
    console.log('user.id @ serializeUser:', user.id)
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    console.log('deserialize user:', id)

    User.findById(id, (err, user) => {
        done(err, user.id)
    });
});



