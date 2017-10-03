var express = require('express')
const router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//-----------------------GROUPS-------------------------------------------
router.get('/', function(req, res){
	db.all('select * from Groups', function(err, rows){
		// res.send(rows)
		res.render('groups', {data:rows})
	})
})
//---------------QUERY
router.post('/', function(req, res){
	db.run(`INSERT INTO Groups (name_of_group)
	 values ('${req.body.name_of_group}')`)
	res.redirect('groups')
	console.log(req.body)
})

//---------------GET ID
router.get('/edit/:id', function(req, res) {
  db.all(`select * from Groups where id = ${req.params.id}`,function(err, rows){
    res.render('editGroups', {data:rows})
  });
});

//------------UPDATE
router.post('/edit/:id', function(req, res) {
	let update = `UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id}`

	db.run(update, function(err) {
		res.redirect('../../')
	})

})

//----------------DELETE
router.get('/delete/:id', function(req, res ) {
	db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`, (err) => {
		console.log(req.params)
		console.log('data berhasil delete')
		res.redirect('../../')
	})
	
})

//-----------------------END-GROUPS-------------------------------------------
module.exports = router
