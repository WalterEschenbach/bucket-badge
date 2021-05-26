const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3030;
const keys = require('./config/keys')
const bcrypt = require('bcrypt')
const User = require('./models/user.model')
const session = require('express-session')
const mongoose = require('mongoose')
let passport = require('passport')
const app = express()

require('dotenv').config()

// MONGODB
const connectionURL = process.env.MONGODB_CONNECTION_STRING
mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => { console.log("DB connected...") })
    .catch(error => console.log(error))

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport-setup')(passport)

// Login User
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err
        if (!user) res.send('User does not exist...')
        req.logIn(user, (err) => {
            if (err) throw err
            res.send('Successfully Authenticated')
            console.log('req.user:', req.user)
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

app.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

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