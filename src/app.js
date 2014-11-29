/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com - */

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var page = require('./routes/webpages.js'), api = require('./routes/api.js');

var http = require('https');
http.globalAgent.maxSockets = 9999;

var https = require('http');
https.globalAgent.maxSockets = 9999;

//var env = "";
var env = JSON.parse(process.env.VCAP_SERVICES); // AppFog env variable

exports.env = env;

app.configure (function() {
	app.use(express.bodyParser());
	app.use(express.compress());
	app.use(express.static(__dirname + '/public'));
});

// pages...
app.get('/', page.home);

// file upload
app.post('/k4e79e72Fe9ZWgcCaexsd7azLdXxsdsZAs/fupload', api.upload);
app.post('/k4e79e72Fe9ZWgcCaexsd7azLdXxsdsZAs/fsubmitupload', api.submitUpload);

app.get('/login', function(req, res){
  res.redirect('/#/login');
});

app.get('/k4e2550htyjrtyj4345435/alist', page.alist);
app.get('/k4e2550htyjrtyj4345435/adminslist', page.adminslist);
app.get('/k4e2550htyjrtyj4345435/domains', page.registeredDomains);
app.get('/approveuser/:un', page.approveUserName);
app.post('/adminforusers', page.adminforusers);
app.get('/k4e2550htyjrtyj4345435/getusername', page.getUserName);
app.post('/k4e2550htyjrtyj4345435/getusername/p', page.getUserName);

app.post('/login/do', page.dologin);
app.post('/signup/do', page.dosignup);
app.post('/usersignup/do', page.dousersignup);
app.post('/recover/do', page.dorecover);
app.get('/k4e2550htyjrtyj4345435/usersettings/load', page.loadusersettings);
app.post('/k4e2550htyjrtyj4345435/usersettings/p/load', page.loadusersettings);
app.post('/k4e2550htyjrtyj4345435/usersettings/do', page.dousersettings);
app.post('/kChUTqbUjO2DtKgXLG4LIjzzLd', page.encrypt);
app.post('/k4e79e72Fe9ZWgcCaexsd7azLd', page.decrypt);

// generic api...
// retrieve all records in a table
app.get('/getvar', api.getvar);
app.get('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/:db/:table', api.getAll);
app.post('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/p/:db/:table', api.getAll);
// retrieve the record in a table by field name and field value
app.get('/k4e2552DtKgXLG4LIjyj4345435/radkiddo/eafa/sp/efl/timgsys/api/query/:db/:table/:fn1/:fv1', api.getFieldByNameValue);
// update a record in a table
app.put('/k4e22552DtKgXLG445435/radkiddo/eafa/sp/efl/timgsys/api/row', api.updateRow);
// delete a record in a table
app.delete('/k4e2DtKgXLG445435yj4345435/radkiddo/eafa/sp/efl/timgsys/api/row', api.deleteRow);
// delete all the records in a table
app.delete('/k4e2550htDtKgXLG4455435/radkiddo/eafa/sp/efl/timgsys/api/table', api.deleteAllRows);
app.post('/k4e2550htDtKgXLG4455435/radkiddo/eafa/sp/efl/timgsys/api/p/table', api.deleteAllRows);
// insert a record in a table
app.post('/k4e2550550htDtKgXLj4345435/radkiddo/eafa/sp/efl/timgsys/api/row', api.insertRow);

// specific api
app.post('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/cdt/p', api.collectionDataTable);
app.post('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/cd/p', api.collectionData);

app.post('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/cd/p/query', api.collectionDataQuery);

app.post('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/cd/p/delete', api.collectionDataDelete);
app.post('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/cd/p/deleteAll', api.collectionDataDeleteAll);
app.post('/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/cd/submitbatch', api.submitbatch);

// Send email activation
app.get('/activation/send/:to', page.sendActivationEmail);
// Activate account link
app.get('/activate/:to', page.activateAccount);

// 404
app.get('*', function(req, res){
  res.redirect('/#/404');
});

app.listen(process.env.VCAP_APP_PORT || 3000); // AppFog
//app.listen(3000); // local node