/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com */

var mongoose = require('mongoose'), 
	application = require('../app.js'),
	crypto = require('../routes/crypto.js'),
	emailserver = require('emailjs');
	
var server  = emailserver.server.connect({
   user: "supplierportal@doksend.com", 
   password: "Sausage5!", 
   host: "smtp.gmail.com", 
   ssl: true
});

var db = null, schema = null, table = null;

var baseEmailUrl = '<a href="http://supplierportal.aws.af.cm';

var mongoose = require('mongoose');
var db = null, schema = null, table = null; 

exports.db_conn = null;

exports.files = [];

exports.getvar = function(req, res) {
	res.send(application.env['mongodb-1.8'][0]['credentials']['hostname']);
};

exports.callDb = function (pDb, pSchema, pTable, env) {
    try
    {
    	//db = mongoose.createConnection('localhost', pDb); // local node
    	db = mongoose.createConnection(application.env['mongodb-1.8'][0]['credentials']['hostname'], pDb); // AppFog
    
		schema = mongoose.Schema(pSchema, { strict: false });
		table = db.model(pTable, schema);
		
		exports.db_conn = mongoose;
	}
	catch (e) {
		console.log(e);
	}
};

// api 
exports.callFind = function (pField, res, req) {	
	try
	{
		table.find(pField, function (err, result) {
			
			res.header('Access-Control-Allow-Origin', "*");
			res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }

  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callUpdate = function (pField, pUpdate, res, req) {
	try
	{
		table.update(pField, pUpdate, function (err, numberAffected, result) {
		
			res.header('Access-Control-Allow-Origin', "*");
			res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); } 
  			else { res.json(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.callFindOneAndUpdateSimple = function(pField, res, req) {
	try
	{
		var collection = new table(pField);
	
		collection.save(function (err, raw) {
			mongoose.disconnect();
		});;
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callFindOneAndUpdate = function (pField, res, req) {	
	try
	{
		var collection = new table(pField);
	
		table.find(pField, function (err, result) {
			
			res.header('Access-Control-Allow-Origin', "*");
			res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); mongoose.disconnect(); }
			if (result.length == 0) {
				collection.save(function (err, raw) {
					if (err) { res.send(500, { error: err }); } 
					else { res.send(200, { result: raw }); }
					
					mongoose.disconnect();
				});
			} else { res.send(200, { result: 'already exists' }); mongoose.disconnect(); }
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.changeField = function (fields, rc) {
	var rcsplit = [];
	
	var result = '', 
		newresult = '',
		oldresult = '',
		rcfields = [];
	
	rcsplit = rc.split('|');
		
	for (var e = 0; e <= rcsplit.length - 1; e++) {
		var rcitem = rcsplit[e];
		
		if (rcitem.indexOf('=') >= 0 && rcitem.indexOf('sb') < 0 && rcitem.indexOf('dc') < 0 &&
			rcitem.indexOf('rc') < 0) {
			rcfields.push(rcitem);
			
			oldresult += rcitem + '|';
		}
	}
	
	for (var i = 0; i <= fields.length - 1; i++) {
		var field = fields[i],
			fn = field.substring(0, field.indexOf('=')),
			fv = field.substring(field.indexOf('=') + 1),
			rcitem = rcfields[i];
		
		if (rcitem.indexOf(fn) >= 0) {
			var newrc = fn + '=' + fv + '|';
			
			newresult += newrc;
		}
	}
	
	result = rc.replace(oldresult, newresult);
	
	return result;
};

exports.submitbatch = function (replaceC, cln, pFind, fields, res) {
	try
	{
		var r = 'collection not updated';
		
		table.find(pFind, function (err, result) 
		{
			if (err) {
				res.send(500, r);
				mongoose.disconnect();
			}
			else {
				
				if (result.length > 0) {
					
					var replaced = '',
						rslt = exports.parseJsonResult(result),
						rc = rslt.strData;
				
					rc = exports.changeField(fields, rc);
					
					if (replaceC) {
						replaced = rc.replace('rc=1', 'rc=0');
					}
					else {
						replaced = rc;
					}
					
					var pFld = '{"cid":' + '"' + cln + '", ' + 
							'"cln":' + '"' + rslt.cln + '"}',
						
						pUpFld = '{"cid":' + '"' + cln + '", ' + 
							'"strData":' + '"' + replaced + '", ' +
							'"cln":' + '"' + rslt.cln + '"}';
							
						pField = JSON.parse(pFld.toString());
						pUpdate = JSON.parse(pUpFld.toString());
						
					table.findOneAndUpdate(pFind, pUpdate, function (err, result) {
						res.header('Access-Control-Allow-Origin', "*");
						res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
						res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
						res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
						
						res.send(200, result);
						mongoose.disconnect();
					});
				}
				else {
					res.send(200, r);
					mongoose.disconnect();
				}
			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.dbFindUpdate = function (pFind, pField, res) {	
	try
	{
		var collection = new table(pField);
	
		table.find(pFind, function (err, result) {
		
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); mongoose.disconnect(); }
			if (result.length == 0) {
				collection.save(function (err, raw) {
					if (err) { res.send(500, { error: err }); } 
					else { res.send(200, { result: raw }); }
					
					mongoose.disconnect();
				});
			} else { res.send(200, { result: 'already exists' }); mongoose.disconnect(); }
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callFindOneAndRemove = function (pField, res) {
	try 
	{
		table.findOneAndRemove(pField, function (err, result) {
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.callRemove = function (pField, res) {
	try
	{
		table.remove(pField, function (err, result) {
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callFindOneAndRemoveSilent = function (pField, res) {
	try {
		table.findOneAndRemove(pField, function () {
			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.extractSubFnStr = function (str) {
	var result = '', start = false, end = false;
	
	try {
		for (var i = 0; i <= str.length; i++) {
			if (str[i] === '/' && start === false && end === false) {
				start = true;
				result += str[i];
			}
			else if (start === true && str[i] === '"') {
				end = true;
				break;
			}
			else if (start === true) {
				result += str[i];
			}
		}
	}
	catch (e) {
		console.log(e);
	}
	
	return result;
};

exports.in_array = function (array, id) {
    for (var i=0; i<array.length; i++) {
    
        if(array[i] === id) {
            return true;
        }
    }
    
    return false;
}

exports.findall = function (pField, res) {
	var fls = [];
	
	try {
		table.find(pField, function (err, result) {
			for (var i = 0; i <= result.length - 1; i++) {
				var parsedJSON = exports.parseJsonResultLong(result, i);
				
				var p = JSON.stringify(parsedJSON);

				var fn = exports.extractSubFnStr(p);
				
				if (exports.in_array(fls, fn) === false) {
					fls.push(fn);
				}
			}
			
			exports.files = fls;
			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.callTableRemoveSimple = function (res) {
	try
	{
		table.remove(function (err, result) {
			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callTableRemove = function (res) {
	try
	{
		table.remove(function (err, result) {
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

/* Start Login / Signup */
// Non Api - internal usage...

exports.sendPassword = function (pwd, req, res) {
	try
	{
		var toStr = req.param('to');
		
		var urlStr = baseEmailUrl + '/login/">Login now</a>'; // AppFog
		//var urlStr = '<a href="http://localhost:3000' + '/login/">Login now</a>';
		
		var txtStr = '<html>Hi, <br /><br />You have requested a password recovery.<br /><br />Your saved password is: ' +
			pwd + '<br /><br />You can use the link below to login to your account:<br /><br />' +
			urlStr + '<br /><br />Enjoy.<br /><br />Kind regards,<br />Supplier Portal</html>';
			
		server.send({
   			text: txtStr,
   			from: 'Supplier Portal <supplierportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'supplierportal@doksend.com',
   			subject: 'Supplier Portal Password Recovery',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			console.log(err || message);
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.sendApprovalPendingEmail = function (req, res) {
	try
	{
		var toStr = req.param('to');
		
		var txtStr = '<html>Hi, <br /><br />Thank you for signing up for the Supplier Portal as a supplier user.<br /><br />Your account is still pending approval by a system admin.<br /><br />' +
			'Once your account is approved, you will be notified immediately.<br /><br />Thank you for your understanding.<br /><br />Kind regards,<br />Supplier Portal</html>';
		
		server.send({
   			text: txtStr,
   			from: 'Supplier Portal <supplierportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'supplierportal@doksend.com',
   			subject: 'Supplier Portal Signup is Pending Approval',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			console.log(err || message);
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.sendActivationEmail = function(req, res) {
	try
	{
		var toStr = req.param('to');
	
		var urlStr = baseEmailUrl + '/activate/' + toStr + '">Activate now</a>'; // AppFog
		//var urlStr = '<a href="http://localhost:3000' + '/activate/' + toStr + '">Activate now</a>';
	
		var txtStr = '<html>Hi, <br /><br />Thank you for signing up for the Supplier Portal.<br /><br />In order to activate your account, please click on the link below:<br /><br />' +
			urlStr + '<br /><br />Enjoy using your new user account.<br /><br />Kind regards,<br />Supplier Portal</html>';
	
		server.send({
   			text: txtStr,
   			from: 'Supplier Portal <supplierportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'supplierportal@doksend.com',
   			subject: 'Supplier Portal Signup Activation',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			console.log(err || message);
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.approveUserName = function(req, res) {
	try
	{
		var toStr = req.param('un');
		
		var urlStr = baseEmailUrl + '/activate/' + toStr + '">Activate now</a>'; // AppFog
		//var urlStr = '<a href="http://localhost:3000' + '/activate/' + toStr + '">Activate now</a>';
		
		var txtStr = '<html>Hi, <br /><br />Thank you for signing up for the Supplier Portal as a supplier.<br /><br />In order to activate your account, please click on the link below:<br /><br />' +
			urlStr + '<br /><br />Enjoy using your new supplier account.<br /><br />Kind regards,<br />Supplier Portal</html>';
	
		server.send({
   			text: txtStr,
   			from: 'Supplier Portal <supplierportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'supplierportal@doksend.com',
   			subject: 'Supplier Portal Signup Activation',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			console.log(err || message);
		});
	}
	catch (e) {
		console.log(e);
	} 
};

exports.sendNotificationEmailAdmin = function(un, adminEmail, req, res) {
	try
	{
		var toStr = adminEmail,
			fn = req.param('fn'),
			ln = req.param('ln'),
			un = req.param('un');
	
		var urlStr = baseEmailUrl + '/approveuser/' + un + '">Approve user</a>'; // AppFog
		//var urlStr = '<a href="http://localhost:3000' + '/approveuser/' + un + '">Approve & configure user</a>';
		
		var txtStr = '<html>Hi, <br /><br />PLEASE DO NOT DELETE THIS EMAIL AND KEEP FOR YOUR RECORDS.<br /><br />This is just to let you know that "' + fn + ' ' + ln + '" (' + un + ') has signed up for the Supplier Portal as a supplier user.<br /><br />In order to approve this account, please click on the link below:<br /><br />' +
			urlStr + '<br /><br />Cheers.<br /><br />Kind regards,<br />Supplier Portal</html>';
			
		server.send({
   			text: txtStr,
   			from: 'Supplier Portal <supplierportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'supplierportal@doksend.com',
   			subject: 'Supplier Portal User Signup Approval',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			console.log(err || message);
		});
		
		var toStr = req.param('to');
	
		var txtStr = '<html>Hi, <br /><br />Thank you for signing up for the Supplier Portal.<br /><br />In order to use your account, a system admin must first approve it.' +
			'<br /><br />You will be notified when your account is ready to be used.<br /><br />Thanks in advance.<br /><br />Kind regards,<br />Supplier Portal</html>';
		
		server.send({
   			text: txtStr,
   			from: 'Supplier Portal <supplierportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'supplierportal@doksend.com',
   			subject: 'Supplier Portal User Signup',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			console.log(err || message);
		});	
	}
	catch (e) {
		console.log(e);
	}
};

exports.initPendingItem = function (pFind, pField, req, res) {
	try
	{
		var collection = new table(pField);
	
		table.find(pFind, function (err, result) {
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); mongoose.disconnect(); }
			if (result.length == 0) {
				collection.save(function (err, raw) {
					if (err) { res.send(500, { error: err }); } 
					else { 
						exports.sendActivationEmail(req, res);
						res.send(200, { result: 'signup OK' }); 
					}
					
					mongoose.disconnect();
				});
			} else { res.send(200, { result: 'already exists' }); mongoose.disconnect(); }
		});
	}
	catch (e) {
		console.log(e);
	}	
};

exports.initUserPendingItem = function (un, adminEmail, pFind, pField, req, res) {
	try
	{
		var collection = new table(pField);
	
		table.find(pFind, function (err, result) {
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
  			if (err) { res.send(500, { error: err }); mongoose.disconnect(); }
			if (result.length == 0) {
				collection.save(function (err, raw) {
					if (err) { res.send(500, { error: err }); } 
					else { 
						exports.sendNotificationEmailAdmin(un, adminEmail, req, res);
						res.send(200, { result: 'signup OK' }); 
					}
					
					mongoose.disconnect();
				});
			} else { res.send(200, { result: 'already exists' }); mongoose.disconnect(); }
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.updateUserSettings = function (pFind, pUpdate, req, res) {
	try
	{
		var r = 'user settings not saved';
		
		table.find(pFind, function (err, result) 
		{
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
			if (err) {
				res.send(500, r);
				mongoose.disconnect();
			}
			else {
				if (result.length > 0) {
					var rslt = exports.parseJsonResult(result),
					
						pFld = '{"fn":' + '"' + rslt.fn + '", ' + 
							'"ln":' + '"' + rslt.ln + '", ' +
							'"un":' + '"' + rslt.un + '", ' + 
							'"pwd":' + '"' + rslt.pwd + '", ' + 
							'"pending": "false"}';
							
						pField = JSON.parse(pFld.toString());
					
					table.update(pField, pUpdate, function (err, numberAffected, result) {
  						if (err) { 
  							res.send(500, r); } 
  						else { 
  							r = 'user settings saved';
  							res.send(200, r);
  						}
  						
  						mongoose.disconnect();
					});
				}
				else {
					res.send(200, r);
					mongoose.disconnect();
				}
			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.findPendingApprovalItem = function (pFind, pField, pUpdate, req, res) {
	try
	{
		var r = 'ServerModule[client.activateAccount]: User: "' + req.param('to') + '" not activated.';
	
		table.find(pFind, function (err, result) 
		{
			if (err) {
				res.redirect('/#/approvalfailed');
				mongoose.disconnect();
			}
			else {
				if (result.length > 0)
				{
					r = 'ServerModule[client.dologin]: Credentials for user: "' + req.param('to') + '" found OK.';
					console.log(r);
				
					// Do activation (remove from the pending tag (set it to false))
					table.update(pField, pUpdate, function (err, numberAffected, result) {
  						if (err) { res.redirect('/#/approvalfailed'); } 
  						else { 
  							exports.approveUserName(req, res);
  							res.redirect('/#/approvalsuccessful'); 
  						}
  						
  						mongoose.disconnect();
					});
				}
				else
				{
					console.log(r);
					res.redirect('/#/approvalusernotfound');
					mongoose.disconnect();
				}
			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

// Find item (user name) for pending user activations
exports.findPendingItem = function (pFind, pField, pUpdate, req, res) {
	try
	{
		var r = 'ServerModule[client.activateAccount]: User: "' + req.param('to') + '" not activated.';
	
		table.find(pFind, function (err, result) 
		{
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
			if (err) {
				console.log(err);
				res.redirect('/#/activationfailed');
				mongoose.disconnect();
			}
			else
			{
				if (result.length > 0)
				{
					r = 'ServerModule[client.dologin]: Credentials for user: "' + req.param('to') + '" found OK.';
					console.log(r);
				
					// Do activation (remove from the pending tag (set it to false))
					table.update(pField, pUpdate, function (err, numberAffected, result) {
  						if (err) { res.redirect('/#/activationfailed'); } 
  						else { 
  							res.redirect('/#/activationsuccessful'); 
  						}
  						
  						mongoose.disconnect();
					});
				}
				else
				{
					console.log(r);
					res.redirect('/#/activationusernotfound');
					mongoose.disconnect();
				}	
			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.parseJsonResult = function (result) {
	var jsonStr = JSON.stringify(result[0]);
  	return eval('(' + jsonStr + ')');
};

exports.parseJsonResultLong = function (result, index) {
	var jsonStr = JSON.stringify(result[index]);
  	return eval('(' + jsonStr + ')');
};

exports.getUserName = function (pFind, req, res) {
	try
	{
		var r = 'ServerModule[client.getUserName]: settings not loaded for user: "' + req.param('un') + '".';
		
		console.log('1');
		table.find(pFind, function (err, result) 
		{
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			console.log('2');
			
			if (err) { 
				console.log('3');
  				res.send(500, { result: err });	
  				mongoose.disconnect();
  				console.log('4');
  			}
  			else {
  				console.log('5');
  				if (result != null && result.length > 0)
  				{
  					console.log('6');
  					var parsedJSON = exports.parseJsonResult(result), fn = parsedJSON.fn, 
  						ln = parsedJSON.ln;
  					
  					console.log('7');
  					
  					res.send(200, fn + ' ' + ln);
  				}
  				else {
  					res.send(200, { result: r });
  				}
  					
  				mongoose.disconnect();
  			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.loadUserSettings = function (pFind, req, res) {
	try
	{
		var r = 'ServerModule[client.loadUserSettings]: settings not loaded for user: "' + req.param('un') + '".';
		
		table.find(pFind, function (err, result) 
		{
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
			if (err) { 
  				res.send(500, { result: err });
  				mongoose.disconnect();	
  			}
  			else {
  				if (result != null && result.length > 0)
  				{
  					var parsedJSON = exports.parseJsonResult(result), fn = parsedJSON.fn, 
  						ln = parsedJSON.ln;
  					
  					res.send(200, fn + '|' + ln);
  				}
  				else {
  					res.send(200, { result: r });
  				}
  				
  				mongoose.disconnect();
  			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.findRecover = function (pFind, req, res) {
	try
	{
		var r = 'ServerModule[client.dorecovery]: recovery not OK for user: "' + req.param('to') + '".';
		
		table.find(pFind, function (err, result) 
		{
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
			if (err) { 
  				res.send(500, { result: err });		
  			}
  			else {
  				if (result != null && result.length > 0)
  				{
  					r = 'ServerModule[client.dorecovery]: recovered OK for user: "' + req.param('to') + '".';
  					var parsedJSON = exports.parseJsonResult(result), pd = parsedJSON.pending, 
  						pwd = parsedJSON.pwd;
  					
  					if (pd == "true") {
  						exports.sendActivationEmail(req, res);
  					}
  					else if (pd == "approvalpending") {
  						exports.sendApprovalPendingEmail(req, res);
  					}
  					else {
  						exports.sendPassword(crypto.rsaDecode([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], pwd), req, res);
  					}
  				}
  				
  				res.send(200, { result: r });
  			}
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.toUpperFirstLetter = function(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.findUSerName = function(pFind, req, res) {
	try
	{
		var r = '';
		
		table.find(pFind, function (err, result) 
		{
			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			
			if (err) { 
  				console.log(err);
  				res.send(500, r);		
  			}
  			else {
  				if (result != null && result.length > 0)
  				{
  					var parsedJSON = exports.parseJsonResult(result);
  					
  					r = exports.toUpperFirstLetter(parsedJSON.fn) + ' ' + 
  						exports.toUpperFirstLetter(parsedJSON.ln);
  				}
  				
  				res.send(200, r );
  			}
  			
  			mongoose.disconnect();
		});
	}
	catch (e)
	{
		console.log(e);
	}
};

// Find item (user name / pwd) for user login
exports.findItem = function (pFind, pwd, req, res) {	
	try
	{
		var r = 'ServerModule[client.dologin]: Credentials for user: "' + req.param('un') + '" not found.';
	
		table.find(pFind, function (err, result) 
		{
  			res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  			
  			if (err) { 
  				console.log(err);
  				res.send(500, { result: err });		
  			}
  			else
  			{ 
  				if (result != null && result.length > 0)
  				{
  					var parsedJSON = exports.parseJsonResult(result);
  					var pd = parsedJSON.pwd;
  				
  					var rp = crypto.rsaDecode([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], pd);
  					var p = crypto.rsaDecode([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], pwd);
  				
  					if ((result.length > 0) && (rp == p))
  						r = 'ServerModule[client.dologin]: Credentials for user: "' + req.param('un') + '" found OK.';
				}
				res.send(200, { result: r });	
  			}
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};
/* End Login / Signup */