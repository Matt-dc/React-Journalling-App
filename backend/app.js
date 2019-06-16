const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser');
const ejs = require('ejs');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session');

const app = express();

require('./config/passport')(passport)

const URL = 'mongodb://localhost/testingdbbb'

mongoose.connect(URL);
const db = mongoose.connection

db.once('open', () => console.log("connection success!!"))
db.on('error', console.error.bind('error connecting'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(session({
    secret: 'bla',
    saveUninitialized: true,
    resave: true
}))
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('msg');
    res.locals.error = req.flash('err');
    next(); 
})

const misc = require('./routes/misc.js')
const user = require('./routes/user.js')
const post = require('./routes/post.js')

// routes
app.use('/', user)
app.use('/', misc)
app.use('/', post)

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}!!`))
