require('dotenv').config(); // MUST GO AT VERY TOP OF FILE!!
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require("express-session");
const passport = require('passport');
const MongoStore = require('connect-mongo')(session)

const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database')

const { PORT, DB_URL } = require('./config/config')

//gmail for email validation: d3vt35t1ng@gmail.com

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use('/uploads', express.static('uploads'))


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(cors(
 {
  origin: 'http://localhost:3000',//frontend server localhost:8080
  methods:['GET','POST','PUT','DELETE'],
  credentials: true // enable set cookie
 }
));

app.use(morgan('dev'))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// ----- express sessions -----
app.use(session({
    secret: 'oompa loompa',
    store: new MongoStore({ mongooseConnection: db }),
    saveUninitialized: false,
    resave: false,

  }))


//passport middleware
app.use(passport.initialize());
app.use(passport.session());



// ROUTES
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')


app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);


app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})


app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' })
})



// Get rid of Mongoose deprecation warnings.
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}


// DATABASE CONNECTION
mongoose.connect(DB_URL, options, () => {
    app.listen(PORT, () => console.log(`Successful connection on port ${PORT}!`))
})
.catch(err => console.log(err))