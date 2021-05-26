const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030;
const keys = require('./config/keys')
const bcrypt = require('bcrypt')
const User = require('./models/user.model')
const flash = require('express-flash')
const session = require('express-session')
const cookieSession = require('cookie-session')

app.use(flash())


app.use(express.json())
require('dotenv').config()

// CORS
const d1 = new RegExp('127.0.0.1')
const d2 = new RegExp('localhost')
const corsOptions = {
    origin: ["http://localhost:3030", "http://127.0.0.1:3030", "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
}
const cors = require('cors')
app.use(cors(corsOptions))


// MONGODB
const connectionURL = process.env.MONGODB_CONNECTION_STRING
const mongoose = require('mongoose')
mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => { console.log("DB connected...") })
    .catch(error => console.log(error))



// Session Setup

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.session.cookieKey || process.env.SESSION_COOKIE_KEY],
//     domain: keys.domain.client,
//     path: '/'
// }))


// Initialize Passport
let passport = require('passport')
require('./config/passport-setup')(passport)


app.use(passport.initialize())
app.use(passport.session())







// Home Route
app.get('/', (req, res) => {
    console.log("req.user:", req.user)
    res.send({ user: req.user })
})

// Login User

// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// })
// );

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        console.log('userr:', user)
        if (err) { return next(err); }
        if (!user) { return res.send('User does not exist...'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return next(user)
        });
    })(req, res, next);
});

// Register User
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = User({ email: req.body.email, password: hashedPassword })
        newUser.save()
        res.status(200).send(newUser)
    } catch (error) {
        res.redirect(`${keys.domain.client}/register`)
    }
})


// Logout
app.get('/logout', (req, res) => {
    // handle with passport
    req.logout()
    res.status(200).send()
    console.log('User has logged out...')
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})