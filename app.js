var express = require("express");
var app = express();

var monsterRouter = require('./routes/api/monsters')
app.use('/api/monsters', monsterRouter);

module.exports = app;