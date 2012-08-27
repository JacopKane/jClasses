var Util = {
	protected	: {},
	public	: {
		alert			: function(text, text2, callback) {
			text = Util.defaultVariable(text, 'string');
			text2 = Util.defaultVariable(text2, 'bool');
			if(text2 !== false) { text += "\n" + text2; }
			
			callback = Util.defaultVariable(callback, 'function');
			
			return callback();
		}, //Util.alert
		defaultVariable	: function(variable, type) {
			if(type != 'element', typeof(variable) == type) { return variable; }
			
			switch(type) {
				case 'object'	:
					return { };
				break;
				
				case 'array'	:
					return new Array();
				break;
				
				case 'bool'		:
					return false;
				break;
				
				case 'element'	:
					if(element.length != undefined && element.length > 0) { return element; }
					else if($(element).length != undefined && $(element).length > 0) { return $(element); }
					return false;
				break;
				
				case 'number'	:
					return 0;
				break;
				
				case 'string'	:
					return '';
				break;
				
				case 'function' :
					return function() { return true; };
				break;
				
				default			:
					return false;
				break;
			}
		}, //Util.defaultVariable
		JSON			: function(path, callback) {
			if(typeof(JSON) == 'object' && typeof(JSON.parse) == 'function' && typeof(JSON.stringify) == 'function') {
				return true;
			}
			
			path = typeof(path) == 'string' ? path : 'vendor/js/json2.js';
			callback = typeof(callback) == 'function' ? callback : function() { return true; }
			
			return $.getScript(path, function(a,b,c) {
				return callback(a,b,c);
			});
		}, //Util.JSON
		options			: {
			loading	: {
				_init		: false,
				_isLoading	: false,
				$avoider	: $('div.avoider'),
				$loader		: $('div.loader'),
				width		: $(window).width(),
				height		: $(window).height(),
				duration	: 'slow',
				easing		: 'swing',
				opacity		: '.4',
				onResize	: function(options) {
					options.$avoider
						.width($(window).width())
						.height($(window).height());
				},
				onStop		: function(status, options) { return options._callback(status, options); }
			}
		},
		loading			: function(toggle, callback, options) {
			
			$Util = this;
			
			toggle = typeof(toggle) == 'boolean' ? toggle : false;
			callback = typeof(callback) == 'function' ? callback : function(status, options) { return status; };
			options = typeof(options) == 'object' ? options : {};
			
			options._callback = callback;
			
			options = $.extend({}, true, $Util.options.loading, options);
			if(!options.$avoider.length || !options.$loader.length) {
				return options.onStop(false, options);
			}
			
			$avoider = options.$avoider;
			$loader	= options.$loader;
			
			if(!options._init) {
				$avoider.hide();
				$loader.hide();
				$avoider.fadeOut(0);
				$loader.fadeOut(0);
				
				options.onResize(options);
				$(window).resize(function() {
					return options.onResize(options);
				});
				
				$Util.options.loading._init = true;
			}
			
			//console.log('isLoading', options._isLoading, 'toggle', toggle);
			//console.log('callback', callback);
			
			if(toggle && !options._isLoading) {
				return $avoider.fadeTo(options.duration, options.opacity, options.easing, function() {
					return $loader.fadeTo(options.duration, '1', options.easing, function() {
						$Util.options.loading._isLoading = true;
						return options.onStop(true, options);
					});
				});
			} else if(!toggle && options._isLoading) {
				return $loader.fadeTo(options.duration, '0', options.easing, function() {
					$loader.hide();
					return $avoider.fadeTo(options.duration, '0', options.easing, function() {
						$avoider.hide();
						$Util.options.loading._isLoading = false;
						return options.onStop(true, options);
					});
				});
			}	
			
			return options.onStop(false, options);
		}, //Util.loading
		isNumeric		: function(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		}, //Util.isNumeric
		textAreaValue	: function($this) {
			if(typeof($this) != 'object' || !$this.length || typeof($this.val()) != 'string') { return false; }
			var preValue = $this.val();
			$this.focus(function() {
				if($this.val() == preValue || $this.val() == '') {
					$this.val('');
					return $this.focusout(function() {
						if($this.val() == '') {
							return $this.val(preValue);
						}
					});
				}
			});
		} //Util.textAreaValue
	}
}; //jClass.Util