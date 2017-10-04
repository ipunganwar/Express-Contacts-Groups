const express = require('express')
const router = express.Router()

const Profile = require('../models/profiles.js')
const Contacts = require('../models/contacts.js')

//-----------------------PROFILE-------------------------------------------
router.get('/', function(req, res){
	
	Promise.all([
		Profile.selectAll(),
		Contacts.selectAll()
		]).then(object => {
			object[0].forEach((element_profile)=>{
				object[1].forEach((element_contact)=>{
					if(element_profile.contact_id == element_contact.id){
						element_profile.name = element_contact.name
					}
				})
			})
			res.render('profiles', {dataProfiles:object[0], dataContacts:object[1]} )
		})
})
//---------------INSERT
router.post('/', (req, res) =>{
	Profile.insertData(req.body)
	res.redirect('profiles')
})

//---------------GET ID
router.get('/edit/:id', (req, res) => {
	Profile.getById(req.params.id).then((object_of_profile)=>{
		// res.send(object_of_profile)
		res.render('editProfile', {data:object_of_profile})
	})
})

//------------UPDATE
router.post('/edit/:id', (req, res) => {
	Profile.updateProfile(req.body, req.params.id)
	// res.send(req.body)
		res.redirect('../../profiles')
})

//----------------DELETE
router.get('/delete/:id', (req, res) => {
	Profile.deleteProfile(req.params.id)
		res.redirect('../../profiles')
})
//-----------------------END-PROFILE-------------------------------------------


module.exports = router
