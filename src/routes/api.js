/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com */

var model = require('../model/model.js'),
	fs = require('fs'),
	http = require('http');

var s3 = require('aws2js').load('s3', '', '');
	
var filesToRename = [];

// retrieve all records in a table
exports.getAll = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));    
    	model.callFind(req.param('fields'), res);
    }
    catch (e) {
		console.log(e);
	}
};

exports.getvar = function(req, res) {
	model.getvar(req, res);
};

// retrieve the record in a table by field name and field value
exports.getFieldByNameValue = function(req, res) {
	try
	{
		var data = '{"' + req.param('fn1') + '":';	
		var field = req.param('fn1');
		
		if (field.indexOf('cid') >= 0) {
			data += '"' + req.param('fv1') + '"}';
		}
		else {
			data += isNaN(req.param('fv1')) ? '"' + req.param('fv1') + '"}' : req.param('fv1') + '}';
		}	

		model.callDb(req.param('db'), req.param('schema'), req.param('table'));
		model.callFind(JSON.parse(data.toString()), res, req);
	}
	catch (e) {
		console.log(e);
	}
};

// update a record in a table
exports.updateRow = function(req, res) { //does not seem to work with curl
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));    
	
		//model.callFindOneAndRemoveSilent(req.param('fields'), res);
		//model.callFindOneAndUpdate(req.param('update'), res, req);
	
		model.callUpdate(req.param('fields'), req.param('update'), res, req);
	}
	catch (e) {
		console.log(e);
	}
};

// delete a record in a table
exports.deleteRow = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));    
    	model.callFindOneAndRemove(req.param('fields'), res);
    }
    catch (e) {
		console.log(e);
	}
};

// delete all the records in a table
exports.deleteAllRows = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));
		model.callTableRemove(res);
	}
	catch (e) {
		console.log(e);
	}
};

// insert a record in a table
exports.insertRow = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));	
		model.callFindOneAndUpdate(req.param('fields'), res);
	}
	catch (e) {
		console.log(e);
	}
};

// specific api
exports.collectionDataTable = function(req, res) {
	try
	{	
		if ((req.param('customer') !== '') && (req.param('eFlowAppName') !== ''))
		{
			var tn = req.param('customer') + '_' + req.param('eFlowAppName');
			var	data = '{"tName":' + '"' + tn + '"}';
		
			model.callDb('sp', '', 'tbls');	
			model.callFindOneAndUpdate(JSON.parse(data.toString()), res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.collectionDataQuery = function(req, res) {
	try
	{
		if ((req.param('tName') !== '') && (req.param('fn') !== '') && (req.param('fv') !== '')) {
			var data = '{"' + req.param('fn') + '":' + '"' + req.param('fv') + '"}';
			
			model.callDb('sp', '', req.param('tName'));
			model.callFind(JSON.parse(data.toString()), res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.collectionDataDelete = function(req, res) {
	try
	{
		if ((req.param('tName') !== '') && (req.param('cid') !== '')) {
			var tn = req.param('tName');
			var	cn = req.param('cid');
			var find = '{"﻿cid":' + '"' + cn + '"}';
			
			model.callDb('sp', '', tn);
			model.callFindOneAndRemove(JSON.parse(find.toString()), res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.collectionDataDeleteAll = function(req, res) {
	try
	{
		if ((req.param('tName') !== '') && (req.param('cid') !== '')) {
			var tn = req.param('tName');
			var	cn = req.param('cid');
			var find = '{"﻿cid":' + '"' + cn + '"}';
			
			model.callDb('sp', '', tn);
			model.callRemove(JSON.parse(find.toString()), res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.collectionData = function(req, res) {
	try
	{
		if ((req.param('tName') !== '') && (req.param('cid') !== '') && (req.param('strData') !== '')) {
			
			var tn = req.param('tName');
			var	cn = req.param('cid');
			var	sd = req.param('strData');
			var find = '{"﻿cid":' + '"' + cn + '"}';
			var	data = '{"﻿cid":' + '"' + cn + 
					'", "strData":' + '"' + sd +
					'", "cln":' + '"' + cn +
					'"}';
					
			model.callDb('sp', '', tn);
			model.dbFindUpdate(JSON.parse(data.toString()), JSON.parse(data.toString()), res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.reverse = function (s) {
  var o = '';
  for (var i = s.length - 1; i >= 0; i--)
    o += s[i];
  return o;
};

exports.getPath = function (s) {
	var fn = exports.getFileName(s);
	return s.replace(fn, '');
};

exports.getFileName = function (s) {
	var rev = exports.reverse(s), tmp = '';
	
	for (var i = 0; i <= rev.length - 1; i++) {
		if (rev[i] !== '/') {
			tmp += rev[i];
		}
		else if (rev[i] === '/') {
			break;
		}
	}
	
	return exports.reverse(tmp);
};

exports.submitbatch = function (req, res) {
	if (req.param('details') !== '') {
		
		var fDetails = '', cln = '', tn = '', tmpFields = [], fields = [];
		
		fDetails = req.param('details');
		tmpFields = fDetails.split('|');
		
		for (var i = 0; i <= tmpFields.length - 1; i++) {
			if (i === 0) {
				cln = tmpFields[i];
			} else if (i === 1) {
				tn = tmpFields[i];
			} else {
				fields.push(tmpFields[i]);
			}
		}
		
		var	data = '{"cid":' + '"' + cln + '", ' + 
					'"cln":' + '"' + cln + '"}';
					
		var replaceC = false;
		
		if (req.param('replace') === 'true') {
			replaceC = true;
		}
	
		model.callDb('sp', '', tn);
		model.submitbatch(replaceC, cln, JSON.parse(data.toString()), fields, res);
	}
};

// Not used...
exports.submitUpload = function (req, res) {
	try
	{
		res.header('Access-Control-Allow-Origin', "*");
		res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		
		var app = req.param('dz_app'),
			dm = req.param('dz_dm'),
			spId = req.param('dz_spId'),
			spName = req.param('dz_spName'),
			poNum = req.param('dz_poNum'),
			user = req.param('dz_user'),
			
			appendix = dm + '_' + app + '-';
		
		appendix += spId + '__' + poNum;
		
		model.callDb('sp', '', 'files');
		var find = '{"idnum":"1"}';
		
		model.findall(JSON.parse(find.toString()), res);
		
		setTimeout((function() {
			var fls = model.files;
		
			s3.setBucket('supplierportal');
		
			fls.forEach(function(fName) {
				var stream = fs.ReadStream(fName),
					fn = appendix + "___" + exports.getFileName(fName);
			
				fs.stat(fName, function(error, stat) {
					s3.putStream(fn, stream, 'public-read', 
						{'content-type': 'image/tiff', 'content-length': stat.size}, function (error, result) {
							model.callDb('sp', '', 'files');
  							model.callTableRemoveSimple(res);
					});
				});
			});
		}), 1000);
		
		res.send(200, 'ok');
	}
	catch (e) {
		console.log(e);
	}
};

// Not used...
exports.upload = function(req, res) {
	try
	{	
		fs.readFile(req.files.file['path'], function (err, data) {
  			var newPath = __dirname + '/' + req.files.file['filename'];
  		
  			fs.writeFile(newPath, data, function (err) {
  				//console.log('Writing file: ' + newPath);
  				
  				var find = '{"idnum":"1","﻿fn":' + '"' + newPath + '"}';
			
				model.callDb('sp', '', 'files');
				model.callFindOneAndUpdateSimple(JSON.parse(find.toString()), res);
  				
  				res.send('ok');
  			});
		});
	}
	catch (e) {
		console.log(e);
	}
};

