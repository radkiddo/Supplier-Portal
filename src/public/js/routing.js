/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com */

(function($){
	
	var rt = window.location.hash.slice(2);

	hideAll = function ()
	{
		$('#page-index').hide();
		$('#logindiv').hide();
		$('#aboutdiv').hide();
		$('#featuresdiv').hide();
		$('#faqsdiv').hide();
		$('#signupdiv').hide();
		$('#howdiv').hide();
	};
	
	route2Page = function (rt) {
		if (rt == '' && window.location.href.indexOf('#/') < 0) 
		{	
        	window.location.href += '#/';
        		
			homePage();
		}
		else if (rt == 'about') aboutPage();
		else if (rt == 'features') featuresPage();
		else if (rt == 'faqs') faqsPage();
		else if (rt == 'login') loginPage();
		else if (rt == 'signup') signupPage();
		else if (rt == 'how') howPage();
	};

	var aboutPage = function () {
			hideAll(); 
			$('#aboutdiv').show(); 
		},
        
        featuresPage = function () {
        	hideAll();
        	$('#featuresdiv').show(); 
        },
        
        faqsPage = function () {
        	hideAll(); 
        	$('#faqsdiv').show();
        },
        
        loginPage = function () {
			hideAll();
        	$('#logindiv').show();
        },
        
        signupPage = function () {
        	hideAll();
        	$('#signupdiv').show(); 
        },
        
        homePage = function () { 
        	hideAll();
        	$('#page-index').show();
        },
        
        howPage = function() { 
        	hideAll(); 
        	$('#howdiv').show();
        };    
        
    var routes = {
        '/': homePage,
        '/about': aboutPage,
        '/features': featuresPage,
        '/faqs': faqsPage,
        '/login': loginPage,
        '/signup': signupPage,
        '/how': howPage,
      };

    var router = Router(routes);
    router.init();
      
    route2Page(rt);
	
})(window.jQuery);