const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const router = express.Router();
const { Client } = require('pg');
var multer  = require('multer');
require('dotenv').config();
const port = process.env.PORT ;
const morgan = require('morgan');
app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images',express.static('images'));

require('./routes/image_routes')(app);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})

