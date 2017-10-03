var express = require('express')
const router = express.Router()

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
var Addresses = require('../models/addresses.js')
var Contacts = require('../models/contacts.js')


//-----------------------ADRESSES-------------------------------------------


router.get('/', function(req, res){
	Addresses.selectAll(function(rows){
		Contacts.selectAll(function(rowsContact){
			res.render('addresses', {data:rows, dataContacts:rowsContact})
	
		})
			
	})
	
})
//---------------QUERY
router.post('/', function(req, res){
	Addresses.insertData(req.body,function(){
		res.redirect('addresses')
	})	
})

//---------------GET ID
router.get('/edit/:id', function(req, res) {
	Addresses.getById(req.params.id,()=>{
		res.render('editAddresses', {data:rows, dataContacts:rowsContact})
	})
	
});

//------------UPDATE
router.post('/edit/:id', function(req, res)  {
	Addresses.updateContact(req.params.id, req.body, ()=>{
		res.redirect('../../addresses')
	})

})

//----------------DELETE
router.get('/delete/:id', function(req, res )  {
	Addresses.deleteContact(req.params.id, ()=>{
		res.redirect('../../addresses')
	})
	
})
//-----------------------END-ADRESSES-------------------------------------------

module.exports = router
