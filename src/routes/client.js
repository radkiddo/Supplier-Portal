/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com */

var model = require('../model/model.js'), 
	crypto = require('./crypto.js');
	
exports.rsaDecrypt = function(key, text) {
	return crypto.rsaDecode(key, text);
};

exports.rsaEncrypt = function(key, mod, text) {
	return crypto.rsaEncode(key, mod, text);
};

exports.dousersettings = function(req, res) {
	try
	{
		if (req.param('un') !== undefined)
		{
			var find = '{"un":' + '"' + unescape(req.param('un')) + '"}',
				data = '{"fn":' + '"' + unescape(req.param('fn')) + '", ' + 
					'"ln":' + '"' + unescape(req.param('ln')) + '", ' +
					'"un":' + '"' + unescape(req.param('un')) + '", ' + 
					'"pwd":' + '"' + req.param('pwd') + '", ' + 
					'"pending": "false"}';
			
			model.callDb('sp', '', 'users');
			model.updateUserSettings(JSON.parse(find.toString()), JSON.parse(data.toString()), req, res)
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.getUserName = function(req, res) {
	try
	{
		if (req.param('un') !== undefined)
		{
			var find = '{"un":' + '"' + req.param('un') + '"}';
			
			model.callDb('sp', '', 'users');
			model.getUserName(JSON.parse(find.toString()), req, res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.loadusersettings = function(req, res) {
	try
	{
		if (req.param('un') !== undefined)
		{
			var find = '{"un":' + '"' + req.param('un') + '"}';
			
			model.callDb('sp', '', 'users');
			model.loadUserSettings(JSON.parse(find.toString()), req, res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.dorecover = function(req, res) {
	try
	{
		if (req.param('to') !== undefined)
		{
			var find = '{"un":' + '"' + unescape(req.param('to')) + '"}';
				
			model.callDb('sp', '', 'users');
			model.findRecover(JSON.parse(find.toString()), req, res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.dologin = function(req, res) {
	try
	{
		if (req.param('un') !== undefined)
		{
			var find = '{"un":' + '"' + unescape(req.param('un')) + '", "pending": "false"}';
			var pwd = req.param('pwd');
		
			model.callDb('sp', '', 'users');
			model.findItem(JSON.parse(find.toString()), pwd, req, res)
		}
	}
	catch (e) {
		console.log(e);
	}	
};

exports.dousersignup = function(req, res) {
	try
	{
		if (req.param('un') !== undefined)
		{
			var data = '{"fn":' + '"' + unescape(req.param('fn')) + '", ' + 
				'"ln":' + '"' + unescape(req.param('ln')) + '", ' +
				'"un":' + '"' + unescape(req.param('un')) + '", ' + 
				'"pwd":' + '"' + req.param('pwd') + '", ' + 
				'"pending": "approvalpending"}';
			
			var un = unescape(req.param('un'));
			var adminEmail = unescape(req.param('adminEmail'));
			var find = '{"un":' + '"' + un + '"}';
			
			model.callDb('sp', '', 'users');
			model.initUserPendingItem(un, adminEmail, JSON.parse(find.toString()), JSON.parse(data.toString()), req, res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.dosignup = function(req, res) {
	try
	{
		if (req.param('un') !== undefined)
		{
			var data = '{"fn":' + '"' + unescape(req.param('fn')) + '", ' + 
				'"ln":' + '"' + unescape(req.param('ln')) + '", ' +
				'"un":' + '"' + unescape(req.param('un')) + '", ' + 
				'"pwd":' + '"' + req.param('pwd') + '", ' + 
				'"pending": "true"}';
				
			var find = '{"un":' + '"' + unescape(req.param('un')) + '"}';
	
			model.callDb('sp', '', 'users');
			model.initPendingItem(JSON.parse(find.toString()), JSON.parse(data.toString()), req, res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.activateAccount = function(req, res) {
	try
	{
		var toStr = req.param('to');
	
		if (toStr !== undefined)
		{
			var data = '{"un":' + '"' + unescape(req.param('to')) + '", ' + '"pending": "true"}';
			var upd = '{"un":' + '"' + unescape(req.param('to')) + '", ' + '"pending": "false"}';
	
			model.callDb('sp', '', 'users');
			model.findPendingItem(JSON.parse(data.toString()), JSON.parse(data.toString()), JSON.parse(upd.toString()), req, res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.getUserName = function(req, res) {
	try
	{
		var id = req.param('id');
		
		if (id !== undefined)
		{
			var find = '{"un":' + '"' + unescape(id) + '"}';
			
			model.callDb('sp', '', 'users');
			model.findUSerName(JSON.parse(find.toString()), req, res);
		}
	}
	catch (e) {
		console.log(e);
	}
};

exports.approveUserName = function(req, res) {
	try
	{
		var data = '{"un":' + '"' + unescape(req.param('un')) + '", ' + '"pending": "approvalpending"}';
		var upd = '{"un":' + '"' + unescape(req.param('un')) + '", ' + '"pending": "true"}';
	
		model.callDb('sp', '', 'users');
		model.findPendingApprovalItem(JSON.parse(data.toString()), JSON.parse(data.toString()), JSON.parse(upd.toString()), req, res);
	}
	catch (e) {
		console.log(e);
	}
};

exports.sendActivationEmail = function(req, res) {
	try
	{
		model.sendActivationEmail(req, res);
	}
	catch (e) {
		console.log(e);
	}
};