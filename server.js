const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030;
const keys = require('./config/keys')
const bcrypt = require('bcrypt')
const User = require('./models/user.model')
const flash = require('express-flash')
const session = require('express-session')
app.use(express.json())
require('dotenv').config()

// CORS
const d1 = new RegExp('127.0.0.1')
const d2 = new RegExp('localhost')
const corsOptions = {
    origin: [d1, d2, "http://localhost:3030", "http://127.0.0.1:3030", "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ['POST', 'GET']
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


// Initialize Passport
const passport = require('passport')

const initializePassport = require('./config/passport-setup')
initializePassport(
    passport, 
    email => {
        return User.findOne({email: email})
    },
    id => {
        console.log('id', id )
        let user = User.findOne({_id : id})
        console.log('user:', user)
        return user
    })

//app.use(flash())

// Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}))
app.use(passport.initialize())
app.use(passport.session())


// Home Route
app.get('/', (req, res) => {
    console.log("req.user:", req.session)
    res.send({ user: req.user })
})

// Login User

app.post('/login',
    passport.authenticate('local', { 
        successRedirect: '/',
        failureFlash: true,
        cookie: {secure: false}
    }));

// Register User
app.post('/register', async (req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = User({email : req.body.email, password: hashedPassword})
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