var express = require('express')
const router = express.Router()

var Contacts = require('../models/contacts.js')
var Addresses = require('../models/addresses.js')
// let contacts = Contacts.selectAll()
// console.log(contacts)

//-----------------INDEX
router.get('/', (req, res)=>{
	Contacts.selectAll().then((rowContacts)=>{
		res.render('contacts', {data:rowContacts})
	})
})

//--------------INSERT
router.post('/', (req, res) =>{
	Contacts.insertData(req.body)
	// res.send(req.body)
		res.redirect('contacts')
})

//---------------GET ID
router.get('/edit/:id', (req, res) => {
	Contacts.getById(req.params.id, (rowsContacts)=> {
		res.render('editContact', {data:rowsContacts})
	})
  	
});

//------------UPDATE
router.post('/edit/:id', (req, res) => {
	// res.send(req.body)
	Contacts.updateContact(req.params.id, req.body, ()=>{
		res.redirect('../../contacts')	
	})
})

//----------------DELETE
router.get('/delete/:id', (req, res ) => {
	Contacts.deleteContact(req.params.id, ()=>{
		res.redirect('../../contacts')
	})
	
})

module.exports = router
