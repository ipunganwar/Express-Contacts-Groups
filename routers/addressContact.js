var express = require('express')
const router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

router.get('/:id', (req, res)=>{
	let qAddress = `select * from Address where contact_id = '${req.params.id}'`
	db.all(qAddress, (err, rows)=>{
		// res.send(rows)
		db.get(`select * from Contacts where id = '${req.params.id}'`, (err, rowsContact)=>{
			// res.send(rows[0].street)
			res.render('addressContact', {data:rows, dataContacts:rowsContact})
		})
		
	})

})

router.post('/edit/:id', (req, res) => {
	let insert = `INSERT INTO Address (street, city, zipcode, contact_id) VALUES ('${req.body.street}', '${req.body.city}','${req.body.zipcode}', '${req.params.id}')`

	db.run(insert, (err) => {
		// res.send(insert)
		// console.log(insert)
		res.redirect(`../${req.params.id}`)
		// console.log('data diupdate')	
	})

})

module.exports = router