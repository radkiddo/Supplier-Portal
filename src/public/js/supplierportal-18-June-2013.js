/* Supplier Portal for eFLOW Invoice - Eduardo Freitas - 2013 - radkiddo@gmail.com */
(function ($) {

    (function (gb, $, undefined) {
    
    	gb.doReject = function () {
    		$.reject({  
        		reject: { 
        			msie5: true,
        			msie6: true,
        			msie7: true,
        			msie8: true,
        			konqueror: true,
        			opera7: true, 
        			opera8 : true,
        			opera9 : true,
        			safari2 : true,
        			safari3 : true,
        			firefox1 : true, 
        			firefox2 : true,
        			unknown : false,
        			win : false,
        			mac : false, 
        			iphone : false,
        			linux : false, 
        			solaris : true
        		}, 
        		beforeReject: function() {  
            		if ($.os.name === 'iphone' || $.os.name === 'ipad' || $.os.name === 'unknown') {  
                		this.reject = { all : false };
            		}  
        		},
        		close: false, 
        		paragraph1: 'You will not be able to close this window.',  
        		paragraph2: 'To exit, you must ' +  
        		'<a href="javascript:window.location=window.location.pathname;">refresh the page</a>' + ' or upgrade your browser.' 
    		});  
    	
    		return false;  
    	};
    	
    	gb.reverse = function (s) {
  			var o = '';
  			
  			for (var i = s.length - 1; i >= 0; i--) {
    			o += s[i];
  			}
  			
  			return o;
		};
		
		gb.capitalize = function (user) {
			var before = user.substring(0, user.indexOf("@")),
				after = user.substring(user.indexOf("@") + 1);
				tmp = user;
        			
        	if (before.indexOf(".") >= 0) {
        		before = before.replace('.', ' ');
        	}
        			
        	var tmp = before.toLowerCase().replace( /(^| )(\w)/g, function(x){return x.toUpperCase();} ) + ' (' + after + ')';
        	
        	return tmp;
		};
    
    	gb.replaceAll = function (str, token, newtoken) {
    		while (str.indexOf(token) != -1) {
        		str = str.replace(token, newtoken);
    		}
    		return str;
		};
		
		gb.cleanField = function (str) {
			str = gb.replaceAll(str, '"', '');
			str = gb.replaceAll(str, '\\', '');
			str = gb.replaceAll(str, '/', '');
			
			return str;
		};
		
		gb.showHideEmailMsg = function (ve, vfe, obj) {
			if (!ve) {
            	$(obj).removeClass('smallStrong').addClass('smallWeek');
            	$(obj).text('Invalid email syntax');
            }
            else if (!vfe) {
            	$(obj).removeClass('smallStrong').addClass('smallWeek');
            	$(obj).text('Free email accounts are not allowed, sorry');
            }
            else {
            	$(obj).removeClass('smallWeek').addClass('smallStrong');
            	$(obj).text('Valid email syntax');
            }
        };
    
    	gb.cStrengthPwdStrength = function (txt, obj) {
            var strength = gb.checkStrength(txt);

            if (strength.indexOf('Weak') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallTooShort').removeClass('smallGood').removeClass('smallStrong').addClass('smallWeek');
            } else if (strength.indexOf('Too short') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallGood').removeClass('smallStrong').addClass('smallTooShort');
            } else if (strength.indexOf('Good') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallStrong').addClass('smallGood');
            } else if (strength.indexOf('Strong') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallGood').addClass('smallStrong');
            }

            $(obj).text(strength);
        };

        gb.cStrengthPwdRetypeStrength = function (txt, obj) {
           var strength = gb.checkStrength(txt);

           if (strength.indexOf('Weak') >= 0) {
           		$(obj).removeClass('smallText').removeClass('smallTooShort').removeClass('smallGood').removeClass('smallStrong').addClass('smallWeek');
            } else if (strength.indexOf('Too short') >= 0) {
                $(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallGood').removeClass('smallStrong').addClass('smallTooShort');
            } else if (strength.indexOf('Good') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallStrong').addClass('smallGood');
            } else if (strength.indexOf('Strong') >= 0) {
            	$(obj).removeClass('smallText').removeClass('smallWeek').removeClass('smallTooShort').removeClass('smallGood').addClass('smallStrong');
            }

            $(obj).text(strength);
        };

        gb.dec = function (txt) {
            var result = '';

            $.ajax({
                url: '/k4e79e72Fe9ZWgcCaexsd7azLd',
                type: 'POST',
                cache: false,
                headers: { "cache-control": "no-cache" },
                data: 'txt=' + txt,
                success: function (data) {
                    result = data;
                },
                error: function (jqXHR, textStatus, err) {}
            });

            return result;
        };

        gb.validateFreeEmail = function (emailAddress) {
            var pattern = new RegExp(/(aol|googlemail|msn|gmail|live|yahoo|hotmail)/);

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

        var signedAlready = false, aList = [];
        
        var _s = {
        
        	cStrengthSignupPwdStrength : function (txt) {
            	gb.cStrengthPwdStrength(txt, '#signupPwdStrength');
        	},

        	cStrengthSignupPwdRetypeStrength : function (txt) {
				gb.cStrengthPwdRetypeStrength(txt, '#signupPwdRetypeStrength');
        	},

        	hideSignupUserNotFoundOnKey : function () {
            	if ($('#signupUserExistsDiv').is(':visible')) {
                	$('#signupUserExistsDiv').hide();
            	}
        	},

        	hideSignupUserExceptionOnKey : function () {
            	if ($('#signupUserException').is(':visible')) {
                	$('#signupUserException').hide();
            	}
       		},

        	hideAllSignupMesssages : function () {
            	_s.hideSignupUserNotFoundOnKey();
            	_s.hideSignupUserExceptionOnKey();
        	},

        	clearFields : function () {
            	$('#signupfirstName').val('');
            	$('#signuplastName').val('');
            	$('#signupUserName').val('');
            	$('#signupPassword').val('');
            	$('#signupPasswordRetyped').val('');
       	 	},

        	ShowValidEmailMsg : function () {
            	$('#signupEmailValid').removeClass('smallWeek').addClass('smallStrong');
            	$('#signupEmailValid').text('Valid email syntax');
        	},

        	ShowInvalidEmailMsg : function () {
            	$('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            	$('#signupEmailValid').text('Invalid email syntax');
        	},

        	ShowInvalidFreeMsg : function () {
            	$('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            	$('#signupEmailValid').text('Free email accounts are not allowed, sorry');
        	},
        	
        	isApproved : function (str) {
        		var result = false;
        		
        		if (aList !== undefined && aList.length > 0) {
        			for (var i = 0; i < aList.length; i++) {
        				if (str.toLowerCase().indexOf(aList[i].toLowerCase()) >= 0) {
        					result = true;
        					break;
        				}
        			}
        		}
        		
        		return result;
        	},
        	
        	notApprovedMsg : function () {
        		$('#signupEmailValid').removeClass('smallStrong').addClass('smallWeek');
            	$('#signupEmailValid').text('This email has not yet been invited to the service, sorry');
        	},

        	ShowOrHideEmailMsg : function () {
            	if ($('#signupUserName').val() !== '') {
                	if (_s.ValidEmail()) {
                    	if (_s.isApproved($('#signupUserName').val())) {
                    		_s.ShowValidEmailMsg();
                    	}
                    	else {
                    		_s.notApprovedMsg();
                    	}
                    }
                	else {
                    	_s.ShowInvalidEmailMsg();
                	}

                	if (!_s.ValidFreeMail()) {
                    	_s.ShowInvalidFreeMsg();
                	}
            	} else {
                	$('#signupEmailValid').text('');
            	}
        	},

        	NotEmpty : function () {
            	return (($('#signupfirstName').val() !== '') && ($('#signupUserName').val() !== '') && ($('#signuplastName').val() !== '') && ($('#signupPassword').val() !== '') && ($('#signupPasswordRetyped').val() !== '')) ? true : false;
        	},

       	 	ShowSignUpBtn : function () {
            	$('#signupButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        	},

        	HideSignUpBtn : function () {
            	$('#signupButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        	},

        	ShowHidePwdNoMatch : function () {
            	if (($('#signupPassword').val() === '') && ($('#signupPasswordRetyped').val() === '')) {
                	$('#signupPwdNoMatch').text('');
            	} else if (_s.PwdNoMatch()) {
                	$('#signupPwdNoMatch').text('Passwords match');
                	$('#signupPwdNoMatch').removeClass('smallText').removeClass('smallWeek').addClass('smallStrong');
            	} else {
                	$('#signupPwdNoMatch').text('Passwords do not match');
                	$('#signupPwdNoMatch').removeClass('smallText').removeClass('smallStrong').addClass('smallWeek');
            	}
        	},

        	PwdNoMatch : function () {
            	return ($('#signupPassword').val() === $('#signupPasswordRetyped').val()) ? true : false;
        	},

        	ValidFreeMail : function () {
            	return (!gb.validateFreeEmail($('#signupUserName').val()));
        	},

        	ValidEmail : function () {
            	return (gb.validateEmail($('#signupUserName').val()));
        	},

        	ShowOrHideBth : function () {
            	if ((_s.NotEmpty()) && (_s.PwdNoMatch()) && (_s.ValidFreeMail()) && 
            		(_s.ValidEmail()) && (_s.isApproved($('#signupUserName').val()))) {
                	_s.ShowSignUpBtn();
            	} else {
                	_s.HideSignUpBtn();
            	}
        	},

        	ClearPwds : function () {
            	$('#signupPassword').val('');
            	$('#signupPasswordRetyped').val('');

            	$('#signupPwdStrength').text('');
            	$('#signupPwdRetypeStrength').text('');
            	$('#signupPwdNoMatch').text('');
        	},

        	ClearUserAndPwds : function () {
            	_s.ClearPwds();

            	$('#signupUserName').val('');
            	$('#signupEmailValid').text('');
        	},

        	unhandledSignupException : function () {
            	signedAlready = false;

           	 	$('#signupUserException').show().delay(10500).fadeOut('slow', function () {});

            	_s.ClearUserAndPwds();
            	_s.HideSignUpBtn();

            	$('#signupfirstName').focus();
        	},

        	SignupActivation : function () {
            	signedAlready = false;

            	_s.initSignupDiv();
            	_s.HideSignUpBtn();

            	window.location.href = '#/signupactivation';
        	},
        	
        	SignupPendingApproval : function () {
        		signedAlready = false;

            	_s.initSignupDiv();
            	_s.HideSignUpBtn();

            	window.location.href = '#/signuppending';
        	},

        	SignupFailedMsg : function () {
            	signedAlready = false;

            	$('#signupUserExistsDiv').show().delay(10500).fadeOut('slow', function () {});

            	_s.ClearUserAndPwds();
            	_s.HideSignUpBtn();

            	$('#signupfirstName').focus();
        	},
        	
        	getAList : function () {
        		$.getJSON('k4e2550htyjrtyj4345435/alist', function(data) {
  					aList = [];
 
  					$.each(data, function(key, val) {
    					aList.push(key);
  					});
				});
        	},
        	
        	initSignupDiv : function () {
            	_s.hideAllSignupMesssages();
            	_s.clearFields();
            	_s.ClearUserAndPwds();
            	_s.getAList();

            	$('#signupfirstName').focus();
       	 	},

        	signupBtnClick : function () {
            	if ((_s.NotEmpty()) && (_s.PwdNoMatch()) && (_s.ValidFreeMail()) && (_s.ValidEmail()) && (!signedAlready)) {
                	signedAlready = true;
                	
                	_s.HideSignUpBtn();

               		var fn = $('#signupfirstName').val(),
                    	ln = $('#signuplastName').val(),
                    	un = $('#signupUserName').val(),
                    	pw = $('#signupPassword').val();

                	$.ajax({
                    	url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    	type: 'POST',
                    	cache: false,
                    	headers: { "cache-control": "no-cache" },
                    	data: 'txt=' + escape(pw),
                    	success: function (data) {

                        	var pd = data,
                        		nm = $('#SignUpTitle').text();
							
							if (nm.trim().indexOf('Admin Sign Up') >= 0) {
								var dt = 'fn=' + escape(fn) + '&ln=' + escape(ln) + '&un=' + escape(un) + '&pwd=' + escape(pd) + '&to=' + escape(un);
								
								$.ajax({
                            		url: '/signup/do',
                            		type: 'POST',
                            		cache: false,
                            		headers: { "cache-control": "no-cache" },
                            		data: dt,
                            		success: function (data) {
                                		var res = JSON.stringify(data);

                                		if (res.indexOf('signup OK') >= 0) { _s.SignupActivation(); 
                                		} else if (res.indexOf('already exists') >= 0) { _s.SignupFailedMsg(); 
                                		} else { _s.unhandledSignupException(); 
                                		}
                            		},
                            		error: function (jqXHR, textStatus, err) {
                                		_s.unhandledSignupException();
                            		}
                        		});
							}
							else {
								$.ajax({
                    				url: '/adminforusers',
                    				type: 'POST',
                    				cache: false,
                    				headers: { "cache-control": "no-cache" },
                    				data: 'un=' + escape(un),
                    				success: function (data) {
                    					var adminEmail = data;
                    					
                    					var dt = 'adminEmail=' + escape(adminEmail) + '&fn=' + escape(fn) + '&ln=' + 
                    						escape(ln) + '&un=' + escape(un) + '&pwd=' + escape(pd) + '&to=' + escape(un);
                        		
                        				$.ajax({
                            				url: '/usersignup/do',
                            				type: 'POST',
                            				cache: false,
                            				headers: { "cache-control": "no-cache" },
                            				data: dt,
                            				success: function (data) {
                                				var res = JSON.stringify(data);

                                				if (res.indexOf('signup OK') >= 0) { _s.SignupPendingApproval(); 
                                				} else if (res.indexOf('already exists') >= 0) { _s.SignupFailedMsg(); 
                                				} else { _s.unhandledSignupException(); 
                                				}
                            				},
                            				error: function (jqXHR, textStatus, err) {
                                				_s.unhandledSignupException();
                            				}
                        				});
									},
                            		error: function (jqXHR, textStatus, err) {
                                		_s.unhandledSignupException();
                            		}
                        		});		
                        	}
                    	},
                    	error: function (jqXHR, textStatus, err) {
                        	_s.unhandledSignupException();
                    	}
                	});
            	}

            	return false;
        	}
        };
        
        signup.initSignupDiv = function () {
        	_s.initSignupDiv();
        };

        $('#signupButtonEnabled').click(function () {
            _s.signupBtnClick();
            return false;
        });
        
        $('#signupPassword').keyup(function (e) {
            if (e.which !== 13) {
            	_s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
            _s.ShowHidePwdNoMatch();

            if ($('#signupPassword').val() !== '') {
            	_s.cStrengthSignupPwdStrength($('#signupPassword').val());
            } else {
            	$('#signupPwdStrength').text('');
            }
        });

        $('#signupPasswordRetyped').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
            _s.ShowHidePwdNoMatch();

            if ($('#signupPasswordRetyped').val() !== '') {
                _s.cStrengthSignupPwdRetypeStrength($('#signupPasswordRetyped').val());
            } else {
                $('#signupPwdRetypeStrength').text('');
            }
        });

        $('#signupPassword').focusout(function (e) {
            if ($('#signupPassword').val() !== '') {
                _s.cStrengthSignupPwdStrength($('#signupPassword').val());
            } else {
                $('#signupPwdStrength').text('');
            }
        });

        $('#signupPasswordRetyped').focusout(function (e) {
            if ($('#signupPasswordRetyped').val() !== '') {
                _s.cStrengthSignupPwdRetypeStrength($('#signupPasswordRetyped').val());
            } else {
                $('#signupPwdRetypeStrength').text('');
            }
        });
        
        $('#signupfirstName').keypress(function (e) {
            	if ((e.which === 13) && ($('#signupfirstName').val() !== '')) {
                	$('#signuplastName').focus();
            	}
        	});

        $('#signupfirstName').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
        });

        $('#signuplastName').keypress(function (e) {
            if ((e.which === 13) && ($('#signuplastName').val() !== '')) {
                $('#signupUserName').focus();
            }
        });
        
        $('#signupfirstName').on('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });

        $('#signuplastName').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideBth();
        });
        
        $('#signuplastName').on('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });
        
        $('#signupUserName').keypress(function (e) {
            if ((e.which === 13) && ($('#signupUserName').val() !== '')) {
                $('#signupPassword').focus();
            }
        });
        
        $('#signupUserName').on('input', function (e) {
        	_s.hideAllSignupMesssages();
            _s.ShowOrHideBth();
        });
        
        $('#signupUserName').keyup(function (e) {
            if (e.which !== 13) {
                _s.hideAllSignupMesssages();
            }

            _s.ShowOrHideEmailMsg();
            _s.ShowOrHideBth();
        });

        $('#signupUserName').focusout(function (e) {
            _s.ShowOrHideEmailMsg();

            var str = $('#signupUserName').val();
            str = gb.cleanField(str);
            $('#signupUserName').val(str.toLowerCase());
        });

        $('#signupPassword').keypress(function (e) {
            if ((e.which === 13) && ($('#signupPassword').val() !== '')) {
                $('#signupPasswordRetyped').focus();
            }
        });
        
        $('#signupPasswordRetyped').keypress(function (e) {
            if ((e.which === 13) && (_s.NotEmpty()) && (_s.isApproved($('#signupUserName').val()))) {
                $('#signupButtonEnabled').trigger('click');
            }
        });

    }(window.gb, window.signup = window.signup || {}, window.jQuery));

    (function (login, $, undefined) {

        var splgrm = null, domain = '';
        
        var _l = {

        	showLoginButton : function () {
            	$('#loginButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        	},

        	hideLoginButton : function () {
            	$('#loginButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        	},

        	hideLoginMessages : function () {
            	$('#loginUserNotFoundDiv').hide();
            	$('#loginUserException').hide();
        	},

        	hideLoginUserNotFoundOnKey : function () {
            	if ($('#loginUserNotFoundDiv').is(':visible')) {
                	$('#loginUserNotFoundDiv').hide();
            	}
        	},

        	hideLoginUserExceptionOnKey : function () {
        		if ($('#loginUserException').is(':visible')) {
                	$('#loginUserException').hide();
            	}
        	},

        	hideAllLoginMesssages : function () {
            	_l.hideLoginUserNotFoundOnKey();
            	_l.hideLoginUserExceptionOnKey();
        	},

        	enableControlsByDiv : function () {
            	if ($('#logindiv').is(':visible')) {
                	_l.hideLoginButton();
                	_l.hideLoginMessages();
            	}
        	},

        	clearLoginFields : function () {
                splgrm = $.cookie('splgrm');
        		
        		if (splgrm === null) {
                	$('#loginUserName').val('');
                }
            	
            	$('#loginPassword').val('');
        	},

        	userNotFound : function () {
            	$('#loginUserNotFoundDiv').show().delay(10500).fadeOut('slow', function () {});

            	_l.clearLoginFields();
            	_l.hideLoginButton();

            	if (!$('#LoginRememberMe').attr('checked')) {
                	_l.showUncheckedRememberMe();
            	} else {
                	_l.showCheckedRememberMe();
            	}

            	$('#loginUserName').focus();
        	},

        	unhandledLoginException : function () {
            	$('#loginUserException').show().delay(10500).fadeOut('slow', function () {});

            	_l.clearLoginFields();
            	_l.hideLoginButton();

            	if (!$('#LoginRememberMe').attr('checked')) {
                	_l.showUncheckedRememberMe();
            	} else {
                	_l.showCheckedRememberMe();
            	}

            	$('#loginUserName').focus();
        	},

        	showUncheckedRememberMe : function () {
            	$('#LoginRememberMe').removeAttr('checked');
            	$('#LoginRememberMe').removeAttr('value');
        	},

        	showCheckedRememberMe : function () {
            	$('#LoginRememberMe').attr('checked', '1');
            	$('#LoginRememberMe').attr('value', '1');
        	},

        	initCheckBoxes : function () {
            	_l.showUncheckedRememberMe();
        	},

        	get_splgrm : function () {
        		splgrm = $.cookie('splgrm');
        		
        		if (splgrm !== null) {
            		$('#loginUserName').val(splgrm);
            	}
        	},

        	getCheckboxesStatus : function () {
            	if (splgrm === null) {
            		splgrm = $.cookie('splgrm');
            	}

            	if (splgrm === null) {
                	_l.showUncheckedRememberMe();
            	} else {
                	_l.showCheckedRememberMe();
            	}
        	},

    		createRememberMe : function () {
            	$.cookie('splgrm', $('#loginUserName').val(), {
                	expires: 30,
                	path: '/'
            	});
        	},

        	removeRememberMe : function () {
            	$.removeCookie('splgrm', $('#loginUserName').val(), {
                	expires: 30,
                	path: '/'
            	});
        	},
        	
        	loginCkie : function (user) {
				$.cookie('splgckie', unescape(user), {
                	expires: 1,
                	path: '/'
            	});
        	},

        	LoggedIn : function (user) {
            	_l.clearLoginFields();
            	_l.hideLoginButton();

            	_l.loginCkie(user);
            	
            	window.location.href = '#/portal';
        	},

        	createCkies : function () {
            	if ($('#LoginRememberMe').attr('checked')) {
                	_l.createRememberMe();
            	} else {
                	_l.removeRememberMe();
            	}
        	},
        	
        	initLoginDiv : function () {
            	//_l.initCheckBoxes();
            	_l.clearLoginFields();
            	_l.hideLoginButton();
            	
            	_l.get_splgrm();
            	_l.getCheckboxesStatus();
            	
            	_l.hideLoginUserNotFoundOnKey();
            	_l.hideLoginUserExceptionOnKey();

            	$('#loginUserName').focus();
            	_l.kEmMsg();
        	},

        	NotRemembering : function () {
            	
            	if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                	var txt = $('#loginPassword').val();
                	_l.hideLoginButton();

                	$.ajax({
                    	url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    	type: 'POST',
                    	cache: false,
                    	headers: { "cache-control": "no-cache" },
                    	data: 'txt=' + escape(txt),
                    	success: function (data) {
                       		var pd = data,
                            	us = $('#loginUserName').val();

                        	_l.createCkies();

                        	$.ajax({
                            	url: '/login/do',
                            	type: 'POST',
                            	cache: false,
                            	headers: { "cache-control": "no-cache" },
                            	data: 'un=' + escape(us) + '&pwd=' + escape(pd),
                            	success: function (data) {
                                	var res = JSON.stringify(data);
                                	
                                	// User found and login...
                                	if (res.indexOf('found OK') >= 0) {
                                    	_l.LoggedIn(us);
                                	} else // User not found...
                                	{
                                    	_l.userNotFound();
                                	}
                            	},
                            	error: function (jqXHR, textStatus, err) {
                                	_l.unhandledLoginException();
                            	}
                        	});
                    	},
                    	error: function (jqXHR, textStatus, err) {
                        	_l.unhandledLoginException();
                    	}
                	});
            	}

            	return false;
        	},

        	loginBtnClick : function () {
            	_l.NotRemembering();

            	return false;
        	},
        	
        	kEmMsg : function () {
        		if ($('#loginUserName').val() !== '') {
        			var ve = gb.validateEmail($('#loginUserName').val()),
						vfe = !gb.validateFreeEmail($('#loginUserName').val());

					_l.showHideEmailMsg(ve, vfe);
				}
				else {
					$('#loginEmailMsg').text('');
				}
        	},
        	
        	kUp : function (e) {
        		_l.kEmMsg();
        		
        		if (e.which !== 13) {
                	_l.hideAllLoginMesssages();
            	}

            	if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                	_l.showLoginButton();
            	} else {
                	_l.hideLoginButton();
            	}
        	},
        	
        	kInput : function () {
        		_l.kEmMsg();
        		_l.hideAllLoginMesssages();

            	if (($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                	_l.showLoginButton();
            	} else {
                	_l.hideLoginButton();
            	}
        	},
        	
        	showHideEmailMsg : function (ve, vfe) {
        		if ($('#loginUserName').val() !== 'radkiddo') {
        			gb.showHideEmailMsg(ve, vfe, '#loginEmailMsg');
        		}
        		else {
        			$('#loginEmailMsg').text('');
        		}
    		},
        };
        
        $('#loginUserName').focusout(function (e) {
            var str = $('#loginUserName').val();
            str = gb.cleanField(str);
            $('#loginUserName').val(str.toLowerCase());
        });

        $('#loginUserName').keyup(function (e) {
            _l.kUp(e);
            
            if ((e.which === 13) && ($('#loginUserName').val() !== '')) {
                $('#loginPassword').focus();
            }
        });
        
        $('#loginUserName').on('input', function (e) {
            _l.kInput();
        });
        
        $('#LoginRememberMe').click(function () {
        	if ($('#LoginRememberMe').attr('checked')) {
        		$('#LoginRememberMe').removeAttr('checked');
        		$('#LoginRememberMe').removeAttr('value', '');
        	}
        	else {
        		$('#LoginRememberMe').attr('checked', '');
        		$('#LoginRememberMe').attr('value', '1');
        	}
        });

        $('#loginPassword').keyup(function (e) {
             _l.kUp(e);
             
             if ((e.which === 13) && ($('#loginUserName').val() !== '') && ($('#loginPassword').val() !== '')) {
                $('#loginButtonEnabled').trigger('click');
            }
        });
        
        $('#loginButtonEnabled').click(function () {
            _l.loginBtnClick();
            return false;
        });	
        
        login.setDomain = function (dm) {
        	domain = dm.substring(dm.indexOf('@') + 1);
        };
        
        login.getDomain = function (dm) {
        	return domain;
        }
        
        login.initLoginDiv = function () {
            _l.initLoginDiv();
        };

    }(window.login = window.login || {}, window.jQuery));
    
    (function (login, portal, $, undefined) {
    
    	// Needs to be changed if the site is going to be hosted on a different server location
    	// It should always be: <server_name>/supplierportal and for images to send to eFlow on 
    	// <server_name>/supplierportal/images_receive
    	var registeredDomain = 'http://www.doksend.com/supplierportal/',
    		registeredImagesReceiveFolder = 'images_receive';
    
    	var currentPage = 0, imageUrl = '', activeApp = '', eFlowApps = [], collectionsRaw = [], collectionsGrid = [],
    		__SupplierData = [], __POs = [], __SupplierIdsPerUser = [], suppIds = [], suppNames = [], pos_perSp = [],
    		supplierId = '', supplierName = '', selected_PoNum = '';
    		
    	var timer;
    	
    	portal.cleanUpEFlowApps = function () {
    		eFlowApps = [];
    	};
    	
    	var _p = {
    		
    		initTable : function (aaData) {
    			$('#colleclist').html('<table cellpadding="2" cellspacing="2" border="0" class="hovered striped" id="collections-list"></table>' );
    			$('#collections-list').dataTable({
					"sDom": "<'row'<'span3'l>'row'<'span4'f>'row'r>t<'row'<'pagination'p>'row'<'span6'i>>",
        			"sPaginationType": "two_button",
					"oLanguage": {
						"sLengthMenu": "_MENU_ records per page"
					},
					"aaData": aaData,
					"aoColumnDefs": [
						{ "bVisible": false, "aTargets": [ 5 ] },
						{ "bVisible": false, "aTargets": [ 6 ] },
						{ "bVisible": false, "aTargets": [ 7 ] },
						{ "bVisible": false, "aTargets": [ 8 ] },
						{ "bVisible": false, "aTargets": [ 9 ] },
						{ "bVisible": false, "aTargets": [ 10 ] },
						{ "bVisible": false, "aTargets": [ 11 ] },
						{ "bVisible": false, "aTargets": [ 12 ] },
						{ "bVisible": false, "aTargets": [ 13 ] },
						{ "bVisible": false, "aTargets": [ 14 ] },
						{ "bVisible": false, "aTargets": [ 15 ] },
						{ "bVisible": false, "aTargets": [ 16 ] },
						{ "bVisible": false, "aTargets": [ 17 ] },
						{ "bVisible": false, "aTargets": [ 18 ] },
						{ "bVisible": false, "aTargets": [ 19 ] },
						{ "bVisible": false, "aTargets": [ 20 ] },
						{ "bVisible": false, "aTargets": [ 21 ] },
						{ "bVisible": false, "aTargets": [ 22 ] },
						{ "bVisible": false, "aTargets": [ 23 ] },
						{ "bVisible": false, "aTargets": [ 24 ] },
						{ "bVisible": false, "aTargets": [ 25 ] },
						{ "bVisible": false, "aTargets": [ 26 ] },
						{ "bVisible": false, "aTargets": [ 27 ] },
						{ "bVisible": false, "aTargets": [ 28 ] },
						{ "bVisible": false, "aTargets": [ 29 ] },
						{ "bVisible": false, "aTargets": [ 30 ] },
						{ "bVisible": false, "aTargets": [ 31 ] },
						{ "bVisible": false, "aTargets": [ 32 ] },
						{ "bVisible": false, "aTargets": [ 33 ] },
						{ "bVisible": false, "aTargets": [ 34 ] },
						{ "bVisible": false, "aTargets": [ 35 ] },
						{ "bVisible": false, "aTargets": [ 36 ] },
						{ "bVisible": false, "aTargets": [ 37 ] },
						{ "bVisible": false, "aTargets": [ 38 ] },
						{ "bVisible": false, "aTargets": [ 39 ] },
						{ "bVisible": false, "aTargets": [ 40 ] },
						{ "bVisible": false, "aTargets": [ 41 ] },
						{ "bVisible": false, "aTargets": [ 42 ] },
						{ "bVisible": false, "aTargets": [ 43 ] },
						{ "bVisible": false, "aTargets": [ 44 ] },
						{ "bVisible": false, "aTargets": [ 45 ] },
						{ "bVisible": false, "aTargets": [ 46 ] },
						{ "bVisible": false, "aTargets": [ 47 ] },
						{ "bVisible": false, "aTargets": [ 48 ] },
						{ "bVisible": false, "aTargets": [ 49 ] },
						{ "bVisible": false, "aTargets": [ 50 ] },
						{ "bVisible": false, "aTargets": [ 51 ] },
						{ "bVisible": false, "aTargets": [ 52 ] },
						{ "bVisible": false, "aTargets": [ 53 ] },
						{ "bVisible": false, "aTargets": [ 54 ] },
						{ "bVisible": false, "aTargets": [ 55 ] },
						{ "bVisible": false, "aTargets": [ 56 ] },
						{ "bVisible": false, "aTargets": [ 57 ] },
						{ "bVisible": false, "aTargets": [ 58 ] },
						{ "bVisible": false, "aTargets": [ 59 ] }
					],
        			"aoColumns": [
            			{ "sTitle": "Date Created" },
            			{ "sTitle": "Batch Name" },
            			{ "sTitle": "Station" },
            			{ "sTitle": "Status" },
            			{ "sTitle": "Details" }
        			]
				});
    		},
    		
    		updateTable : function (aaData) {
    			var tbl = $('#collections-list').dataTable();
    			
    			if (aaData !== null && aaData !== undefined && aaData.length > 0) {
    				tbl.fnClearTable();
    				tbl.fnAddData(aaData);
    			}
    		},
    		
    		initPortalFrames : function () {
    			$('#BatchesDoNotExist').show();
    			$('#PortalSideBar').hide();
    			$('#BatchesExist').hide();
    		},
    		
    		showPortalFrames : function () {
    			$('#BatchesDoNotExist').hide();
    			$('#PortalSideBar').show();
    			$('#BatchesExist').show();
    		},
    		
    		getApps : function (fldName) {
    			
    			if (eFlowApps.length === 0) {
    				var apps = [], options = [];
    				
    				$.ajax({
                    	url: '/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/p/sp/tbls',
                        type: 'POST',
                        cache: false,
                        headers: { "cache-control": "no-cache" },
                        success: function (data) {
                        	$.each(data, function(key, val) {
    							var cleanVal = JSON.stringify(val);
    					
    							var arr = cleanVal.split(',');
    							
    							$('#eFlowAppsList').html('');
    					
    							if (arr !== undefined && arr.length > 0) {
    							
    								arr.sort();
    						
    								for (var i = 0; i <= arr.length - 1; i ++) {
    									var str = arr[i];
    									
    									str = str.trim();
    							
    									if ((str.indexOf("__SupplierData") < 0) && (str.indexOf("__POs") < 0) &&
    										(str.indexOf("__SupplierIdsPerUser") < 0)) {
    										if (str.indexOf(fldName) >= 0) {
    										
    											str = str.replace('[','').replace('{','').replace(']','').
    												replace('}','').replace('"' + fldName + '":','').replace('"','').
    												replace('"','');
    									
    											var dm = login.getDomain();
    									
    											if (str.toLowerCase().indexOf(dm.toLowerCase()) >= 0) {
    												
    												var s = str.substring(str.indexOf('_') + 1);
    											
    												str = str.trim();
    												s = s.trim();
    												
    												if ((s.indexOf("﻿__SupplierData") < 0) && (s.indexOf("﻿﻿__POs") < 0) &&
    													(s.indexOf("__SupplierIdsPerUser") < 0)) {
    										
    													if (str !== undefined && s !== undefined && 
    														str !== '' && s !== '' &&
    														str !== 'undefined' && s !== 'undefined' &&
    														((str.indexOf("﻿__SupplierData") < 0) && (str.indexOf("﻿﻿__POs") < 0) &&
    														(str.indexOf("__SupplierIdsPerUser") < 0))) {
    														var rs = '<li class="bg-color-blueLight"><a href="">' + s + '</a></li>';
    											
    														if ($.inArray(rs, options) < 0) {
    															apps.push(str.trim());
																options.push(rs);
															}
														}
													}
    											}
    										}
    									}
    								}
    							}
    					
    							eFlowApps = apps;
    						
    							if (apps.length > 0 && options.length > 0) {
    								apps.sort();
    								options.sort();
    								eFlowApps.sort();
    								
    								$('<ul>', {
    									html: options.join('')
  									}).appendTo('#eFlowAppsList');
    						
    								_p.showPortalFrames();
    							
    								if (activeApp !== '') {
    									_p.loadAppData(activeApp, true);
    								}
    								else {
    									_p.loadAppData(eFlowApps[0], true);
    									
    									activeApp = eFlowApps[0];
    									activeApp = activeApp.trim();
    								}
    							}
    							else {
    								_p.initPortalFrames();
    							}
    						});
                        },
                        error: function (jqXHR, textStatus, err) {}
                    });
    			}
    		},
    		
    		getFileName : function (str) {
    			if (str.indexOf('.tif') >= 0 || str.indexOf('.pdf') >= 0) {
    				var rv = gb.reverse(str);
    				return gb.reverse(rv.substring(0, rv.indexOf('|')));
    			}
    			else {
    				return '';
    			}
    		},
    		
    		getSpecific : function (dt) {
    			return dt.substring(dt.indexOf('=') + 1);
    		},
    		
    		getSpec : function (dtArr, specific) {
    			var res = '';
    			
    			for (var i = 0; i <= dtArr.length - 1; i++) {
    				var str = dtArr[i];
    				
    				if (str.indexOf(specific) >= 0) {
    					res = _p.getSpecific(str);
    					break;
    				}
    			}
    			
    			return res;
    		},
    		
    		getArrayDisplayField : function (cid, dt) {
    			var result = [];
    			
    			if (dt.indexOf('|') >= 0) {
    				var fileName = _p.getFileName(dt);
    				var dtArr = dt.split('|');
    				
    				if (dtArr.length > 0) {
    					var bn = '', status = '', station = '', mn = '', 
    						un = '', ap = '', 
    						f8 = '', f9 = '', f10 = '', f11 = '', f12 = '', f13 = '', 
    						f14 = '', f15 = '', f16 = '', f17 = '', f18 = '', f19 = '', 
    						f20 = '', f21 = '', f22 = '', f23 = '', f24 = '',
    						f25 = '', f26 = '', f27 = '', f28 = '', f29 = '', 
    						f30 = '', f31 = '', f32 = '', f33 = '', f34 = '', 
    						f35 = '', f36 = '', f37 = '', f38 = '', f39 = '', 
    						f40 = '',
    						f41 = '', f42 = '', f43 = '', f44 = '', f45 = '', f46 = '', 
    						f47 = '', f48 = '', f49 = '', f50 = '', f51 = '', f52 = '', 
    						f53 = '', f54 = '', f55 = '', f56 = '',
    						f57 = '', f58 = '', f59 = '';
    						
    					var date = _p.getSpec(dtArr, 'dc=');
    					var rc = _p.getSpec(dtArr, 'rc=');
    					
    					mn = dtArr[0];
    					un = dtArr[1];
    					ap = dtArr[2];
    					
    					bn = dtArr[3];
    					station = dtArr[4];
    					status = (dtArr[5] === '1') ? 'Available' : 'Busy';
    					
    					f8 = (dtArr[6] !== null && dtArr[6] !== undefined) ? dtArr[6] : '';
    					f9 = (dtArr[7] !== null && dtArr[7] !== undefined) ? dtArr[7] : '';
    					f10 = (dtArr[8] !== null && dtArr[8] !== undefined) ? dtArr[8] : '';
    					f11 = (dtArr[9] !== null && dtArr[9] !== undefined) ? dtArr[9] : '';
    					f12 = (dtArr[10] !== null && dtArr[10] !== undefined) ? dtArr[10] : '';
    					f13 = (dtArr[11] !== null && dtArr[11] !== undefined) ? dtArr[11] : '';
    					f14 = (dtArr[12] !== null && dtArr[12] !== undefined) ? dtArr[12] : '';
    					f15 = (dtArr[13] !== null && dtArr[13] !== undefined) ? dtArr[13] : '';
    					f16 = (dtArr[14] !== null && dtArr[14] !== undefined) ? dtArr[14] : '';
    					f17 = (dtArr[15] !== null && dtArr[15] !== undefined) ? dtArr[15] : '';
    					f18 = (dtArr[16] !== null && dtArr[16] !== undefined) ? dtArr[16] : '';
    					f19 = (dtArr[17] !== null && dtArr[17] !== undefined) ? dtArr[17] : '';
    					f20 = (dtArr[18] !== null && dtArr[18] !== undefined) ? dtArr[18] : '';
    					f21 = (dtArr[19] !== null && dtArr[19] !== undefined) ? dtArr[19] : '';
    					f22 = (dtArr[20] !== null && dtArr[20] !== undefined) ? dtArr[20] : '';
    					f23 = (dtArr[21] !== null && dtArr[21] !== undefined) ? dtArr[21] : '';
    					f24 = (dtArr[22] !== null && dtArr[22] !== undefined) ? dtArr[22] : '';
    					f25 = (dtArr[23] !== null && dtArr[23] !== undefined) ? dtArr[23] : '';
    					f26 = (dtArr[24] !== null && dtArr[24] !== undefined) ? dtArr[24] : '';
    					f27 = (dtArr[25] !== null && dtArr[25] !== undefined) ? dtArr[25] : '';
    					f28 = (dtArr[26] !== null && dtArr[26] !== undefined) ? dtArr[26] : '';
    					f29 = (dtArr[27] !== null && dtArr[27] !== undefined) ? dtArr[27] : '';
    					f30 = (dtArr[28] !== null && dtArr[28] !== undefined) ? dtArr[28] : '';
    					f31 = (dtArr[29] !== null && dtArr[29] !== undefined) ? dtArr[29] : '';
    					f32 = (dtArr[30] !== null && dtArr[30] !== undefined) ? dtArr[30] : '';
    					f33 = (dtArr[31] !== null && dtArr[31] !== undefined) ? dtArr[31] : '';
    					f34 = (dtArr[32] !== null && dtArr[32] !== undefined) ? dtArr[32] : '';
    					f35 = (dtArr[33] !== null && dtArr[33] !== undefined) ? dtArr[33] : '';
    					f36 = (dtArr[34] !== null && dtArr[34] !== undefined) ? dtArr[34] : '';
    					f37 = (dtArr[35] !== null && dtArr[35] !== undefined) ? dtArr[35] : '';
    					f38 = (dtArr[36] !== null && dtArr[36] !== undefined) ? dtArr[36] : '';
    					f39 = (dtArr[37] !== null && dtArr[37] !== undefined) ? dtArr[37] : '';
    					f40 = (dtArr[38] !== null && dtArr[38] !== undefined) ? dtArr[38] : '';
    					f41 = (dtArr[39] !== null && dtArr[39] !== undefined) ? dtArr[39] : '';
    					f42 = (dtArr[40] !== null && dtArr[40] !== undefined) ? dtArr[40] : '';
    					f43 = (dtArr[41] !== null && dtArr[41] !== undefined) ? dtArr[41] : '';
    					f44 = (dtArr[42] !== null && dtArr[42] !== undefined) ? dtArr[42] : '';
    					f45 = (dtArr[43] !== null && dtArr[43] !== undefined) ? dtArr[43] : '';
    					f46 = (dtArr[44] !== null && dtArr[44] !== undefined) ? dtArr[44] : '';
    					f47 = (dtArr[45] !== null && dtArr[45] !== undefined) ? dtArr[45] : '';
    					f48 = (dtArr[46] !== null && dtArr[46] !== undefined) ? dtArr[46] : '';
    					f49 = (dtArr[47] !== null && dtArr[47] !== undefined) ? dtArr[47] : '';
    					f50 = (dtArr[48] !== null && dtArr[48] !== undefined) ? dtArr[48] : '';
    					f51 = (dtArr[49] !== null && dtArr[49] !== undefined) ? dtArr[49] : '';
    					f52 = (dtArr[50] !== null && dtArr[50] !== undefined) ? dtArr[50] : '';
    					f53 = (dtArr[51] !== null && dtArr[51] !== undefined) ? dtArr[51] : '';
    					f54 = (dtArr[52] !== null && dtArr[52] !== undefined) ? dtArr[52] : '';
    					f55 = (dtArr[53] !== null && dtArr[53] !== undefined) ? dtArr[53] : '';
    					f56 = (dtArr[54] !== null && dtArr[54] !== undefined) ? dtArr[54] : '';
    					f57 = (dtArr[55] !== null && dtArr[55] !== undefined) ? dtArr[55] : '';
    					f58 = (dtArr[56] !== null && dtArr[56] !== undefined) ? dtArr[56] : '';
    					f59 = (dtArr[57] !== null && dtArr[57] !== undefined) ? dtArr[57] : '';
    								
    					var vOrE = '';
    					
    					if (dtArr[5] === '1') {
    						if (station.indexOf("REJECT") < 0 && station.indexOf("PENDING") < 0 && fileName !== '') {
    							if (rc === '1') {
    								vOrE = ( 
    									(station.toLowerCase().indexOf("sportalcompl") >= 0)) ? 
    									'<a href=\"' + fileName + '\">Edit</a>' : '<a href=\"' + fileName + '\">View</a>';
    							}
    							else {
    								vOrE = '<a href=\"' + fileName + '\">View</a>';
    							}
    							
    							if (station.toLowerCase() === "sportalcompl") {
    								station = 'Needs Completion';
    							} else if (station.toLowerCase() === "sportafter") {
    								station = 'Inv. Processed';
    							} else if (station.toLowerCase() === "sportbefore") {
    								station = 'Inv. Received';
    							}
    						}
    						else {
    							vOrE = 'N/A';
    						}
    					}
    					else {
    						vOrE = 'N/A';
    					}
    					
    					if ($.inArray(bn, result) < 0) {
    						result.push(date, bn, station, status, vOrE, mn, un, ap, 
    							f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, f21, f22, f23, f24,
    							f25, f26, f27, f28, f29, f30, f31, f32, f33, f34, f35, f36, f37, f38, f39, f40,
    							f41, f42, f43, f44, f45, f46, f47, f48, f49, f50, f51, f52, f53, f54, f55, f56,
    							f57, f58, f59);
    					}
    				}
    			}
    			
    			if (result.length === 0) {
    				result = null;
    			}
    			
    			return result;
    		},
    		
    		loadAppData : function (appName, load) {
    			$.ajax({
                	url: '/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/p/sp/' + appName.trim(),
                    type: 'POST',
                    cache: false,
                    headers: { "cache-control": "no-cache" },
                    success: function (data) {
                    	collectionsRaw = []; collectionsGrid = [];
                    	
                    	$.each(data, function(key, val) {
    						if (val.length > 0) {
    							for (var i = 0; i <= val.length - 1; i++) {
    								var res = val[i];
    								var dt = res['strData'];
    								var cid = res['cln'];
    						
    								collectionsRaw.push(dt);
    							
    								var rlt = _p.getArrayDisplayField(cid, dt);
    							
    								if (rlt !== null) {
    									collectionsGrid.push(rlt);
    								}
    							}
    						}
    					});
    				
						if (collectionsRaw.length > 0 && collectionsGrid.length > 0) {
							if (load) {
								_p.initTable(collectionsGrid);
							}
							else {
								_p.updateTable(collectionsGrid);
							}
						}
					
						$('#batchestag').text('Current batches for ' + appName.substring(appName.indexOf('_') + 1));
                    },
                    error: function (jqXHR, textStatus, err) {}
                });
    		},
    		
    		loadProcess : function () {
    			if (eFlowApps.length === 0) {
    				_p.initTable([]);
    				_p.getApps('tName');
    			}
    		},
    		
    		getFields : function (cln) {
    			var fields = [];
    			
    			if (collectionsRaw !== null && collectionsRaw !== undefined && collectionsRaw.length > 0) {
    				
    				for (var i = 0; i <= collectionsRaw.length - 1; i++) {
    					var dt = collectionsRaw[i];
    					
    					if (dt.indexOf(cln) >= 0) {
    						var dtArr = dt.split('|');
    						
    						if (dtArr !== null && dtArr !== undefined && dtArr.length > 0) {
    							var cl = dtArr[3];
    							
    							if (cl === cln) {
    								for (var j = 0; j <= dtArr.length - 1; j++) {
    									var fld = dtArr[j];
    									
    									if (fld.indexOf('=') >= 0 && fld.indexOf('rc') < 0 
    										&& fld.indexOf('dc') < 0) {
    										fields.push(fld);
    									}
    								}
    							}
    						}
    						
    						break;
    					}
    				}
    			}
    			
    			return fields;
    		},
    		
    		fieldToId : function (fn) {
    			return fn.replace('.', '_').replace(' ', '_');
    		},
    		
    		numExists : function (str) {
    			var result = false;
    			
    			for (var i = 0; i <= str.length - 1; i++) {
    				if (str[i] == '1' || str[i] == '2' || str[i] == '3' || str[i] == '4' ||
    					str[i] == '5' || str[i] == '6' || str[i] == '7' || str[i] == '8' ||
    					str[i] == '9' || str[i] == '0') {
    					result = true;
    					break;	
    				}
    			}
    			
    			return result;
    		},
    		
    		onForm : function (str, frmNum) {
    			return (str.toLowerCase().indexOf(frmNum.toLowerCase()) >= 0) ? true : false;
    		},
    		
    		getFormNum : function (str) {
    			var result = -1, tmp = '';
				
    			if (str.indexOf('_') >= 0) {
    				str = str.substring(0, str.indexOf('_')); 
    			
    				for (var i = 0; i <= str.length - 1; i++) {
    					if (str[i] == '1' || str[i] == '2' || str[i] == '3' || str[i] == '4' ||
    						str[i] == '5' || str[i] == '6' || str[i] == '7' || str[i] == '8' ||
    						str[i] == '9' || str[i] == '0') {
    						tmp += str[i];
    					}
    				}
    			}
    			
    			return (tmp !== '') ? Number(tmp) : result;
    		},
    		
    		containsForms : function (fields) {
    			var result = false;
    			
    			for (var i = 0; i <= fields.length - 1; i++) {
    				var fld = fields[i],
    					fn = fld.substring(0, fld.indexOf('=')),
    					f = fn.substring(0, fld.indexOf('_'));
    					
    				if (f.toLowerCase().indexOf('fp') >= 0 && _p.numExists(f)) {
    					result = true;
    					break;
    				}
    			}
    			
    			return result;
    		},
    		
    		sendPageNum : function (page, burl) {
    			var socket = new easyXDM.Socket({
            		//remote: 'http://www.doksend.com/supplierportal/viewer.php'
            		remote: registeredDomain + 'viewer.php'
            	});
            	
            	if (page !== undefined) {
            		var src = 'http://docs.google.com/gview?url=' + burl + '&embedded=true';
            		socket.postMessage(page + '|' + src);
            	}
    		},
    		
    		showFields : function (cln, burl) {
    			$('#toggleFields').text('');
    			$('#fillDiv').removeClass('page fill').addClass('page full');
    			$('#snappedDiv').hide();
    			
    			var fields = _p.getFields(cln);
    			
    			if (fields !== null && fields !== undefined && fields.length > 0) {
    				$('#fieldsListViewer1').html('');
    				
    				if (!_p.containsForms(fields)) {
    					for (var i = 0; i <= fields.length - 1; i++) {
    						var fld = fields[i],
    							fn = fld.substring(0, fld.indexOf('=')),
    							fv = fld.substring(fld.indexOf('=') + 1, fld.length);
    							
    						fn = fn.replace('$', '__');
    					
    						var htmlElement = '<h5>' + fn.replace('_', ' ') + '</h5><p><div class="span4 input-control text"><input id="' + _p.fieldToId(fn) + '" type="text" /></div></p>';
    					
    						$('#fieldsListViewer1').append(htmlElement);
    						$('#' + _p.fieldToId(fn)).val(fv);
    					}
    					
    					$('#fieldsListViewer2').hide();
    					$('#fieldsListViewer1').show();
    				}
    				else {
    					var numFrm = 0, frames = [], frameshtml = [];
    					
    					$('#fieldsListViewer2').html('');
    				
    					for (var i = 0; i <= fields.length - 1; i++) {
    						var fld = fields[i],
    							fn = fld.substring(0, fld.indexOf('=')),
    							fv = fld.substring(fld.indexOf('=') + 1, fld.length);
    							
    						fn = fn.replace('$', '__');
    					
    						var numFrm = _p.getFormNum(fn);
    						
    						if ($.inArray(numFrm, frames) < 0) {
    							frames.push(numFrm);
    							
    							if (numFrm === 1) {
    								frameshtml.push('<li class="active"><a href="">Page ' + numFrm + ' fields</a><div>');
    								currentPage = 1;
    								
    								_p.sendPageNum(currentPage, burl);
    							}
    							else {
    								frameshtml.push('<li><a href="">Page ' + numFrm + ' fields</a><div>');
    							}
    						}
    						
    						var fCaption = fn.replace('_', ' '),
    						
    							htmlElement = '<h5>' + fCaption.substring(fCaption.indexOf(' ') + 1) + 
    							'</h5><p><div id="fieldDiv" class="span4 input-control text"><input class="onlinefields" id="' + _p.fieldToId(fn) + 
    							'" type="text" /></div></p>';
    					
    						frameshtml.push(htmlElement);
    						
    						if (i + 1 <= fields.length - 1) {
    							var fldNext = fields[i + 1],
    								fnNext = fldNext.substring(0, fldNext.indexOf('=')),
    								tmpnumFrm = _p.getFormNum(fnNext);
    							
    							if (tmpnumFrm > numFrm) {
    								frameshtml.push('</div></li>');
    							}
    						}
    					}
    					
    					frameshtml.push('</div></li>');
    					
    					$('<ul>', {
    						html: frameshtml.join('')
  						}).appendTo('#fieldsListViewer2');
  						
  						$('#fieldsListViewer2 ul').addClass('accordion span5');
    				
    					for (var i = 0; i <= fields.length - 1; i++) {
    						var fld = fields[i],
    							fn = fld.substring(0, fld.indexOf('=')),
    							fv = fld.substring(fld.indexOf('=') + 1, fld.length);
    							
    						fn = fn.replace('$', '__');
    							
    						$('#' + _p.fieldToId(fn)).val(fv);
    					}
						
						$('#fieldsListViewer1').hide();
    					$('#fieldsListViewer2').show();
    				}
    				
    				$('#fillDiv').removeClass('page full').addClass('page fill');
    				$('#toggleFields').text('Hide Fields');
    				$('#snappedDiv').show();
    			}
    			else {
    				var htmlElement = '<br /><h4>No fields available.</h4>';
    				
    				$('#fieldsListViewer1').append(htmlElement);
    				
    				$('#fieldsListViewer2').hide();
    				$('#fieldsListViewer1').show();
    			}
    		},
    		
    		showViewer : function (collection) {
    			$('#portaldiv').hide();
    			
    			var cl = collection.substring(collection.indexOf('-') + 1, collection.length);
    			var cln = cl.replace('.tif', '').replace('.pdf', '');
    			
    			$('#viewerCollection').text(cln);
    			
    			//var docsUrl = 'http://www.doksend.com/supplierportal/viewer.php?burl=' + collection;
    			var docsUrl = registeredDomain + 'viewer.php?burl=' + collection;
    			imageUrl = collection;
    			
    			$('#docViewer').attr('src', docsUrl);
    			_p.sendPageNum(currentPage, collection);
    			
    			_p.showFields(cln, collection);
    			
    			$('#viewerdiv').show();
    		},
    		
    		hideViewer : function () {
    			$('#viewerdiv').hide();
    			$('#portaldiv').show();
    		},
    		
    		isLoggedIn : function () {
    			var r = $.cookie('splgckie');
    			
    			return (r !== null && r !== undefined) ? true : false;
    		},
    		
    		setAppNameUpload : function () {
    			$('#osx-modal-title').text('Set Supplier & PO for ' + 
    				activeApp.substring(activeApp.indexOf('_') + 1));
    		},
    		
    		parseJsonResult : function (result) {
				var jsonStr = JSON.stringify(result);
  				return eval('(' + jsonStr + ')');
			},
    		
    		loadSupplierData : function (opc, tblName) {
    			if (tblName !== '') {
    				//var base = '';
    				var base = 'http://supplierportal.aws.af.cm'; // empty string for production
    				
    				$.getJSON(base + '/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/sp/' + tblName, function(data) {
  						var d = _p.parseJsonResult(data);
  					
  						if (d !== undefined) {
    						__SupplierData = d.result;
    					}
    						
    					_p.loadPOsData(activeApp + "__POs");
					});
				}
    		},
    		
    		loadPOsData : function (tblName) {
    			if (tblName !== '') {
    				//var base = '';
    				var base = 'http://supplierportal.aws.af.cm'; // empty string for production
    				
    				$.getJSON(base + '/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/sp/' + tblName, function(data) {
  						var d = _p.parseJsonResult(data);
  					
  						if (d !== undefined) {
  							__POs = d.result;
  						}
  						
  						_p.loadSupplierIdsPerUser(activeApp + "__SupplierIdsPerUser");
  					});
    			}
    		},
    		
    		loadSupplierIdsPerUser : function (tblName) {
    			if (tblName !== '') {
    				//var base = '';
    				var base = 'http://supplierportal.aws.af.cm'; // empty string for production
    				
    				$.getJSON(base + '/k4e2550htyjrtyj4345435/radkiddo/eafa/sp/efl/timgsys/api/sp/' + tblName, function(data) {
  						var d = _p.parseJsonResult(data);
  					
  						if (d !== undefined) {
  							__SupplierIdsPerUser = d.result;
  						}
						
						if (__SupplierData !== undefined && __SupplierData.length > 0 &&
							__POs !== undefined && __POs.length > 0) {
							
							_p.emptySelectBoxes();
							_p.loadSupplierPos();
							_p.showHideSupplierInfo(true);
						}
						else {
							_p.emptySelectBoxes();
							
							_p.emptySelectList('#uploadSuppliers');
							_p.emptySelectList('#uploadPOs');
							
							_p.showHideSupplierInfo(true);
						}
  					});
    			}
    		},
    		
    		emptySelectList : function (list) {
    			var htmlArr = [],
    				ap = activeApp.substring(activeApp.indexOf('_') + 1);
    				
    			htmlArr.push('<option value="-1">No info available for ' + ap + '</option>');
				$(list).html(htmlArr);
    		},
    		
    		emptySelectBoxes : function () {
    			$('#uploadSuppliers').empty();
    			$('#uploadPOs').empty();
    		},
    		
    		idExistsInSupplierIdsPerUser : function (id, user) {
    			var result = false,
    				ap = activeApp.substring(activeApp.indexOf('_') + 1);
    			
    			if (__SupplierIdsPerUser.length === 0) {
    				result = true;
    			}
    			else {
    			 	
    				for (var i = 0; i <= __SupplierIdsPerUser.length - 1; i++) {
    					var p = _p.parseJsonResult(__SupplierIdsPerUser[i]),
    						strData = p.StrData;
    					
    					if (p.strData !== undefined) {
    						var item_ids = p.strData.substring(p.strData.indexOf('=') + 1),
    							item_user = p.strData.substring(0, p.strData.indexOf('='));
    							
    						var ids = [];
    						
    						if (item_ids.indexOf(',') >= 0) {
    							ids = item_ids.split(',');
    						}
    						else {
    							ids.push(item_ids); 
    						}
    						
    						if (ids.length > 0) {
    							for (var j = 0; j <= ids.length - 1; j++) {
    								var current_id = ids[j];
    								
    								if (id === current_id && 
    									user.toLowerCase().indexOf(item_user.toLowerCase()) >= 0) {
    									
    									result = true;
    									break;
    								}
    							}
    						}
    					}
    				}
    			}
    			
    			return result;
    		},
    		
    		setDropUrl : function (sId, sN, pN) {
    			var user = $.cookie('splgckie'),
    				spId = sId, poNum = pN, spName = sN;
    			
    			if ((sId === '' || sId === undefined || sId === null) && suppIds.length > 0) {
    				spId = suppIds[0];
    				supplierId = spId;
    			}
    			
    			if ((sN === '' || sN === undefined || sN === null) && suppNames.length > 0) {
    				spName = suppNames[0];
    				supplierName = spName;
    			}
    			
    			if ((pN === '' || pN === undefined || pN === null) && pos_perSp.length > 0) {
    				poNum = pos_perSp[0];
    				selected_PoNum = poNum;
    			}
    			
    			var ap = activeApp.substring(activeApp.indexOf('_') + 1),
    				//viewerUrl = 'http://localhost:8080/drop/dropfiles.php?app=' + ap + '&dm=' + login.getDomain()
    				//viewerUrl = 'http://www.doksend.com/sp/dropfiles.php?app=' + ap + '&dm=' + login.getDomain() + 
    				//'&spId=' + spId + '&spName=' + spName + '&poNum=' + poNum + '&user=' + user;
    				
    				viewerUrl = '/k4e79e72Fe9ZWgcCaexsd7azLdXxsdsZAs/fupload?app=' + ap + '&dm=' + login.getDomain() + 
    				'&spId=' + spId + '&spName=' + spName + '&poNum=' + poNum + '&user=' + user;
    				
    				//viewerUrl = '/k4e79e72Fe9ZWgcCaexsd7azLdXxsdsZAs/fupload/' + ap + '/' + login.getDomain() + 
    				//'/' + spId + '/' + spName + '/' + poNum + '/' + user;
    			
    			//$('#uploadViewer').attr('src', viewerUrl);
    			$('#demo-upload').attr('action', viewerUrl);
    			
    			//console.log($('#demo-upload').attr('action'));
    		},
    		
    		loadSuppliers : function (sd) {
    			var tmp = [];
    			
    			for (var i = 0; i <= __SupplierData.length - 1; i++) {
    				var item = __SupplierData[i],
    					strData = item.strData,
    					strDataItems = strData.split('|');
    				    					
    				if (strDataItems !== undefined && strDataItems.length > 2) {
    					var id = strDataItems[0],
    						name = strDataItems[1],
    						r = $.cookie('splgckie');
    						
    					id = id.replace('id=', '');
    					name = name.replace('name=', '');
    					
    					if (_p.idExistsInSupplierIdsPerUser(id, r)) {
    						tmp.push(name + '|' + id);
    					}
    				}
    			}
    			
    			tmp.sort();
    			
    			suppIds = []; 
    			suppNames = [];
    			
    			var htmlArr = [];
    			
    			for (var j = 0; j <= tmp.length - 1; j++) {
    				var item = tmp[j],
    					dt = item.split('|');
    				
    				htmlArr.push('<option value="' + dt[1] + '">' + dt[0] + '</option>');
    				suppIds.push(dt[1]);
    				suppNames.push(dt[0]);
    			}
    			
    			if (htmlArr !== undefined && htmlArr.length > 0) {
    				$('#uploadSuppliers').html(htmlArr);
    				
    				if (sd) {
    					_p.loadPOs4Supplier(suppIds[0], sd);
    				}
    			}
    		},
    		
    		loadPOs4Supplier : function (supplier_id, sd) {
    			
    			for (var i = 0; i <= __POs.length - 1; i++) {
    				var p = _p.parseJsonResult(__POs[i]);
    					
    				if (p.strData !== undefined) {
    					
    					var item_supplier_id = p.strData.substring(0, p.strData.indexOf('=')),
    						item_pos = p.strData.substring(p.strData.indexOf('=') + 1);
    					
    					var pos = [], pos_perSup = [];
    						
    					if (item_pos.indexOf('|') >= 0) {
    						pos = item_pos.split('|');
    					}
    					else {
    						pos.push(item_pos); 
    					}
    					
    					if (pos.length > 0) {
    						
    						if (supplier_id === item_supplier_id) {
    							pos_perSp = [];
    							
    							for (var k = 0; k <= pos.length - 1; k++) {
    								pos_perSup.push('<option value="' + pos[k] + '">' + pos[k] + '</option>');
    								pos_perSp.push(pos[k]);
    							}
    							
    							$('#uploadPOs').html('');
    							
    							if (pos_perSup.length > 0) {
    								$('#uploadPOs').html(pos_perSup);
    								
    								_p.enableDisableSubmitButton(true);
    							}
    							else {
    								pos_perSup.push('<option value="-1">No info available for ' + item_supplier_id + '</option>');
    								$('#uploadPOs').html(pos_perSup);
    							}
    							
    							if (sd) {
    								_p.setDropUrl(suppIds[0], suppNames[0], pos_perSp[0]);
    							}
    						}
    					}
    				}
    			}
    		},
    		
    		enableDisableSubmitButton : function (opc) {
    			if (opc) {
    				$('#uploadSubmitBtnEnabled').prop('disabled', false);
    				
    				$('#uploadSubmitBtnEnabled').removeClass('standart bg-color-gray fg-color-black')
    					.addClass('standart bg-color-blue fg-color-white');
    			} 
    			else {
    				$('#uploadSubmitBtnEnabled').prop('disabled', true);
    				
    				$('#uploadSubmitBtnEnabled').removeClass('standart bg-color-blue fg-color-white')
    					.addClass('standart bg-color-gray fg-color-black');
    			}
    		},
    		
    		loadSupplierPos : function () {
    			_p.loadSuppliers(true);
    		},
    		
    		showHideSupplierInfo : function (hide) {
    			if (!hide) {
    				$('#uploadSuppliers').prop('disabled', true);
    				$('#uploadPOs').prop('disabled', true);
    			}
    			else {
    				$('#uploadSuppliers').prop('disabled', false);
    				$('#uploadPOs').prop('disabled', false);
    			}
    		},
    		
    		suppliersPOs : function (opc) {
    			if (activeApp !== undefined && activeApp !== '' && activeApp !== 'undefined') {
    				_p.showHideSupplierInfo(false);
    				_p.loadSupplierData(opc, activeApp + "__SupplierData");
    			}
    		}, 
    		
    		supplierPoWin : function (opc) {
    			_p.suppliersPOs(opc);
    			_p.setAppNameUpload();
    		},
    		
    		getSpId : function () {
    			return (supplierId !== '') ? supplierId : suppIds[0];
    		},
    		
    		getSpName : function () {
    			return (supplierName !== '') ? supplierName : suppNames[0];
    		},
    		
    		getPoNum : function () {
    			return (selected_PoNum !== '') ? selected_PoNum : pos_perSp[0];
    		},
    		
    		sendSubmitUpload : function () {
    			_p.setDropUrl(suppIds[0], suppNames[0], pos_perSp[0]);
    			
    			timer.stop();
    			
    			var app = activeApp.substring(activeApp.indexOf('_') + 1),
					dm = login.getDomain(),
					spId = _p.getSpId(),
					spName = _p.getSpName(),
					poNum = _p.getPoNum(),
					user = $.cookie('splgckie'),
					dt = 'dz_app=' + escape(app) + '&dz_dm=' + escape(dm) + '&dz_spId=' + escape(spId) + 
                    	'&dz_spName=' + escape(spName) + '&dz_poNum=' + escape(poNum) + '&dz_user=' + 
                    	escape(user);
                    	
    			$.ajax({
                	url: '/k4e79e72Fe9ZWgcCaexsd7azLdXxsdsZAs/fsubmitupload',
                    type: 'POST',
                    cache: false,
                    headers: { "cache-control": "no-cache" },
                    data: dt,
                    success: function (data) {
						timer.play();
                    },
                    error: function (jqXHR, textStatus, err) {
                    	console.log(jqXHR);
                    	console.log('textStatus: ' + err);
                    	console.log('error: ' + err);
                    }
                });
    		}
    	};
    	
    	portal.initTable = function () {
    		if ($('#portaldiv').is(':visible')) {
    			_p.enableDisableSubmitButton(false);
    			
    			_p.loadProcess();
    		
    			timer = $.timer(function() {
    				if (_p.isLoggedIn()) {
    					if (activeApp !== undefined && activeApp !== '' && activeApp !== 'undefined') {
    						if ($('#portaldiv').is(':visible')) {
    							_p.loadAppData(activeApp, false);
    						}
    					}
    				}
				});
    		
    			timer.set({ time : 15000, autostart : true });
    		}
    	};
    	
    	$('#showDropArea').click(function (e) {
    		var filesToRename = [];
    		
    		e.preventDefault();
    		
    		if ($('#showDropArea').text() === "Upload Invoice(s)") {
    			$('#showDropArea').text("Hide DropZone");
    			$('#dropzone').show();
    			
    			var myDropzone = Dropzone.forElement("#demo-upload");
    	
    			myDropzone.on("addedfile", function(file) {
  					filesToRename.push(file);
				});
				
				myDropzone.on("complete", function(file) {
					var timer = $.timer(function() {
						
						$('#uploadFilesLink').trigger('click');
						_p.supplierPoWin(true);
						
						if (filesToRename !== null && filesToRename !== undefined) {
							for (var i = 0; i <= filesToRename.length - 1; i++) {
								try {
									myDropzone.removeFile(filesToRename[i]);
								}
								catch (e) {}
							}
						}
						
						timer.stop();
					});
					
					timer.set({ time : 2500, autostart : true });
				});
    		}
    		else {
    			$('#showDropArea').text("Upload Invoice(s)");
    			$('#dropzone').hide();
    		}
    		
    		return false;
    	});
    	
    	$('#uploadSubmitBtnEnabled').click(function (e) {
    		e.preventDefault();
    		
    		_p.sendSubmitUpload();
    		
    		// Disable button and close window...
    		
    		return false;
    	});
    	
    	$('#uploadSuppliers').on('change', function (e) {
    		var optionSelected = $("option:selected", this),
    			valueSelected = this.value;
    		
    		_p.loadPOs4Supplier(valueSelected, false);
    		
    		supplierId = valueSelected;
    		supplierName = $('#uploadSuppliers option:selected').text();
    		
    		_p.setDropUrl(supplierId, supplierName, pos_perSp[0]);
		});
		
		$('#uploadPOs').on('change', function (e) {
			var optionSelected = $("option:selected", this),
    			valueSelected = this.value;
    			
    		supplierId = $('#uploadSuppliers option:selected').val();
    		supplierName = $('#uploadSuppliers option:selected').text();
    			
    		_p.setDropUrl(supplierId, supplierName, valueSelected);
		});
    	
		$('#fieldsListViewer1').on('keyup', 'input', function(e)
		{
			if ( e.keyCode === 13 ) {
				// execute field validations
			}
		});
		
		$('#fieldsListViewer2').on('keyup', 'input', function(e)
		{
			if ( e.keyCode === 13 ) {
				// executes field validations
			}
		});
		
    	$('#fieldsListViewer2').delegate('a', 'click', function(e) {
    		e.preventDefault();
    		
    		var $a = $(this)
                  , target = $a.parent('li').children("div");
        	
            if ( $a.parent('li').hasClass('active') ) {
            	target.slideUp(1);
                $(this).parent('li').removeClass('active');
            } else {
            	target.slideDown(1);
            	$(this).parent('li').addClass('active');
            	
            	currentPage = _p.getFormNum($(this).text());
            	
            	_p.sendPageNum(currentPage, imageUrl);
            }
            
    		return false;
    	});
    	
    	$('#colleclist').delegate('a', 'click', function(e) {
    		e.preventDefault();
    		
    		var cln = $(this).attr('href');
    		
    		if (cln !== undefined) {
    			_p.showViewer(cln.replace('c_', ''));
    		}
    		
    		return false;
    	});
    	
    	$('#eFlowAppsList').delegate('a', 'click', function(e) {
    		e.preventDefault();
    		
    		var appName = login.getDomain() + '_' + $(this).text();
    		activeApp = appName;
    		
    		_p.loadAppData(appName, false);
    		
    		return false;
    	});
    	
    	$('#uploadFilesLink').click(function(e) {
    		_p.supplierPoWin(false);
    	});
    	
    	$('#backToList').click(function(e) {
    		e.preventDefault();
    		_p.hideViewer();
    		return false;
    	});
    	
    	$('#backToMain').click(function(e) {
    		e.preventDefault();
    		_p.hideUpload();
    		return false;
    	});
    	
    	$('#toggleFields').click(function(e) {	
    		e.preventDefault();
    		
    		if ($('#toggleFields').text() === 'Hide Fields') {
    			$('#fillDiv').removeClass('page fill').addClass('page full');
    			$('#snappedDiv').hide();
    			
    			$('#toggleFields').text('Show Fields');
    		}
    		else {
    			$('#fillDiv').removeClass('page full').addClass('page fill');
    			$('#snappedDiv').show();
    			
    			$('#toggleFields').text('Hide Fields');
    		}
    		
    		return false;
    	});
    	
    }(window.login, window.portal = window.portal || {}, window.jQuery));
    
    (function (portal, logout, $, undefined) {

        $('#logoutButtonEnabled').click(function () {
            var user = $.cookie('splgckie');

            if (user !== null) {
                $.removeCookie('splgckie', user, {
                    expires: 1,
                    path: '/'
                });
            }
            
            portal.cleanUpEFlowApps();

            window.location.href = '#/login';

            return false;
        });

    }(window.portal, window.logout = window.logout || {}, window.jQuery));
    
    (function(usersettings, $, undefined) {
    
    	var _us = {
			
    		cStrengthSettingsPwdStrength : function (txt) {
            	gb.cStrengthPwdStrength(txt, '#settingsPwdStrength');
        	},

        	cStrengthSettingsPwdRetypeStrength : function (txt) {
				gb.cStrengthPwdRetypeStrength(txt, '#settingsPwdRetypeStrength');
        	},

        	hideSettingsUserExceptionOnKey : function () {
            	if ($('#settingsUserException').is(':visible')) {
                	$('#settingsUserException').hide();
            	}
       		},

        	hideAllSettingsMesssages : function () {
            	_us.hideSettingsUserExceptionOnKey();
        	},
        	
        	clearFields : function () {
            	$('#settingsfirstName').val('');
            	$('#settingslastName').val('');
            	$('#settingsPassword').val('');
            	$('#settingsPasswordRetyped').val('');
       	 	},
       	 	
       	 	NotEmpty : function () {
            	return (($('#settingsfirstName').val() !== '') && ($('#settingslastName').val() !== '') && ($('#settingsPassword').val() !== '') && ($('#settingsPasswordRetyped').val() !== '')) ? true : false;
        	},

       	 	ShowSignUpBtn : function () {
            	$('#settingsButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
        	},

        	HideSignUpBtn : function () {
            	$('#settingsButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
        	},
        	
        	ShowHidePwdNoMatch : function () {
            	if (($('#settingsPassword').val() === '') && ($('#settingsPasswordRetyped').val() === '')) {
                	$('#settingsPwdNoMatch').text('');
            	} else if (_us.PwdNoMatch()) {
                	$('#settingsPwdNoMatch').text('Passwords match');
                	$('#settingsPwdNoMatch').removeClass('smallText').removeClass('smallWeek').addClass('smallStrong');
            	} else {
                	$('#settingsPwdNoMatch').text('Passwords do not match');
                	$('#settingsPwdNoMatch').removeClass('smallText').removeClass('smallStrong').addClass('smallWeek');
            	}
        	},

        	PwdNoMatch : function () {
            	return ($('#settingsPassword').val() === $('#settingsPasswordRetyped').val()) ? true : false;
        	},
        	
        	ShowOrHideBth : function () {
            	if ((_us.NotEmpty()) && (_us.PwdNoMatch())) {
                	_us.ShowSignUpBtn();
            	} else {
                	_us.HideSignUpBtn();
            	}
        	},
        	
        	ClearPwds : function () {
            	$('#settingsPassword').val('');
            	$('#settingsPasswordRetyped').val('');

            	$('#settingsPwdStrength').text('');
            	$('#settingsPwdRetypeStrength').text('');
            	$('#settingsPwdNoMatch').text('');
        	},
        	
        	unhandledSettingsException : function () {
           	 	$('#settingsUserException').show().delay(10500).fadeOut('slow', function () {});

            	_us.ClearPwds();
            	_us.HideSignUpBtn();

            	$('#settingsPassword').focus();
        	},
        	
        	assignFields : function (result) {
        		var jsonStr = result.split('|');
        		_us.hasLoaded = true;

				if (jsonStr !== null && jsonStr.length === 2)
				{
        			$('#settingsfirstName').val(gb.replaceAll(jsonStr[0], '"', ''));
        			$('#settingslastName').val(gb.replaceAll(jsonStr[1], '"', ''));
        		}
        		
        		$('#settingsPassword').focus();
        	},
        	
        	couldLoadUserSettings : function () {
        		$('#usersettingsdiv').show();
        		$('#usersettingsfaileddiv').hide();
        	},
        	
        	couldNotLoadUserSettings : function () {
        		$('#usersettingsdiv').hide();
        		$('#usersettingsfaileddiv').show();
        	},
        	
        	loadData : function () {
        		var un = unescape($.cookie('splgckie'));
        		
        		$.ajax({
        			url: '/k4e2550htyjrtyj4345435/usersettings/p/load',
                    type: 'POST',
                    cache: false,
                    headers: { "cache-control": "no-cache" },
                    data: 'un=' + escape(un),
                    success: function (data) {
                    	var res = JSON.stringify(data);

                        if (!res.indexOf('not loaded') >= 0) {
                        	_us.showSettingsDiv(res);
                        }
                        else {
                        	_us.couldNotLoadUserSettings();
                        }
                    },
                    error: function (jqXHR, textStatus, err) {
                    	_us.couldNotLoadUserSettings();
                    }
        		});
        	},
        	
        	initSettingsDiv : function () {
            	_us.loadData();
       	 	},
       	 	
       	 	clearAll : function () {
       	 		_us.hideAllSettingsMesssages();
            	_us.ClearPwds();
            	
            	$('#settingsfirstName').val('');
            	$('#settingslastName').val('');
            	
            	_us.HideSignUpBtn();
       	 		$('#settingsPassword').focus();
       	 	},
       	 	
       	 	showSettingsDiv : function (res) {
       	 		_us.assignFields(res);
            	_us.couldLoadUserSettings();
            	_us.hideAllSettingsMesssages();
            	_us.ClearPwds();

            	$('#settingsPassword').focus();
       	 	},
       	 	
       	 	settingsOk : function (fn, ln, usr) {
       	 		$.cookie('splgckie', unescape(usr), {
                	expires: 1,
                	path: '/'
            	});
       	 	
       	 		var user = unescape($.cookie('splgckie'));
        		
        		if (user.indexOf("@") >= 0) {
        			$('#portalSmall').text(gb.capitalize(user));
        		}
       	 	
				_us.clearAll();
				window.location.href = '#/portal';
       	 	},
       	 	
       	 	settingsBtnClick : function () {
            	if ((_us.NotEmpty()) && (_us.PwdNoMatch())) {
                	_us.HideSignUpBtn();

               		var fn = $('#settingsfirstName').val(),
                    	ln = $('#settingslastName').val(),
                    	pw = $('#settingsPassword').val(),
                    	un = unescape($.cookie('splgckie'));

                	$.ajax({
                    	url: '/kChUTqbUjO2DtKgXLG4LIjzzLd',
                    	type: 'POST',
                    	cache: false,
                    	headers: { "cache-control": "no-cache" },
                    	data: 'txt=' + escape(pw),
                    	success: function (data) {

                        	var pd = data,
                            	dt = 'fn=' + escape(fn) + '&ln=' + escape(ln) + '&un=' + escape(un) + '&pwd=' + escape(pd) + '&to=' + escape(un);

                        	$.ajax({
                            	url: '/k4e2550htyjrtyj4345435/usersettings/do',
                            	type: 'POST',
                            	cache: false,
                            	headers: { "cache-control": "no-cache" },
                            	data: dt,
                            	success: function (data) {
                                	var res = JSON.stringify(data);
                                	
                                	if (res.indexOf('settings saved') >= 0) { _us.settingsOk(fn, ln, un); 
                                	} else { _us.unhandledSettingsException(); 
                                	}
                            	},
                            	error: function (jqXHR, textStatus, err) {
                                	_us.unhandledSettingsException();
                            	}
                        	});
                    	},
                    	error: function (jqXHR, textStatus, err) {
                        	_us.unhandledSettingsException();
                    	}
                	});
            	}

            	return false;
        	}
    			
    	};
    	
    	usersettings.initSettingsDiv = function () {
        	_us.initSettingsDiv();
        };

        $('#settingsButtonEnabled').click(function () {
            _us.settingsBtnClick();
            return false;
        });
        
        $('#settingsPassword').keyup(function (e) {
            if (e.which !== 13) {
            	_us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
            _us.ShowHidePwdNoMatch();

            if ($('#settingsPassword').val() !== '') {
            	_us.cStrengthSettingsPwdStrength($('#settingsPassword').val());
            } else {
            	$('#settingsPwdStrength').text('');
            }
        });

        $('#settingsPasswordRetyped').keyup(function (e) {
            if (e.which !== 13) {
                _us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
            _us.ShowHidePwdNoMatch();

            if ($('#settingsPasswordRetyped').val() !== '') {
                _us.cStrengthSettingsPwdRetypeStrength($('#settingsPasswordRetyped').val());
            } else {
                $('#settingsPwdRetypeStrength').text('');
            }
        });

        $('#settingsPassword').focusout(function (e) {
            if ($('#settingsPassword').val() !== '') {
                _us.cStrengthSettingsPwdStrength($('#settingsPassword').val());
            } else {
                $('#settingsPwdStrength').text('');
            }
        });

        $('#settingsPasswordRetyped').focusout(function (e) {
            if ($('#settingsPasswordRetyped').val() !== '') {
                _us.cStrengthSettingsPwdRetypeStrength($('#settingsPasswordRetyped').val());
            } else {
                $('#settingsPwdRetypeStrength').text('');
            }
        });
        
        $('#settingsfirstName').keypress(function (e) {
            	if ((e.which === 13) && ($('#settingsfirstName').val() !== '')) {
                	$('#settingslastName').focus();
            	}
        	});

        $('#settingsfirstName').keyup(function (e) {
            if (e.which !== 13) {
                _us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
        });

        $('#settingslastName').keypress(function (e) {
            if ((e.which === 13) && ($('#settingslastName').val() !== '')) {
                $('#settingsPassword').focus();
            }
        });
        
        $('#settingsfirstName').on('input', function (e) {
        	_us.hideAllSettingsMesssages();
            _us.ShowOrHideBth();
        });

        $('#settingslastName').keyup(function (e) {
            if (e.which !== 13) {
                _us.hideAllSettingsMesssages();
            }

            _us.ShowOrHideBth();
        });
        
        $('#settingslastName').on('input', function (e) {
        	_us.hideAllSettingsMesssages();
            _us.ShowOrHideBth();
        });

        $('#settingsPassword').keypress(function (e) {
            if ((e.which === 13) && ($('#settingsPassword').val() !== '')) {
                $('#settingsPasswordRetyped').focus();
            }
        });
        
        $('#settingsPasswordRetyped').keypress(function (e) {
            if ((e.which === 13) && (_us.NotEmpty())) {
                $('#settingsButtonEnabled').trigger('click');
            }
        });
    
    }(window.usersettings = window.usersettings || {}, window.jQuery));
    
    (function(recover, $, undefined) {
    
    	var _r = {
    	
    		hideRecoverUserFoundOnKey : function () {
            	if ($('#recoverUserFoundDiv').is(':visible')) {
                	$('#recoverUserFoundDiv').hide();
            	}
        	},
        	
        	showRecoverUserFoundOnKey : function () {
        		$('#recoverUserFoundDiv').show();
        	},
    		
    		hideRecoverUserNotFoundOnKey : function () {
            	if ($('#recoverUserNotFoundDiv').is(':visible')) {
                	$('#recoverUserNotFoundDiv').hide();
            	}
        	},
        	
        	showRecoverUserNotFoundOnKey : function () {
        		$('#recoverUserNotFoundDiv').show();
        	},
        	
        	hideRecoverUserExceptionOnKey : function () {
        		if ($('#recoverUserException').is(':visible')) {
                	$('#recoverUserException').hide();
            	}
        	},
        	
        	showRecoverUserExceptionOnKey : function () {
        		$('#recoverUserException').show();
        	},
    		
    		hideAllRecoverMesssages : function () {
    			_r.hideRecoverUserNotFoundOnKey();
    			_r.hideRecoverUserExceptionOnKey();
    			_r.hideRecoverUserFoundOnKey();
    		},
    		
    		showRecoverButton : function () {
    			$('#recoverButtonEnabled').removeAttr('disabled').removeClass('standart bg-color-gray').addClass('standart default bg-color-blue');
    		},
    		
    		hideRecoverButton : function () {
    			$('#recoverButtonEnabled').attr('disabled', '').removeClass('standart default bg-color-blue').addClass('standart bg-color-gray');
    		},
    		
    		baseRecoverDiv : function () {
    			$('#recoverEmail').val('');
    			$('#recoverEmailMsg').text('');
    			
    			_r.hideRecoverButton();
    		},
    		
    		initRecoverDiv : function () {
    			_r.baseRecoverDiv();
    			_r.hideAllRecoverMesssages();
    			
    			$('#recoverEmail').focus();
    		},
    		
    		showHideRecoverButton : function (ve, vfe) {
    			if (ve && vfe) {
                	_r.showRecoverButton();
            	} else {
                	_r.hideRecoverButton();
            	}
    		},
    		
    		showHideEmailMsg : function (ve, vfe) {
            	gb.showHideEmailMsg(ve, vfe, '#recoverEmailMsg');
    		},
    		
    		recovered : function () {
    			_r.initRecoverDiv();
    			window.location.href = '#/recovered';
    		},
    		
    		userNotFound : function () {
    			$('#recoverUserNotFoundDiv').show().delay(10500).fadeOut('slow', function () {});
    			_r.baseRecoverDiv();
    		},
    		
    		unhandledRecoverException : function () {
    			$('#recoverUserException').show().delay(10500).fadeOut('slow', function () {});
    			_r.hideRecoverButton();
    			$('#recoverEmail').focus();
    		},
    		
    		recoverBtnClick : function () {
    			var un = $('#recoverEmail').val();
    			
    			if (un !== '')
    			{
    				_r.hideRecoverButton();
    			
    				$.ajax({
						url: '/recover/do',
    					type: 'POST',
    					cache: false,
    					headers: { "cache-control": "no-cache" },
    					data: 'to=' + escape(un),
    					success: function (data) {
    						var res = JSON.stringify(data);
    						
    						// User found...
    						if (res.indexOf('recovered OK') >= 0) {
    							_r.recovered();
    						} else // User not found...
    						{
    							_r.userNotFound();
    						}
    					},
    					error: function (jqXHR, textStatus, err) {
    						_r.unhandledRecoverException();
    					}
					});
				}
				
				return false;
    		},
    		
    		fieldChange : function (e) {
    			var ve = gb.validateEmail($('#recoverEmail').val()),
            		vfe = !gb.validateFreeEmail($('#recoverEmail').val());
            	
            	_r.showHideRecoverButton(ve, vfe);
            
                _r.hideAllRecoverMesssages();
                _r.showHideEmailMsg(ve, vfe);
            	
            	if (e.which === 13) {
            		$('#recoverButtonEnabled').trigger('click');
            	}
    		}
    	};
        
        $('#recoverEmail').on('input', function (e) {
            _r.fieldChange(e);
        });
    	
    	$('#recoverEmail').focusout(function (e) {
    		if ($('#recoverEmail').val() === '') {
    			$('#recoverEmailMsg').text('');
    		}
    		else {
    			var str = $('#recoverEmail').val();
    			str = gb.cleanField(str);
    			$('#recoverEmail').val(str.toLowerCase());
    		}
    	});
    	
    	$('#recoverEmail').keyup(function (e) {
            _r.fieldChange(e);
        });
    	
    	$('#recoverButtonEnabled').click(function () {
            _r.recoverBtnClick();
            return false;
        });
    	
    	recover.initRecoverDiv = function () {
    		_r.initRecoverDiv();
    	};
    
    }(window.recover = window.recover || {}, window.jQuery));
    
    (function(carousels, $, undefined) {
	
		var _c = {
			toggleSlide : function () {
				if ($('#slide1').is(':visible')) {
 					$('#slide1').delay(100).hide();
 					$('#slide2').show();
 				}
 				else {
 					$('#slide2').delay(100).hide();
 					$('#slide1').show();
 				}
			},
			
			nextSlide : function () {
				_c.toggleSlide();
			},
			
			start : function () {
				$('#slide2').show();
				
				window.setInterval(function () {
 					_c.toggleSlide();
				}, 5000);
			}
		};
		
		carousels.start = function () {
			_c.start();
		};
		
		$('#backSlide').click(function () {
            _c.nextSlide();
        });
        
        $('#nextSlide').click(function () {
            _c.nextSlide();
        });
    
	}(window.carousels = window.carousels || {}, window.jQuery));

    (function (adminsignup, portal, viewer, usersettings, recover, login, signup, routing, $, undefined) {

        var iterating = false, rt = window.location.hash.slice(2);
        
        var _r = {

        	menuMain : function () {
            	$('#MenuMainDiv').show();
            	$('#MenuPortalDiv').hide();
            	$('#MenuLogoutDiv').hide();
        	},

        	menuPortal : function () {
            	$('#MenuMainDiv').hide();
            	$('#MenuPortalDiv').show();
            	$('#MenuLogoutDiv').hide();
        	},

        	menuLogout : function () {
            	$('#MenuMainDiv').hide();
            	$('#MenuPortalDiv').hide();
            	$('#MenuLogoutDiv').show();
        	},

        	hideAll : function () {
            	$('#page-index').hide();
            	$('#logindiv').hide();
            	$('#logoutdiv').hide();
            	$('#aboutdiv').hide();
            	$('#featuresdiv').hide();
            	$('#faqsdiv').hide();
            	$('#signupdiv').hide();
            	$('#adminsignupdiv').hide();
            	$('#howdiv').hide();
            	$('#portaldiv').hide();
            	$('#page404div').hide();
            	$('#activationFailedDiv').hide();
            	$('#alreadyActivatedDiv').hide();
            	$('#activationSuccessfulDiv').hide();
            	$('#signupActivationDiv').hide();
            	$('#signupPendingDiv').hide();
            	$('#recoverdiv').hide();
            	$('#recovereddiv').hide();
            	$('#usersettingsdiv').hide();
            	$('#usersettingsfaileddiv').hide();
            	$('#viewerdiv').hide();
        	},

        	notFound : function (rt) {
            	if (_r.isLoggedIn()) {
                	window.location.href = '#/portal';
            	} else {
                	window.location.href = '#/';
            	}
        	},

        	aboutPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#aboutdiv').show();
        	},
        	
        	capitalize : function (user) {
        		if (user.indexOf("@") >= 0) {
        			user = gb.capitalize(user);
        		}
        		
        		return user;
        	},

        	welcome : function () {
        		var user = unescape($.cookie('splgckie'));
        		
        		$('#portalSmall').text(_r.capitalize(user));
    			login.setDomain(user);
        	},

        	portalPage : function () {
            	if (_r.isLoggedIn()) {
            	
            		iterating = false;
            		
                	_r.menuPortal();
                	_r.hideAll();
                	
                	$('#portaldiv').show();
                	
                	_r.welcome();
                	portal.initTable();
                	
            	} else {
                	window.location.href = '#/login';
            	}
        	},

        	featuresPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#featuresdiv').show();
        	},

        	faqsPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#faqsdiv').show();
        	},

        	isLoggedIn : function () {
            	return ($.cookie('splgckie')) ? true : false;
        	},

        	loginPage : function () {
            	if (_r.isLoggedIn()) {
                	window.location.href = '#/portal';
            	} else {
                	_r.menuMain();
                	_r.hideAll();
                	$('#logindiv').show();

                	login.initLoginDiv();
            	}
        	},
        	
        	recoverPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#recoverdiv').show();

            	recover.initRecoverDiv();
        	},
        	
        	recoveredPage : function () {
        		_r.menuMain();
            	_r.hideAll();
            	$('#recovereddiv').show();
        	},

        	logoutPage : function () {
            	if (_r.isLoggedIn()) {
                	_r.menuLogout();
                	_r.hideAll();
                	$('#logoutdiv').show();
            	} else {
                	window.location.href = '#/login';
            	}
        	},

        	signupPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#SignUpTitle').text('Supplier Sign Up');
            	$('#signupdiv').show();

            	signup.initSignupDiv();
        	},
        	
        	adminSignup : function () {
        		_r.menuMain();
            	_r.hideAll();
            	$('#SignUpTitle').text('Admin Sign Up');
            	$('#signupdiv').show();

            	signup.initSignupDiv();
        	},

        	homePage : function () {
            	if (_r.isLoggedIn()) {
                	window.location.href = '#/portal';
            	} else {
                	_r.menuMain();
                	_r.hideAll();
                	
                	$('#page-index').show();
            	}
        	},

        	howPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#howdiv').show();
        	},

        	page404 : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#page404div').show();
        	},

        	render404 : function () {
            	window.location.href = '#/404';
        	},

        	activationFailedPage : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#activationFailedDiv').show();
        	},

        	alreadyActivated : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#alreadyActivatedDiv').show();
        	},

        	activationSuccessful : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#activationSuccessfulDiv').show();
        	},

        	signupActivation : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#signupActivationDiv').show();
        	},
        	
        	signupPending : function () {
            	_r.menuMain();
            	_r.hideAll();
            	$('#signupPendingDiv').show();
        	},
        	
        	usersettingsPage : function () {
        		if (_r.isLoggedIn()) {
                	_r.menuPortal();
                	_r.hideAll();
                	
                	usersettings.initSettingsDiv();
            	} else {
                	window.location.href = '#/login';
            	}
        	},
        	
        	route2Page : function (rt) {
            	if (rt === '' && window.location.href.indexOf('#/') < 0) {
                	window.location.href += '#/';
                	_r.homePage();
            	} else if (rt === 'about') {
                	_r.aboutPage();
            	} else if (rt === 'features') {
                	_r.featuresPage();
            	} else if (rt === 'faqs') {
                	_r.faqsPage();
            	} else if (rt === 'login') {
                	_r.loginPage();
            	} else if (rt === 'recover') {
                	_r.recoverPage();
            	} else if (rt === 'recovered') {
                	_r.recoveredPage();
            	} else if (rt === 'signup' || rt === 'usersignup') {
                	_r.signupPage();
                } else if (rt === 'adminsignup') {
                	_r.adminSignup();
            	} else if (rt === 'how') {
                	_r.howPage();
            	} else if (rt === 'portal') {          
            		_r.portalPage();
            	} else if (rt === 'logout') {
                	_r.logoutPage();
            	} else if (rt === '404') {
                	_r.page404();
            	} else if (rt === 'activationfailed') {
                	_r.activationFailedPage();
            	} else if (rt === 'activationusernotfound') {
                	_r.alreadyActivated();
            	} else if (rt === 'activationsuccessful') {
                	_r.activationSuccessful();
            	} else if (rt === 'signupactivation') {
                	_r.signupActivation();
            	} else if (rt === 'signuppending') {
                	_r.signupPending();
            	} else if (rt === 'usersettings') {
                	_r.usersettingsPage();
            	}
        	}
        };

        var routes = {
        	'/': _r.homePage,
            '/about': _r.aboutPage,
            '/features': _r.eaturesPage,
            '/faqs': _r.faqsPage,
            '/login': _r.loginPage,
            '/recover': _r.recoverPage,
            '/recovered': _r.recoveredPage,
            '/signup': _r.signupPage,
            '/usersignup': _r.signupPage,
            '/adminsignup': _r.adminSignup,
            '/how': _r.howPage,
            '/portal': _r.portalPage,
            '/logout': _r.logoutPage,
            '/404': _r.page404,
            '/activationfailed': _r.activationFailedPage,
            '/activationusernotfound': _r.alreadyActivated,
            '/activationsuccessful': _r.activationSuccessful,
            '/signupactivation': _r.signupActivation,
            '/signuppending': _r.signupPending,
            '/usersettings' : _r.usersettingsPage
        };

        routing.start = function () {
            var router = new Router(routes).configure({
                notfound: _r.render404
            });
            router.init();

            _r.route2Page(rt);
        };

    }(window.adminsignup, window.portal, window.viewer, window.usersettings, window.recover, window.login, window.signup, window.routing = window.routing || {}, window.jQuery));

	if (!jQuery.browser.mobile) {
   		gb.doReject();
   	}
	
	routing.start();
	carousels.start();

})(window.jQuery);