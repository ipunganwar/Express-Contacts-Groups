var express = require('express')
const router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
var Addresses = require('../models/addresses.js')
var Contacts = require('../models/contacts.js')


//-----------------------ADRESSES-------------------------------------------


router.get('/', function(req, res){

	Promise.all([
		Addresses.selectAll(),
		Contacts.selectAll()
		]).then(object =>{
			// res.send(object)
			object[0].forEach((element_of_address)=>{
				object[1].forEach((element_of_contacts)=>{
					if(element_of_address.contact_id == element_of_contacts.id){
						element_of_address.name = element_of_contacts.name
					}
				})
			})
			res.render('addresses', {dataAddress:object[0], dataContacts:object[1]})
		})
	
})
//---------------INSERT
router.post('/', function(req, res){
	Addresses.insertData(req.body)
		// res.send(req.body)
		res.redirect('addresses')	
})

//---------------GET ID
router.get('/edit/:id', function(req, res) {
	Addresses.getById(req.params.id).then((object_of_address)=>{
		// res.send(object_of_address)
		res.render('editAddresses', {data:object_of_address})
	})
})

//------------UPDATE
router.post('/edit/:id', function(req, res)  {
	Addresses.updateContact(req.params.id, req.body)
		// res.send(req.body)
		res.redirect('../../addresses')
})

//----------------DELETE
router.get('/delete/:id', function(req, res )  {
	Addresses.deleteContact(req.params.id)
		res.redirect('../../addresses')
})
//-----------------------END-ADRESSES-------------------------------------------

module.exports = router
