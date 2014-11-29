(function ($) {

	var found = false;

	function includes(script) {
    	$.ajax({
        	url: script,
        	dataType: 'script',
        	async: false, 
        	success: function () {
        		found = true;
        	},
        	error: function () {
       	 	}
    	});
    }

	runValidations = function () {
		var socket = new easyXDM.Socket({
    		onMessage: function(message, origin){
    			if (message !== undefined && message.indexOf("|") >= 0) {
    				var dmn = 'http://www.doksend.com/supplierportal/validations/',
    					vars = message.split('|'),
    					fieldId = vars[0],
    					fieldValue = vars[1],
    					app = vars[2],
    					domain = vars[3];
    					
					includes(dmn + app.toLowerCase() + '.js');
					
					if (found) {
						var res = runFieldValidation(app, domain, fieldId, fieldValue);
					
						socket.postMessage(res);
					}
    			}
    		}
		});
	};
	
	runValidations();

})(window.jQuery);