'use strict'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Addresses{
	constructor(data){
		this.id = data.id
		this.street = data.street
		this.city = data.city
		this.zipcode = data.zipcode
		this.contact_id = data.contact_id
	}

	static selectAll(){
		return new Promise((resolve)=>{
			db.all('SELECT * FROM Address', function(err, rows){
				let address = rows.map((element)=>{
					return new Addresses(element)
				})
				resolve(address)
			})
		})
		
	}

	static insertData(reqBody){
		let address = new Addresses(reqBody)
		return new Promise((resolve)=>{
			db.run(`INSERT INTO Address (street, city, zipcode, contact_id)
	 			values ('${address.street}', '${address.city}', '${address.zipcode}', '${address.contact_id}')`, function(err){
	 		
	 		})
		})
	}

	static getById(id){
		return new Promise((resolve)=>{
			db.all(`select * from Address where id = ${id}`,function(err, rows){
				let address = rows.map((element)=>{
					return new Addresses(element)
				})
				resolve(address)
  			})
		})
  		
   
	}

	static updateContact(id, reqBody){
		let address = new Addresses(reqBody)
		let update = `UPDATE Address SET street = '${address.street}', city = '${address.city}', zipcode = '${address.zipcode}', contact_id= '${address.contact_id}' WHERE id = ${id}`
			console.log(update)

		return new Promise((resolve)=>{
			db.run(update, function(err)  {
			
			})
		})
	}

	static deleteContact(id){
		return new Promise(()=>{
			db.run(`DELETE FROM Address WHERE id = ${id}`, function(err) {
			})
		})
		
	}
}

module.exports = Addresses


// console.log(Contacts.selectAll())