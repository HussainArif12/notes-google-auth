const app = require('express')();
const dotenv = require('dotenv');

const PORT = 3000;
//load dotenv config.
dotenv.config();
app.listen(PORT , console.log('LIstening at port 3000'));