var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// include database config file
const db = require("./server-side/config/config.js");

// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
});

// include application routes
require("./server-side/routes/routes.js")(app);

// Create & Listen Server
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Application request listening at http://%s:%s", host, port);
});