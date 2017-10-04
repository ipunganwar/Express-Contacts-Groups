//EXPRESS
var express = require('express')
var app = express()

//DB
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//EJS
var ejs = require('ejs')
app.set('view engine', 'ejs')

//BODY-PARSER
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//INDEX
let index = require('./routers/index.js')
app.use('/', index)


//CONTACTS
let contacts = require('./routers/contacts.js')
app.use('/contacts', contacts)

//PROFILE
let profiles = require('./routers/profiles.js')
app.use('/profiles', profiles)

//ADDRESSES
let addresses = require('./routers/addresses.js')
app.use('/addresses', addresses)

//GROUPS
let groups = require('./routers/groups.js')
app.use('/groups', groups)


//Address And Contacts
let addressContact = require('./routers/addressContact.js')
app.use('/addressContact', addressContact)


//gunakan req.body.nama_parameter
//untuk mengakses nilai di dalam ejs
app.listen(3000)