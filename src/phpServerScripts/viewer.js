(function ($) {

	(function (gb, $, undefined) {
		
		gb.gotoPage = function () {
			var socket = new easyXDM.Socket({
    			onMessage: function(message, origin){
    				if (message !== undefined && message.indexOf("|") >= 0) {
						
    				}
    			}
			});
		};
		
	}(window.gb = window.gb || {}, window.jQuery));
	
	gb.gotoPage();

})(window.jQuery);