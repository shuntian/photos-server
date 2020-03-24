const express = require('express');
const IndexRouter = require('./routes/index');
const app = express();

app.get('/', IndexRouter);
// app.post('/')

module.exports = app;