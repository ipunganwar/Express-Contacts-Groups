'use strict'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Profile{
	constructor(data){
		this.id = data.id
		this.username = data.username
		this.password = data.password
		this.contact_id = data.contact_id
	}

	static selectAll(){
		return new Promise((resolve)=>{
			let qProfile = 'SELECT * FROM Profile'
			db.all(qProfile, function(err, rows){
				let profile = rows.map((element)=>{
					return new Profile(element)
				})
				resolve(profile)
			})
		})		
	}

	static insertData(reqBody){
		let objProfile = new Profile(reqBody)
		return new Promise((resolve) =>{
			db.run(`INSERT INTO Profile (username, password, contact_id)
	 			values ('${objProfile.username}', '${objProfile.password}', '${objProfile.contact_id}')`, (err)=>{
			})
		})
		
	}

	static updateProfile(reqBody, id){
		let profile = new Profile(reqBody)
		console.log(profile)
		let update = `UPDATE Profile SET username = '${profile.username}', password = '${profile.password}', contact_id=${profile.contact_id} WHERE id = ${id}`
		return new Promise((resolve)=>{
			db.run(update, function(err){	
				
			})
		})

		
	}

	static getById(id){
		return new Promise((resolve)=>{
			db.all(`select * from Profile where id = ${id}`,(err, rows)=>{
    			let profile = rows.map((element)=>{
    				return new Profile(element)
    			})
    			resolve(profile)
  			})
		})
		
	}

	static deleteProfile(id){
		return new Promise((resolve)=>{
			db.run(`DELETE FROM Profile WHERE id = ${id};`, (err)=> {

			})
		})
		
	}
}

module.exports = Profile