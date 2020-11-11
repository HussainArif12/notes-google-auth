const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db')
const app = express();
const PORT = 3000;

//load dotenv config.
dotenv.config();

connectDB();
//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main' , 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

//static folder
app.use(express.static(path.join(__dirname,'public')));


app.listen(PORT , console.log('LIstening at port 3000'));