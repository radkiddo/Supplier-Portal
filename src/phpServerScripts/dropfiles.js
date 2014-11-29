(function ($) {

	Dropzone.options.myAwesomeDropzone = {
  		init: function() {
  			var filesToRename = [];

    		this.on("addedfile", function(file) { 
    			filesToRename.push(file);
    		});
    		
    		this.on("complete", function(file) {
    			var myDropzone = Dropzone.forElement("#myAwesomeDropzone");
    			
				var timer = $.timer(function() {
					
					if (filesToRename !== null && filesToRename !== undefined) {
						myDropzone.removeAllFiles();
					}
					
					timer.stop();
				});
					
				timer.set({ time : 3500, autostart : true });
			});
  		}
	};

})(window.jQuery);