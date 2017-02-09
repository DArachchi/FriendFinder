router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

module.exports = router;