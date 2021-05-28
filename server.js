const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3030;
const keys = require('./config/keys')
const bcrypt = require('bcrypt')
const User = require('./models/user.model')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
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
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3030"], credentials: true }))
app.use(session({
    name: 'bucketbadge:sess',
    secret: 'secretcat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())



require('./config/passport-setup')


// Login User
app.post('/login', (req, res, next) => {
    passport.authenticate('local', {}, (err, user, info) => {
        console.log('req', req)

        if (err) throw err
        if (!user) console.log('User does not exist...')
        if (user) {
            console.log('req.login firing')
            req.logIn(user, next)
        }
    })(req, res, next);
    res.send('User logged in...')
});

// Register User
app.post('/register', async (req, res) => {
    try {
        console.log('register req:', req.body)
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = User({ username: req.body.username, password: hashedPassword })
        newUser.save()
        res.status(200).send(newUser)
    } catch (error) {
        res.send('Error registering user...')
    }
})

app.get("/ping", (req, res) => {
    console.log('req.user @ /user endpoint:', req.user)
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