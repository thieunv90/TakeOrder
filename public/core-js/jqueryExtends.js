if (typeof(console) == 'undefined') {
	console = {};
	console.log = function() {
	};
	console.error = function() {
	};
	console.info = function() {
	};
}

function t(key) {
    if(typeof(App) != "undefined"){
    	return App.t(key);
    }
    return key;
}

(function($) {
	var scripts = [];
	var loadScript = function(url, callback, context) {
		var script = scripts[url] || (scripts[url] = {
			loaded    : false,
			callback : null
		});

		if(script.loaded) {
			return callback.apply(context);
		}

		script.callback = {
			fn      : callback,
			context : context
		};

		jQuery.ajax({
			type     : 'GET',
			url      : url,
			dataType : 'script',
			cache    : true,
			error: function(data, error, ref){
				alert(ref);
			},
			success  : function() {
				script.loaded = true;
				script.callback.fn.apply(context);
			}
		});
	}
	
	var extendsFunctions = {
		getUrlParameter : function(name, url) {
			var search = url || location.href;
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(search)||[,""])[1].replace(/\+/g, '%20'))||null;
		},
		isNumber : function(v) {
			return typeof v === 'number' && isFinite(v);
		},
		isDefined : function(v) {
			return typeof v !== 'undefined';
		},
		random: function(min, max) {
		    return min + Math.floor((max - min + 1) * (Math.random() % 1));
		},
        // return data itself if NOT undefined or NOT null or NOT empty
		pick: function (data, value) {
		    if (typeof (data) == 'undefined' || data == null || data == '') {
		        return value;
		    }
		    return data;
		},
		apply : function(o, c, defaults) {
			// no "this" reference for friendly out of scope calls
			if (defaults) {
				jQuery.apply(o, defaults);
			}
			if (o && c && typeof c == 'object') {
				for (var p in c) {
					o[p] = c[p];
				}
			}
			return o;
		},
		id : function() {
			if (typeof(jQuery.idSeed) != 'undefined')
				jQuery.idSeed++;
			else
				jQuery.idSeed = 0;

			return "el-" + new Date().getTime() + jQuery.idSeed;
		},
		createElement : function(obj) {

			if (typeof(obj) == 'undefined') {
				obj = {};
			}

			obj.el = (typeof(obj.el) != 'undefined') ? obj.el : "div";
			obj.id = (typeof(obj.id) != 'undefined') ? obj.id : jQuery.id();

			var standardAttr = ['id', 'name', 'value', 'class', 'lang', 'type',
					'style', 'href', 'alt', 'title', 'for', 'selected',
					'checked', 'action', 'method', 'autocomplete', 'readonly',
					'disabled', 'multiple', 'size', 'maxlength', 'enctype', 'max'];

			var html5JqueryMobileAttr = ['data_role', 'data_mini', 'data_inset', 'data_filter', 
					'data_icon', 'data_theme', 'data_rel', 'data_transition', 
					'data_type', 'data_overlay_theme', 'role', 'required'];
					
			var el = document.createElement(obj.el);
			el.setAttribute("id", obj.id);

			jQuery.each(obj, function(k, v) {
				if (jQuery.inArray(k, standardAttr) != -1) {
					if (k != 'disabled' && v != '') {
						el.setAttribute(k, v);
					}
				}
				else if(jQuery.inArray(k, html5JqueryMobileAttr) != -1 || k.substr(0, 5) == "data_" || k.substr(0, 5) == "data-"){
					k = k.replace("_", "-");
					el.setAttribute(k, v);
				}
			});
			if (typeof(obj.cls) != 'undefined'){
				el.setAttribute("class", obj.cls);
				if (obj.cls.indexOf('ui-disabled')>=0){
					el.removeAttribute('href');
				}	
			}	

			if (obj.style)
				el.setAttribute("style", obj.style);

			if (obj.height)
				el.setAttribute("height", obj.height);

			if (obj.width)
				el.setAttribute("width", obj.width);

			if (obj.autoHeight === true) {
			}

			if (obj.autoWidth === true)
				el.setAttribute("width", "100%");

			// direct render?
			if (obj.renderTo) {
				jQuery(obj.renderTo).append(el);
			}

			if (obj.html) {
				if (obj.el != 'input')
					el.innerHTML = obj.html;
				else
					el.setAttribute("value", obj.html);
			}
						
			return jQuery(el);
		},
		cloneObj : function(o) {
			function CL() {
			}

			CL.prototype = o;
			return new CL();
		},
		namespace : function() {
			var o, d;
			jQuery.each(arguments, function(i, v) {
				d = v.split(".");
				o = window[d[0]] = window[d[0]] || {};
				jQuery.each(d.slice(1), function(i, v2) {
							o = o[v2] = o[v2] || {};
						});
			});
			return o;
		},
		requireScript: function(url, callback, context, options) {
	
			if(typeof options === 'undefined' && context && context.hasOwnProperty('parallel')) {
				options = context;
				context = window;
			}
	
			if(!options.hasOwnProperty('parallel')){
				options = jQuery.extend({parallel : true}, options);
			}
	
			if(!jQuery.isArray(url)) {
				return loadScript(url, callback, context);
			}
	
			var counter = 0;
	
			// parallel loading
			if(options.parallel) {
				return jQuery.each(url, function() {
					loadScript(this, function() {
						if(++counter == url.length) {
							callback.apply(context);
						}
					}, context);
				});
			}
	
			// sequential loading
			(function() {
				if(counter == url.length) {
					return callback.apply(context);
				}
				loadScript(url[counter++], arguments.callee, context);
			})();
	
		}
	}
	$.extend(extendsFunctions);
})(jQuery);

jQuery.ns = jQuery.namespace;

jQuery.extend(Function.prototype, {
	createCallback: function(obj, args, appendArgs) {
		var method = this;
		return function() {
			var callArgs = args || arguments;
			if (appendArgs === true) {
				callArgs = Array.prototype.slice.call(arguments, 0);
				callArgs = callArgs.concat(args);
			} else if (jQuery.isNumber(appendArgs)) {
				callArgs = Array.prototype.slice.call(arguments, 0); // copy
				var applyArgs = [appendArgs, 0].concat(args); // create
				Array.prototype.splice.apply(callArgs, applyArgs); // splice
			}
			return method.apply(obj || window, callArgs);
		};
	},
	defer: function(millis, obj, args, appendArgs) {
		var fn = this.createCallback(obj, args, appendArgs);
		if (millis > 0) {
			return setTimeout(fn, millis);
		}
		fn();
		return 0;
	}
});
