'use strict'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Addresses{

	static selectAll(cb){
		let qAddress = 'SELECT * FROM Address'

		db.all(qAddress, function(err, rows){
			cb(rows)
		})
	}

	static insertData(reqBody, cb){
		db.run(`INSERT INTO Address (street, city, zipcode, contact_id)
	 		values ('${reqBody.street}', '${reqBody.city}', '${reqBody.zipcode}', '${reqBody.contact_id}')`, function(err){
	 		cb()
	 	})
	}

	static getById(id, cb){
  		db.all(`select * from Address where id = ${id}`,function(err, rows){
  			cb(rows)
  		})
   
	}

	static updateContact(id, reqBody, cb){
		let update = `UPDATE Address SET street = '${reqBody.street}', zipcode = '${reqBody.zipcode}', contact_id= '${reqBody.contact_id}' WHERE id = ${id}`
		db.run(update, function(err)  {
			
		})
		
	}

	static deleteContact(id , cb){
		db.run(`DELETE FROM Address WHERE id = ${id}`, function(err) {
			cb()
		})
	}
}

module.exports = Addresses


// console.log(Contacts.selectAll())