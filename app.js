const express = require("express");
const app = express();
const cors = require('cors'); // Enables CORS
const router = require('./routes/router');

app.use(cors()); // Enables CORS
app.use(express.json());
app.use(express.urlencoded());

app.use('/', router);
module.exports = app;