var express = require('express')
const router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

router.get('/', function(req, res) {
	res.render('index')
})

module.exports = router