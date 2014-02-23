App = {
    config: {
        dateTemplatePhone: 'mm-dd-yy',
        dateTemplateService: 'yy-mm-dd'
    },
	debug: true,
	exitPageIDs: ['home-page', 'login-page'],
	isPhone: (navigator.platform.indexOf("Win") < 0)
};

/**
 * Init Application
 */
App.init = function(cfg) {
    this.config = $.extend(this.config, cfg);

	// Init event
	App.initEvent();

	if(!App.isPhone){
		 cordova.exec = function(){
			 console.info("No cordova exec function support when you are not running in phone");
		 };
	}
	App.log("App Inited");
};

App.initEvent = function () {
	document.addEventListener("deviceready", function() {
		navigator.splashscreen.hide();
		// Click menu button to show menu
		/*
	    document.addEventListener("menubutton", function () {
			App.showSettingMenu();
		}, false);
		*/
		// Register event click back button
		/*
		 * Not in homepage
		 */

		document.addEventListener("backbutton", function () {
			if($.inArray($.mobile.activePage.attr('id'), App.exitPageIDs) >= 0) {
					App.exit();
			}else {
				navigator.app.backHistory();
			}
		}, false);

		// Register event when pause app
		//document.addEventListener("pause", onPause, false);

		// Register event onResume
		//document.addEventListener("resume", onResume, false);


		// Test network connection
	}, false);

};

App.showSettingMenu = function () {
	 App.showConfirm("Menu here", function() {
	 	//TODO Write menu code here
	 });
};

App.exit = function() {
	App.showConfirm("Bạn có muốn thoát khỏi ứng dụng này?", function(buttonIndex) {
		if(buttonIndex == 2) {
			App.logout();
		}
	});
};
App.logout = function () {
	if(App.isPhone) {
		navigator.app.exitApp();
	}
}

function onPause () {
	console.log("onPause");
}
function onResume () {
	// Use function to get new data when app resume
	console.log("onResume");
}
/*******************************************************
 *
 * GENERAL
 *
 *******************************************************/
App.t = function (text) {
	if (this.langData[text]) {
		return this.langData[text];
	}
	return text;
};


App.hasInternet = function () {
  return true;
	// if(!App.isPhone) return true;
	// return navigator.network.connection.type != Connection.NONE;
};

App.isWifiConnection = function () {
	if(!App.isPhone) return true;
	return navigator.network.connection.type == Connection.WIFI;
};

App.showConfirm = function (message, callback) {
  return true;
    navigator.notification.confirm(
        message,   // message
        callback,  // callback to invoke with index of button pressed
        'Take Order',  // title
        'No,Yes'   // buttonLabels
    );
};
App.showAlert = function (message, callback, buttonTitle) {
  return true;
	// if(!App.isPhone){
	// 	alert(message);
	// 	return;
	// }
	// navigator.notification.alert(
	// 	message, // message
	// 	callback, // callback to invoke when alert dialog is dismissed
	// 	'Take Order', // title
	// 	buttonTitle // button
	// );
};
App.showPrompt = function(message, callback){
	navigator.notification.prompt(
		message, // message
		callback, // callback to invoke when alert dialog is dismissed
		"Take Order", // title
		"OK" // button
	);
};
App.log = function () {
    if (!this.debug) return;
    for (var i = 0; i < arguments.length; i++) {
        if (typeof (arguments[i]) == "object" && this.isPhone) {
            try {
                arguments[i] = JSON.stringify(arguments[i]);
            } catch (e) { }
        }
        console.log(arguments[i]);
    }
};

App.gotoPage = function (page, args) {
    var args = args || {};
    App.loading(true);
    args.showLoadMsg = false;
    $.mobile.changePage(page, args);
};

App.loading = function(show){
	if(typeof(show) == "undefined"){
		show = true;
	}
	if(App.useModalLoading){
		$(".modalWindow").remove();
	}
	try{
		if(!show) {
			if(App.useModalLoading){
				$(".modalWindow").remove();
			}
			$.mobile.loading('hide');
			clearTimeout(App.loadingTimer);
			App.loadingTimer = null;
			if(App.iScroll){
				App.iScroll.refresh();
			}
			return;
		}
		if(!$('#loading-indicator').is(':visible')){
			// Loading dialog is showing
			if(App.useModalLoading){
				$(document.body).append('<div class="modalWindow"/>');
			}
		}

		$.mobile.loading( 'show', {
			text: 'Loading',
			textVisible: true,
			theme: 'a',
			html: "<div id='loading-indicator'>Vui lòng đợi trong giây lát...</div>"
		});
		if(App.loadingTimer != null){
			clearTimeout(App.loadingTimer);
		}
		App.loadingTimer = setTimeout(function(){
			if($('#loading-indicator').is(':visible')){
				$('#loading-indicator').html("Vui lòng đợi trong giây lát...");
			}
		}, App.loadingTimerInterval);
	}
	catch(e){}
	return this;
};
App.urlParam = function(name)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == name)
        {
            return sParameterName[1];
        }
    }
};