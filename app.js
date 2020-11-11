const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const PORT = 3000;

//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main' , 'extname' : '.hbs'}));
app.set('view engine', '.hbs');

//static folder
app.use(express.static(path.join(__dirname,'public')));


//load dotenv config.
dotenv.config();
app.listen(PORT , console.log('LIstening at port 3000'));