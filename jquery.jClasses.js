jQuery(function() {
	jQuery.extend({
	   Class	:  {
		   options	: {
			   Class_js		: {
				   'name'		: 'javascriptMVC.class',
				   'path'		: 'js/jClasses',
				   'prefix'		: ''
			   },
			   'extending'	: {
				   'public'		: {},
				   'private'	: {}
			   },
			   'import'			: true,
			   'Scripts'		: { callback : function() { return false; }},
			   'callback'		: function() { return true; }
		   },
		   init			: function(options) {
				options = (typeof(options) == 'object') ? jQuery.extend(true, jQuery.Class.options, options) : jQuery.Class.options;
				options = jQuery.extend({}, jQuery.Class.options.Class_js, options);
			 
				return jQuery.Class.Scripts.load(options.Class_js.name, options);
		   },
		   extending	: function(parentClass, a, b) {
			   initArguments = typeof(a) == 'object' ? a : (typeof(b) == 'object' ? b : {});
			   initCallback = typeof(a) == 'function' ? a : (typeof(b) == 'function' ? b : function() { return true; });
			   
			   if(typeof(this.selector) != 'string') { return callback(false); }
			   
			   className = this.selector;

			   var scriptOptions = jQuery.Class.options.Scripts;
			   scriptOptions.callback = function(arguments) {
				   if(typeof(window[className]) != 'object') { return initCallback(false); }
				   var classMethods = {
					   protected : typeof(window[className].public) == 'object' ? window[className].public : {},
 					   public : typeof(window[className].private) == 'object' ? window[className].private : {}
				   };
				   window[className] = parentClass.extend(className, classMethods.public, classMethods.protected);
				   if(typeof(window[className]) == 'function') {
					   $[className] = new window[className](initArguments);
					   return typeof($[className]) == 'object' ? initCallback($[className]) : initCallback(false);
				   }
				   return initCallback(false);
			   };

			   return jQuery.Class.Scripts.load(className, scriptOptions);
		   },
		   Scripts	: {
		   		options	: {
		   			path		: 'js/jClasses/',
					extension	: '.js',
					prefix		: 'jClass.',
					callback	: function() { return true; }
		   		},
				loaded	: [],
		   		load	: function(script, options) {
					if(!typeof(script) == 'string') { return false; }
					
					options = typeof(options == 'object') ? jQuery.extend({}, jQuery.Class.Scripts.options, options) : jQuery.Class.Scripts.options;
					path = options.path + options.prefix + script + options.extension;
					return jQuery.getScript(path, function(data, textStatus) {
						if(textStatus !== 'success') { return false; }
						$.merge(jQuery.Class.Scripts.loaded, [path]);
						return options.callback(arguments);
					});
				}
		   }
		}
	});
	
	jQuery.fn.extending = jQuery.Class.extending;
});