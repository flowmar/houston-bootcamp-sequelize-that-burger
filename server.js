var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//////////////////////////////////////////////////
//// Change the port variable to the node environment
/////////////////////////////////////////////
var PORT = process.env.NODE_ENV || 3000;
var app = express();


/////////////////////////////////////////////////////
// Require the models directory
/////////////////////////////////////////
var db = require("./models");

////////////////////////////////////////////////////
// Sync the models -- 'sync'ing is the sequelize method that creates tables using your models.
/////////////////////////////////////////
db.sequelize.sync().then(function(){ // The sequelize property on the db object is the connection to our database
  app.listen(PORT, function(){
    console.log("Listening on port %s", PORT);
  });
});

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgersController.js");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);


app.listen(PORT, function() {
  console.log("Listening on port:%s", PORT);
});

// Include the models directory
var db = require("./models");

// Create a new User via .create
// .create takes in at least 1 argumen: an object containing key value
// pairs describing the new record we want to create.
db.User.create({
  email: "tom@myspace.com",
  password: "superinsecurepassword123",
  age: 46,
  name: "Tom Anderson",
}).then(function(dbUser){ // A promise that is called after the user is created
  // The promise takes a call back function as an argument
// The new User ('dbUser') is the argument for the callback function.
 console.log(dbUser); // print the dbUser object to the console.
});