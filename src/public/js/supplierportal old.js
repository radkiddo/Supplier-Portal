/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com */
(function ($) {

    (function (gb, $, undefined) {

        gb.dec = function (txt) {
            var result = '';

            $.ajax({
                url: '/k4e79e72Fe9ZWgcCaexsd7azLd',
                type: 'POST',
                cache: false,
                data: 'txt=' + txt,
                success: function (data) {
                    result = data;
                },
                error: function (jqXHR, textStatus, err) {}
            });

            return result;
        };

        gb.validateFreeEmail = function (emailAddress) {
            var pattern = new RegExp(/(aol|googlemail|msn|live|gmail|yahoo|hotmail)/);

            return pattern.test(emailAddress);
        };

        gb.validateEmail = function (emailAddress) {
            var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);

            return pattern.test(emailAddress);
        };

        gb.checkStrength = function (password) {
            var strength = 0, returnValue = '';

            if (password.length < 6) {
                $('#result').removeClass();
                $('#result').addClass('short');
                returnValue = 'Too short';
            }

            if (password.length > 7) {
                strength += 1;
            }
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                strength += 1;
            }
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                strength += 1;
            }
            if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1;
            }
            if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1;
            }

            if (strength < 2) {
                $('#result').removeClass();
                $('#result').addClass('weak');
                returnValue = 'Weak';
            } else if (strength === 2) {
                $('#result').removeClass();
                $('#result').addClass('good');
                returnValue = 'Good';
            } else {
                $('#result').removeClass();
                $('#result').addClass('strong');
                returnValue = 'Strong';
            }
            
            return returnValue;
        };

    }(window.gb = window.gb || {}, window.jQuery));

    (function (gb, signup, $, undefined) {

        var signedAlready = false;

        signup.cStrengthSignupPwdStrength = function (txt) {
            var strength = gb.checkStrength(txt);

            if (strength.indexOf('Weak') >= 0) {
                $('#signupPwdStrength').removeClass('smallText').removeClass('smallTooShort').removeClass('smallGood').removeClass('smallStrong').addClass('smallWeek');
            } else if (strength.indexOf('Too short') >= 0) {
                $('#signupPwdStrength').removeClass('smallText').removeClass('smallWeek').removeClass('smallGood').removeClass('smallStrong').addClass('smallTooShort');
            } else if (strength.indexOf('Good') >= 0) {
                $('#signupPwdStrength').removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallStrong').addClass('smallGood');
            } else if (strength.indexOf('Strong') >= 0) {
                $('#signupPwdStrength').removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallGood').addClass('smallStrong');
            }

            $('#signupPwdStrength').text(strength);
        };

        signup.cStrengthSignupPwdRetypeStrength = function (txt) {
            var strength = gb.checkStrength(txt);

            if (strength.indexOf('Weak') >= 0) {
                $('#signupPwdRetypeStrength').removeClass('smallText').removeClass('smallTooShort').removeClass('smallGood').removeClass('smallStrong').addClass('smallWeek');
            } else if (strength.indexOf('Too short') >= 0) {
                $('#signupPwdRetypeStrength').removeClass('smallText').removeClass('smallWeek').removeClass('smallGood').removeClass('smallStrong').addClass('smallTooShort');
            } else if (strength.indexOf('Good') >= 0) {
                $('#signupPwdRetypeStrength').removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallStrong').addClass('smallGood');
            } else if (strength.indexOf('Strong') >= 0) {
                $('#signupPwdRetypeStrength').removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallGood').addClass('smallStrong');
            }

            $('#signupPwdRetypeStrength').text(strength);
        };

        signup.hideSignupUserNotFoundOnKey = function () {
            if ($('#signupUserExistsDiv').is(':visible')) {
                $('#signupUserExistsDiv').hide();
            }
        };

        signup.hideSignupUserExceptionOnKey = function () {
            if ($('#signupUserException').is(':visible')) {
                $('#signupUserException').hide();
            }
        };

        signup.hideAllSignupMesssages = function () {
            signup.hideSignupUserNotFoundOnKey();
            signup.hideSignupUserExceptionOnKey();
        };

        $('#signupPassword').keyup(function (e) {
            if (e.which !== 13) {
                signup.hideAllSignupMesssages();
            }

            signup.ShowOrHideBth();
            signup.ShowHidePwdNoMatch();

            if ($('#signupPassword').val() !== '') {
                signup.cStrengthSignupPwdStrength($('#signupPassword').val());
            } else {
                $('#signupPwdStrength').text('');
            }
        });

        $('#signupPasswordRetyped').keyup(function (e) {
            if (e.which !== 13) {
                signup.hideAllSignupMesssages();
            }

            signup.ShowOrHideBth();
            signup.ShowHidePwdNoMatch();

            if ($('#signupPasswordRetyped').val() !== '') {
                signup.cStrengthSignupPwdRetypeStrength($('#signupPasswordRetyped').val());
            } else {
                $('#signupPwdRetypeStrength').text('');
            }
        });

        $('#signupPassword').focusout(function (e) {
            if ($('#signupPassword').val() !== '') {
                signup.cStrengthSignupPwdStrength($('#signupPassword').val());
            } else {
                $('#signupPwdStrength').text('');
            }
        });

        $('#signupPasswordRetyped').focusout(function (e) {
            if ($('#signupPasswordRetyped').val() !== '') {
                signup.cStrengthSignupPwdRetypeStrength($('#signupPasswordRetyped').val());
            } else {
                $('#signupPwdRetypeStrength').text('');
            }
        });

        signup.clearFields = function () {
            $('#signupfirstName').val('');
            $('#signuplastName').val('');
            $('#signupUserName').val('');
            $('#signupPassword').val('');
            $('#signupPasswordRetyped').val('');
        };

        signup.initSignupDiv = function () {
            signup.hideAllSignupMesssages();
            signup.clearFields();
            signup.ClearUserAndPwds();

            $('#signupfirstName').focus();
        };

        $('#signupfirstName').keypress(function (e) {
            if ((e.which === 13) && ($('#signupfirstName').val() !== '')) {
                $('#signuplastName').focus();
            }
        });

        $('#signupfirstName').keyup(function (e) {
            if (e.which !== 13) {
                signup.hideAllSignupMesssages();
            }

            signup.ShowOrHideBth();
        });

        $('#signuplastName').keypress(function (e) {
            if ((e.which === 13) && ($('#signuplastName').val() !== '')) {
                $('#signupUserName').focus();
            }
        });

        $('#signuplastName').keyup(function (e) {
            if (e.which !== 13) {
                signup.hideAllSignupMesssages();
            }

            signup.ShowOrHideBth();
        });

        signup.ShowValidEmailMsg = function () {
            $('#signupEmailValid').removeClass('smallWeek').addClass('smallStrong');
            $('#signupEmailValid').text('Valid email syntax');
        };

        signup.ShowInvalidEmailMsg = function () {
            $('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            $('#signupEmailValid').text('Invalid email syntax');
        };

        signup.ShowInvalidFreeMsg = function () {
            $('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            $('#signupEmailValid').text('Free email accounts are not allowed, sorry');
        };

        $('#signupUserName').keypress(function (e) {
            if ((e.which === 13) && ($('#signupUserName').val() !== '')) {
                $('#signupPassword').focus();
            }
        });

        signup.ShowOrHideEmailMsg = function () {
            if ($('#signupUserName').val() !== '') {
                if (signup.ValidEmail()) {
                    signup.ShowValidEmailMsg();
                } else {
                    signup.ShowInvalidEmailMsg();
                }

                if (!signup.ValidFreeMail()) {
                    signup.ShowInvalidFreeMsg();
                }
            } else {
                $('#signupEmailValid').text('');
            }
        };

        $('#signupUserName').keyup(function (e) {
            if (e.which !== 13) {
                signup.hideAllSignupMesssages();
            }

            signup.ShowOrHideEmailMsg();
            signup.ShowOrHideBth();
        });

        $('#signupUserName').focusout(function (e) {
            signup.ShowOrHideEmailMsg();

            var str = $('#signupUserName').val();
            $('#signupUserName').val(str.toLowerCase());
        });

        $('#signupPassword').keypress(function (e) {
            if ((e.which === 13) && ($('#signupPassword').val() !== '')) {
                $('#signupPasswordRetyped').focus();
            }
        });

        signup.NotEmpty = function () {
            return (($('#signupfirstName').val() !== '') && ($('#signupUserName').val() !== '') && ($('#signuplastName').val() !== '') && ($('#signupPassword').val() !== '') && ($('#signupPasswordRetyped').val() !== '')) ? true : false;
        };

        signup.ShowSignUpBtn = function () {
            $('#signupButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        };

        signup.HideSignUpBtn = function () {
            $('#signupButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        };

        signup.ShowHidePwdNoMatch = function () {
            if (($('#signupPassword').val() === '') && ($('#signupPasswordRetyped').val() === '')) {
                $('#signupPwdNoMatch').text('');
            } else if (signup.PwdNoMatch()) {
                $('#signupPwdNoMatch').text('Passwords match');
                $('#signupPwdNoMatch').removeClass('smallText').removeClass('smallWeek').addClass('smallStrong');
            } else {
                $('#signupPwdNoMatch').text('Passwords do not match');
                $('#signupPwdNoMatch').removeClass('smallText').removeClass('smallStrong').addClass('smallWeek');
            }
        };

        signup.PwdNoMatch = function () {
            return ($('#signupPassword').val() === $('#signupPasswordRetyped').val()) ? true : false;
        };

        signup.ValidFreeMail = function () {
            return (!gb.validateFreeEmail($('#signupUserName').val()));
        };

        signup.ValidEmail = function () {
            return (gb.validateEmail($('#signupUserName').val()));
        };

        signup.ShowOrHideBth = function () {
            if ((signup.NotEmpty()) && (signup.PwdNoMatch()) && (signup.ValidFreeMail()) && (signup.ValidEmail())) {
                signup.ShowSignUpBtn();
            } else {
                signup.HideSignUpBtn();
            }
        };

        $('#signupPasswordRetyped').keypress(function (e) {
            if ((e.which === 13) && (signup.NotEmpty())) {
                $('#signupButtonEnabled').trigger('click');
            }
        });

        signup.ClearPwds = function () {
            $('#signupPassword').val('');
            $('#signupPasswordRetyped').val('');

            $('#signupPwdStrength').text('');
            $('#signupPwdRetypeStrength').text('');
            $('#signupPwdNoMatch').text('');
        };

        signup.ClearUserAndPwds = function () {
            signup.ClearPwds();

            $('#signupUserName').val('');
            $('#signupEmailValid').text('');
        };

        signup.unhandledSignupException = function () {
            signedAlready = false;

            $('#signupUserException').show().delay(10500).fadeOut('slow', function () {});

            signup.ClearUserAndPwds();
            signup.HideSignUpBtn();

            $('#signupfirstName').focus();
        };

        signup.SignupActivation = function () {
            signedAlready = false;

            signup.initSignupDiv();
            signup.HideSignUpBtn();

            window.location.href = '#/signupactivation';
        };

        signup.SignupFailedMsg = function () {
            signedAlready = false;

            $('#signupUserExistsDiv').show().delay(10500).fadeOut('slow', function () {});

            signup.ClearUserAndPwds();
            signup.HideSignUpBtn();

            $('#signupfirstName').focus();
        };

        signup.signupBtnClick = function () {
            if ((signup.NotEmpty()) && (signup.PwdNoMatch()) && (signup.ValidFreeMail()) && (signup.ValidEmail()) && (!signedAlready)) {
                signedAlready = true;

                var fn = $('#signupfirstName').val(),
                    ln = $('#signuplastName').val(),
                    un = $('#signupUserName').val(),
                    pw = $('#signupPassword').val();

                $.ajax({
                    url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    type: 'POST',
                    cache: false,
                    data: 'txt=' + escape(pw),
                    success: function (data) {

                        var pd = data,
                            dt = 'fn=' + escape(fn) + '&ln=' + escape(ln) + '&un=' + escape(un) + '&pwd=' + escape(pd) + '&to=' + escape(un);

                        $.ajax({
                            url: '/signup/do',
                            type: 'POST',
                            cache: false,
                            data: dt,
                            success: function (data) {
                                var res = JSON.stringify(data);

                                if (res.indexOf('signup OK') >= 0) { signup.SignupActivation(); 
                                } else if (res.indexOf('already exists') >= 0) { signup.SignupFailedMsg(); 
                                } else { signup.unhandledSignupException(); 
                                }
                            },
                            error: function (jqXHR, textStatus, err) {
                                signup.unhandledSignupException();
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, err) {
                        signup.unhandledSignupException();
                    }
                });
            }

            return false;
        };

        $('#signupButtonEnabled').click(function () {
            signup.signupBtnClick();
            return false;
        });

    }(window.gb, window.signup = window.signup || {}, window.jQuery));

    (function (logout, $, undefined) {

        $('#logoutButtonEnabled').click(function () {
            var user = $.cookie('splgckie');

            if (user !== null) {
                $.removeCookie('splgckie', user, {
                    expires: 1,
                    path: '/'
                });
            }

            window.location.href = '#/login';

            return false;
        });

    }(window.logout = window.logout || {}, window.jQuery));

    (function (login, $, undefined) {

        var splgrm = null;

        login.showLoginButton = function () {
            $('#loginButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        };

        login.hideLoginButton = function () {
            $('#loginButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        };

        login.hideLoginMessages = function () {
            $('#loginUserNotFoundDiv').hide();
            $('#loginUserException').hide();
        };

        login.hideLoginUserNotFoundOnKey = function () {
            if ($('#loginUserNotFoundDiv').is(':visible')) {
                $('#loginUserNotFoundDiv').hide();
            }
        };

        login.hideLoginUserExceptionOnKey = function () {
            if ($('#loginUserException').is(':visible')) {
                $('#loginUserException').hide();
            }
        };

        login.hideAllLoginMesssages = function () {
            login.hideLoginUserNotFoundOnKey();
            login.hideLoginUserExceptionOnKey();
        };

        login.enableControlsByDiv = function () {
            if ($('#logindiv').is(':visible')) {
                login.hideLoginButton();
                login.hideLoginMessages();
            }
        };

        login.clearLoginFields = function () {
            if (!$('#LoginRememberMe').attr('checked')) {
                $('#loginUserName').val('');
            }
            $('#loginPassword').val('');
        };

        login.userNotFound = function () {
            $('#loginUserNotFoundDiv').show().delay(10500).fadeOut('slow', function () {});

            login.clearLoginFields();
            login.hideLoginButton();

            if (!$('#LoginRememberMe').attr('checked')) {
                login.showUncheckedRememberMe();
            } else {
                login.showCheckedRememberMe();
            }

            $('#loginUserName').focus();
        };

        login.unhandledLoginException = function () {
            $('#loginUserException').show().delay(10500).fadeOut('slow', function () {});

            login.clearLoginFields();
            login.hideLoginButton();

            if (!$('#LoginRememberMe').attr('checked')) {
                login.showUncheckedRememberMe();
            } else {
                login.showCheckedRememberMe();
            }

            $('#loginUserName').focus();
        };

        login.showUncheckedRememberMe = function () {
            $('#LoginRememberMe').removeAttr('checked');
        };

        login.showCheckedRememberMe = function () {
            $('#LoginRememberMe').attr('checked', '');
        };

        login.initCheckBoxes = function () {
            login.showUncheckedRememberMe();
        };

        login.get_splgrm = function () {
            login.showCheckedRememberMe();
            $('#loginUserName').val(splgrm);
        };

        login.getCheckboxesStatus = function () {
            splgrm = $.cookie('splgrm');

            if (splgrm === null) {
                login.showUncheckedRememberMe();
            } else {
                login.showCheckedRememberMe();
            }
        };

        login.initLoginDiv = function () {
            login.getCheckboxesStatus();

            login.initCheckBoxes();
            login.clearLoginFields();
            login.hideLoginButton();
            login.hideLoginUserNotFoundOnKey();
            login.hideLoginUserExceptionOnKey();

            if (splgrm !== null) {
                login.get_splgrm();
            }

            $('#loginUserName').focus();
        };

        $('#loginUserName').focusout(function (e) {
            var str = $('#loginUserName').val();
            $('#loginUserName').val(str.toLowerCase());
        });

        $('#loginUserName').keypress(function (e) {
            if ((e.which === 13) && ($('#loginUserName').val() !== '')) {
                $('#loginPassword').focus();
            }
        });

        $('#loginPassword').keypress(function (e) {
            if ((e.which === 13) && ($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                $('#loginButtonEnabled').trigger('click');
            }
        });

        $('#loginUserName').keyup(function (e) {
            if (e.which !== 13) {
                login.hideAllLoginMesssages();
            }

            if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                login.showLoginButton();
            } else {
                login.hideLoginButton();
            }
        });

        $('#loginPassword').keyup(function (e) {
            if (e.which !== 13) {
                login.hideAllLoginMesssages();
            }

            if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                login.showLoginButton();
            } else {
                login.hideLoginButton();
            }
        });

        login.createRememberMe = function () {
            $.cookie('splgrm', $('#loginUserName').val(), {
                expires: 30,
                path: '/'
            });
        };

        login.removeRememberMe = function () {
            $.removeCookie('splgrm', $('#loginUserName').val(), {
                expires: 30,
                path: '/'
            });
        };

        login.LoggedIn = function (user) {
            login.clearLoginFields();
            login.hideLoginButton();

            login.loginCkie(user);

            window.location.href = '#/portal';
        };

        login.loginCkie = function (user) {
            $.cookie('splgckie', user, {
                expires: 1,
                path: '/'
            });
        };

        login.createCkies = function () {
            if ($('#LoginRememberMe').attr('checked')) {
                login.createRememberMe();
            } else if (!$('#LoginRememberMe').attr('checked')) {
                login.removeRememberMe();
            }
        };

        login.NotRemembering = function () {
            if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                var txt = $('#loginPassword').val();

                $.ajax({
                    url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    type: 'POST',
                    cache: false,
                    data: 'txt=' + escape(txt),
                    success: function (data) {
                        var pd = data,
                            us = $('#loginUserName').val();

                        login.createCkies();

                        $.ajax({
                            url: '/login/do',
                            type: 'POST',
                            cache: false,
                            data: 'un=' + escape(us) + '&pwd=' + escape(pd),
                            success: function (data) {
                                var res = JSON.stringify(data);

                                // User found and login...
                                if (res.indexOf('found OK') >= 0) {
                                    login.LoggedIn(us);
                                } else // User not found...
                                {
                                    login.userNotFound();
                                }
                            },
                            error: function (jqXHR, textStatus, err) {
                                login.unhandledLoginException();
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, err) {
                        login.unhandledLoginException();
                    }
                });
            }

            return false;
        };

        login.loginBtnClick = function () {
            login.NotRemembering();

            return false;
        };

        $('#loginButtonEnabled').click(function () {
            login.loginBtnClick();
            return false;
        });

    }(window.login = window.login || {}, window.jQuery));
    
    (function(carousels, $, undefined) {
	
		
    
	}(window.carousels = window.carousels || {}, window.jQuery));

    (function (carousels, login, signup, routing, $, undefined) {

        var rt = window.location.hash.slice(2);

        routing.menuMain = function () {
            $('#MenuMainDiv').show();
            $('#MenuPortalDiv').hide();
            $('#MenuLogoutDiv').hide();
        };

        routing.menuPortal = function () {
            $('#MenuMainDiv').hide();
            $('#MenuPortalDiv').show();
            $('#MenuLogoutDiv').hide();
        };

        routing.menuLogout = function () {
            $('#MenuMainDiv').hide();
            $('#MenuPortalDiv').hide();
            $('#MenuLogoutDiv').show();
        };

        routing.hideAll = function () {
            $('#page-index').hide();
            $('#logindiv').hide();
            $('#logoutdiv').hide();
            $('#aboutdiv').hide();
            $('#featuresdiv').hide();
            $('#faqsdiv').hide();
            $('#signupdiv').hide();
            $('#howdiv').hide();
            $('#portaldiv').hide();
            $('#page404div').hide();
            $('#activationFailedDiv').hide();
            $('#alreadyActivatedDiv').hide();
            $('#activationSuccessfulDiv').hide();
            $('#signupActivationDiv').hide();
        };

        routing.notFound = function (rt) {
            if (routing.isLoggedIn()) {
                window.location.href = '#/portal';
            } else {
                window.location.href = '#/';
            }
        };

        routing.route2Page = function (rt) {
            if (rt === '' && window.location.href.indexOf('#/') < 0) {
                window.location.href += '#/';

                routing.homePage();
            } else if (rt === 'about') {
                routing.aboutPage();
            } else if (rt === 'features') {
                routing.featuresPage();
            } else if (rt === 'faqs') {
                routing.faqsPage();
            } else if (rt === 'login') {
                routing.loginPage();
            } else if (rt === 'signup') {
                routing.signupPage();
            } else if (rt === 'how') {
                routing.howPage();
            } else if (rt === 'portal') {          
            	routing.portalPage();
            } else if (rt === 'logout') {
                routing.logoutPage();
            } else if (rt === '404') {
                routing.page404();
            } else if (rt === 'activationfailed') {
                routing.activationFailedPage();
            } else if (rt === 'activationusernotfound') {
                routing.alreadyActivated();
            } else if (rt === 'activationsuccessful') {
                routing.activationSuccessful();
            } else if (rt === 'signupactivation') {
                routing.signupActivation();
            }
        };

        routing.aboutPage = function () {
            routing.menuMain();
            routing.hideAll();
            $('#aboutdiv').show();
        };

        routing.welcome = function () {
            $('#portalSmall').text($.cookie('splgckie'));
        };

        routing.portalPage = function () {
            if (routing.isLoggedIn()) {
                routing.welcome();
                routing.menuPortal();
                routing.hideAll();
                $('#portaldiv').show();
            } else {
                window.location.href = '#/login';
            }
        };

        routing.featuresPage = function () {
            routing.menuMain();
            routing.hideAll();
            $('#featuresdiv').show();
        };

        routing.faqsPage = function () {
            routing.menuMain();
            routing.hideAll();
            $('#faqsdiv').show();
        };

        routing.isLoggedIn = function () {
            return ($.cookie('splgckie')) ? true : false;
        };

        routing.loginPage = function () {
            if (routing.isLoggedIn()) {
                window.location.href = '#/portal';
            } else {
                routing.menuMain();
                routing.hideAll();
                $('#logindiv').show();

                login.initLoginDiv();
            }
        };

        routing.logoutPage = function () {
            if (routing.isLoggedIn()) {
                routing.menuLogout();
                routing.hideAll();
                $('#logoutdiv').show();
            } else {
                window.location.href = '#/login';
            }
        };

        routing.signupPage = function () {
            routing.menuMain();
            routing.hideAll();
            $('#signupdiv').show();

            signup.initSignupDiv();
        };

        routing.homePage = function () {
            if (routing.isLoggedIn()) {
                window.location.href = '#/portal';
            } else {
                routing.menuMain();
                routing.hideAll();
                $('#page-index').show();
            }
        };

        routing.howPage = function () {
            routing.menuMain();
            routing.hideAll();
            $('#howdiv').show();
        };

        routing.page404 = function () {
            routing.menuMain();
            routing.hideAll();
            $('#page404div').show();
        };

        routing.render404 = function () {
            window.location.href = '#/404';
        };

        routing.activationFailedPage = function () {
            routing.menuMain();
            routing.hideAll();
            $('#activationFailedDiv').show();
        };

        routing.alreadyActivated = function () {
            routing.menuMain();
            routing.hideAll();
            $('#alreadyActivatedDiv').show();
        };

        routing.activationSuccessful = function () {
            routing.menuMain();
            routing.hideAll();
            $('#activationSuccessfulDiv').show();
        };

        routing.signupActivation = function () {
            routing.menuMain();
            routing.hideAll();
            $('#signupActivationDiv').show();
        };

        var routes = {
            '/': routing.homePage,
            '/about': routing.aboutPage,
            '/features': routing.eaturesPage,
            '/faqs': routing.faqsPage,
            '/login': routing.loginPage,
            '/signup': routing.signupPage,
            '/how': routing.howPage,
            '/portal': routing.portalPage,
            '/logout': routing.logoutPage,
            '/404': routing.page404,
            '/activationfailed': routing.activationFailedPage,
            '/activationusernotfound': routing.alreadyActivated,
            '/activationsuccessful': routing.activationSuccessful,
            '/signupactivation': routing.signupActivation
        };

        routing.start = function () {
            var router = new Router(routes).configure({
                notfound: routing.render404
            });
            router.init();

            routing.route2Page(rt);
        };

    }(window.carousels, window.login, window.signup, window.routing = window.routing || {}, window.jQuery));

    routing.start();
    login.initLoginDiv();
    signup.initSignupDiv();

})(window.jQuery);