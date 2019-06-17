const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
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


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.use(cookieParser());
app.use(session({
    secret: 'bla',
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('msg');
    res.locals.error_msg = req.flash('error_smsg');
    res.locals.error = req.flash('error');
    next();
})

const misc = require('./routes/misc.js')
const user = require('./routes/user.js')
const post = require('./routes/post.js')

// routes
app.use('/', user)
app.use('/', misc)
app.use('/', post)

const PORT = 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}!!`))
