'use strict'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Contacts{
	constructor(data){
		this.id = data.id
		this.name = data.name
		this.company = data.company
		this.telp_number = data.telp_number
		this.email =  data.email
	}

	static selectAll(cb){
		db.all('select * from Contacts', function(err, rows){
			let contact = rows.map(function(element,i,array){
				return new Contacts(element)
			})

			cb(contact)
		})
	}

	static insertData(contactObject){
		let contact = new Contacts(contactObject)
		db.run(`INSERT INTO Contacts (name, company, telp_number, email)
	 		values ('${contact.name}', '${contact.company}', '${contact.telp_number}', '${contact.email}')`)
		
	}

	static getById(id, cb){
		db.all(`select * from Contacts where id = ${id}`,function(err, rows){
    		cb(rows)
  		});
	}

	static updateContact(id, reqBody, cb){
		let update = `UPDATE Contacts SET name = '${reqBody.name}', company = '${reqBody.company}',
	 		telp_number = '${reqBody.telp_number}', email = '${reqBody.email}' WHERE id = ${id}`
	 	db.run(update, function(err) {
			cb()
		})
	}

	static deleteContact(id , cb){
		db.run(`DELETE FROM Contacts WHERE id = ${id}`, function(err) {
		cb()
	})
	}
}

module.exports = Contacts


// console.log(Contacts.selectAll())