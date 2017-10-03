const express = require('express')
const router = express.Router()

const Profile = require('../models/profiles.js')
const Contacts = require('../models/contacts.js')

//-----------------------PROFILE-------------------------------------------
router.get('/', function(req, res){
	Profile.selectAll((rows)=>{
		Contacts.selectAll((rowsContact)=>{
			rows.forEach((element)=>{
				rowsContact.forEach((element)=>{
					if(rows.contact_id == rowsContact.id){
						res.render('profiles', {data:rows, dataContacts: rowsContact})
					}
					
				})
			})
			
		})
	})
})
//---------------INSERT
router.post('/', (req, res) =>{
	Profile.insertData(req.body, ()=>{
		// res.send(req.body)
		res.redirect('profiles')
	})	
})

//---------------GET ID
router.get('/edit/:id', (req, res) => {
	Profile.getById(req.params.id, (rows)=>{
		res.render('editProfile', {data:rows})
		console.log(rows)
	})
});

//------------UPDATE
router.post('/edit/:id', (req, res) => {
	Profile.updateProfile(req.body, req.params.id, ()=>{
		res.redirect('../../profiles')
	})
})

//----------------DELETE
router.get('/delete/:id', (req, res ) => {
	Profile.deleteProfile(req.params.id, ()=>{
		res.redirect('../../profiles')
	})	
})
//-----------------------END-PROFILE-------------------------------------------


module.exports = router
