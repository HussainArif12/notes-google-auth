const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const formatDate = require('./helpers/formatDate.js');

const app = express();
const PORT = 3000;

app.use(require('morgan')('dev'));

//bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  methodOverride(function (req, res) {
    if (
      req.body &&
      typeof req.body === 'object' &&
      '_method' in req.body
    ) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

//passport config
require('./config/passport')(passport);

//load dotenv config.
dotenv.config();
connectDB();
//handlebars
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: { formatDate },
  }),
);
app.set('view engine', '.hbs');

//Express sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  }),
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

app.listen(PORT, console.log('LIstening at port 3000'));
