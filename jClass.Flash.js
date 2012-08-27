var Flash = {
	protected	: { },
	public		: {
		options		: {
			replaceId			: 'myAlternativeContent',
			path				: 'swf/',
			extension			: '.swf',
			version				: '10.0.0',
			installer			: 'swf/expressInstall.swf',
			attributes			: { id : 'flashDiv', name : 'flashDiv', AllowScriptAccess : 'always' },
			params				: { wmode : 'opaque', AllowScriptAccess : 'always' },
			flashVars			: { },
			Script				: {
				path			: 'vendor/js/',
				name			: 'swfobject',
				prefix			: '',
				_callback		: function() { return $.Flash._embed(); }
			}
		},
		fixReference	: function() {
			var flashId = 'flashDiv';
			return window[flashId] = document.getElementById(flashId);
		},
		_embed			: function() {
			swfobject.embedSWF(
				this.options.path + this.options.name + this.options.extension, 
				this.options.replaceId,
				this.options.width,
				this.options.height,
				this.options.version,
				this.options.installer,
				this.options.flashVars,
				this.options.params,
				this.options.attributes
			);
			return swfobject.addDomLoadEvent($.Flash.fixReference) ? true : false;
		},
		init			: function(arguments) {
			if(typeof(name) != 'string' || typeof(container) != 'object' || typeof(container) != 'object') { return false; }
			if(!this._super(arguments)) { return false; }
			//return true;
			
			var options = this.options;
			
			options.Script.callback = options.Script._callback;
			if(typeof(swfobject) != 'object') {
				return $.Class.Scripts.load(options.Script.name, options.Script);
			}
			return options.Script.callback(this);
		}
	}
}