var express = require("express");
var app = express();

var collectionRouter = require("./routes/collection");
app.use("/collection", collectionRouter);

module.exports = app;
