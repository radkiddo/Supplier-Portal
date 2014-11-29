/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com */

var fs = require('fs'),
	http = require('http'),
	client = require('./client.js');

readFile = function(fn) {
	try
	{
		return fs.readFile(__dirname + fn, 'utf8', function(err, text){
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.encrypt = function(req, res) {
	try
	{
		var txt = req.param('txt');	
		var result = client.rsaEncrypt([17], [148299941,57683965,5687041], txt);
	
		console.log('ServerModule[webpages.kChUTqbUjO2DtKgXLG4LIjzzLd]: ' + result);
		res.send(result);
	}
	catch (e) {
		console.log(e);
	}
};

exports.decrypt = function(req, res) {
	try
	{
		var txt = req.param('txt');
		var result = client.rsaDecrypt([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], txt);
	
		console.log('ServerModule[webpages.k4e79e72Fe9ZWgcCaexsd7azLd]: ' + result);
		res.send(result);
	}
	catch (e) {
		console.log(e);
	}
};

exports.home = function(req, res) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
			
    res.sendfile(__dirname + '/views/home.html');
};

exports.dologin = function(req, res) {
	client.dologin(req, res);
};

exports.activateAccount = function(req, res) {
	client.activateAccount(req, res);
};

exports.sendActivationEmail = function(req, res) {
	client.sendActivationEmail(req, res);
};

exports.dosignup = function(req, res) {
	client.dosignup(req, res);
};

exports.dousersignup = function(req, res) {
	client.dousersignup(req, res);
};

exports.dorecover = function(req, res) {
	client.dorecover(req, res);
};

exports.loadusersettings = function(req, res) {
	client.loadusersettings(req, res);
};

exports.dousersettings = function(req, res) {
	client.dousersettings(req, res);
};

exports.writeHead = function(req, res) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
};

exports.gjson = function(req, res, hostp, pathp) {
	var options = {
  		host: hostp,
  		path: pathp
	};
	
	http.get(options, function(result){
    	var data = '';

    	result.on('data', function (chunk){
        	data += chunk;
    	});

    	result.on('end',function(){
        	var obj = JSON.stringify(JSON.parse(data));
        	
        	exports.writeHead(req, res);
        	res.send(200, obj);
    	});
	});
};

exports.approveUserName = function (req, res) {
	client.approveUserName(req, res);
};

exports.getUserName = function(req, res) {
	client.getUserName(req, res);
};

exports.adminforusers = function(req, res) {
	var options = {
  		host: 'www.doksend.com',
  		//host: 'supplierportal.aws.af.cm',
  		path: '/supplierportal/admins.json'
  		//path: '/json/admins.json'
	};
	
	http.get(options, function(result){
    	var data = '';

    	result.on('data', function (chunk){
        	data += chunk;
    	});

    	result.on('end',function(){
        	var obj = JSON.stringify(JSON.parse(data));
        	
        	if (obj.indexOf(',') >= 0) {
        		var arr = obj.split(',');
        		
        		if (arr !== undefined && arr.length > 0) {
        			var adminEmail = req.param('un');
        			adminEmail = adminEmail.substring(adminEmail.indexOf('@') + 1);
        			
        			var result = '';
        			
        			for (var i = 0; i <= arr.length - 1; i ++) {
        				var line = arr[i];
        				
        				if (line.toLowerCase().indexOf(adminEmail.toLowerCase()) >= 0) {
        					result = line.substring(line.indexOf(':') + 1).
        						replace('"','').replace('"','').replace('}','').replace(',','').
        						replace('{','');
        						
        					break;
        				}
        			}
        			
        			exports.writeHead(req, res);
        			res.send(200, result);
        		}
        	}
        	else {
        		var adminEmail = req.param('un');
        		adminEmail = adminEmail.substring(adminEmail.indexOf('@') + 1);
        		
        		var line = obj, result = '';
        		
        		if (line.toLowerCase().indexOf(adminEmail.toLowerCase()) >= 0) {
        			result = line.substring(line.indexOf(':') + 1).
        				replace('"','').replace('"','').replace('}','').replace(',','').
        				replace('{','');
        		}
        		
        		exports.writeHead(req, res);
        		res.send(200, result);
        	}
    	});
	});
};

exports.alist = function(req, res) {
	exports.gjson(req, res, 'www.doksend.com', '/supplierportal/approved.json');
	//exports.gjson(req, res, 'supplierportal.aws.af.cm', '/json/approved.json');
};

exports.adminslist = function(req, res) {
	exports.gjson(req, res, 'www.doksend.com', '/supplierportal/admins.json');
	//exports.gjson(req, res, 'supplierportal.aws.af.cm', '/json/admins.json');
};

exports.registeredDomains = function(req, res) {
	exports.gjson(req, res, 'www.doksend.com', '/supplierportal/domains.json');
	//exports.gjson(req, res, 'supplierportal.aws.af.cm', '/json/domains.json');
};
