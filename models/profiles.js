'use strict'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Profile{

	static selectAll(cb){
		let qProfile = 'SELECT * FROM Profile'

		db.all(qProfile, function(err, rows){
			cb(rows)
		})
	}

	static insertData(reqBody, cb){
		console.log(reqBody)
		db.run(`INSERT INTO Profile (username, password, contact_id)
	 		values ('${reqBody.username}', '${reqBody.password}', '${reqBody.contact_id}')`, function(err){
	 		if(!err){
					cb()
				}
			else{
				if(err.code == 'SQLITE_CONSTRAINT'){
					cb()
				}
			}
		
		 })
	}

	static updateProfile(reqBody, id, cb){

		let update = `UPDATE Profile SET username = '${reqBody.username}', password = '${reqBody.password}', contact_id=${reqBody.contact_id} WHERE id = ${id}`
		console.log(update)
		db.run(update, function(err){
			cb()	
		})
	}

	static getById(id, cb){
		db.all(`select * from Profile where id = ${id}`,function(err, rows){
    		cb(rows)
  		});
	}

	static deleteProfile(id, cb){
		db.run(`DELETE FROM Profile WHERE id = ${id};`, function(err) {
		cb()
	})
	}
}

module.exports = Profile