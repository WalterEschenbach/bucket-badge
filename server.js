const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030;
const keys = require('./config/keys')
app.use(express.json())
require('dotenv').config()


const corsOptions = {
    origin: [keys.domain.client || process.env.DOMAIN_CLIENT, "http://127.0.0.1:3000", "http://127.0.0.1:3030", "http://localhost:3030"],
    credentials: true
}
const cors = require('cors')
app.use(cors(corsOptions))


const connectionURL = process.env.MONGODB_CONNECTION_STRING
const mongoose = require('mongoose')
mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => { console.log("DB connected...") })
    .catch(error => console.log(error))


// Cookie Session Setup
let cookieSession = require('cookie-session')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey || process.env.SESSION_COOKIE_KEY]
}))


// Initialize Passport
const passport = require('passport')

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport-setup')


app.get('/', (req, res) => {
    res.send({ user: req.user })
})



app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

// Send user to client
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

// auth logout
app.get('/logout', (req, res) => {
    // handle with passport
    req.logout()
    res.status(200).send()
    console.log('User has logged out...')
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})