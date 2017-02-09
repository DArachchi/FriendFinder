var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
//var router = express.Router();
var PORT = process.env.PORT || 8080;


//var htmlRoutes = require("./app/routing/htmlRoutes.js");
//var apiRoutes = require("./app/routing/apiRoutes.js");
var data = require("./app/data/friends.js");
var friendsList = data.object.friends;
var userData;
var matchIndex;

function checkMatch() {
	var lowestDifference = 100;
	for(var i=0; i<friendsList.length; i++) {
		var totalDifference = 0;
		for(var j=0; j<userData.length; j++) {
			totalDifference += Math.abs(userData[j]-friendsList[i].scores[j]);
		}
		if (totalDifference < lowestDifference) {
			matchIndex = i;
			lowestDifference = totalDifference;
		}
	}
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//app.use('/', htmlRoutes);
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});


app.get("/api/friends", function(req, res) {
  res.json(friendsList);
});

app.post("/api/friends", function(req, res) {
	userData = req.body.scores;
	checkMatch();
	friendsList.push(req.body);
	res.json(friendsList[matchIndex]);
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});