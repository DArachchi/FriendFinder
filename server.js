var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

var friends = [
	{
		"name":"Ahmed",
		"photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
		"scores":
			[
			5,
			1,
			4,
			4,
			5,
			1,
			2,
			5,
			4,
			1
			]
	},
	{
		"name": "Jacob Deming",
		"photo": "https://pbs.twimg.com/profile_images/691785039043022849/oWsy8LNR.jpg",
		"scores":
			[
			4,
			2,
			5,
			1,
			3,
			2,
			2,
			1,
			3,
			2
			]
	},
	{
		"name": "Jeremiah Scanlon",
		"photo": "https://avatars2.githubusercontent.com/u/8504998?v=3&s=460",
		"scores":
			[
			5,
			2,
			2,
			2,
			4,
			1,
			3,
			2,
			5,
			5
			]
	},
	{
		"name": "Louis T. Delia",
		"photo": "https://pbs.twimg.com/profile_images/639214960049000449/lNCRC-ub.jpg",
		"scores":
			[
			3,
			3,
			4,
			2,
			2,
			1,
			3,
			2,
			2,
			3
			]
	}
]

var userData;
var matchIndex;

function checkMatch() {
	var lowestDifference = 100;
	for(var i=0;i<friends.length;i++) {
		var totalDifference = 0;
		for(var j=0;j<userData.length;j++) {
			totalDifference += Math.abs(userData[j]-friends[i].scores[j]);
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

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});


app.get("/api/friends", function(req, res) {
  res.json(friends);
});

app.post("/api/friends", function(req, res) {
	friends.push(req.body);
	userData = req.body.scores;
	checkMatch();
	res.json(friends[matchIndex]);
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});