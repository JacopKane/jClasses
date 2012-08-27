var Upload = {
	protected	: { },
	public	: {
		_setup	: function() {
			if(!this.options.init) { return false; }
			var options = this.options;
			options.Scripts.callback = function() {
				options.Scripts.callback = function() {
					options.Scripts.callback = function() {
						if(!options.$uploader.fileupload()) { return options.callback(false); }
						options.$uploader.fileupload('option', options);
						return options.$uploader
							.bind('fileuploadstart', function (e, data) {
								return options.start(data);
							})
							.bind('fileuploaddone', function (e, data) {
								data.result = typeof(data.result) != 'object' ? {} : data.result;
								return options.callback(data.result);
							})
							.bind('fileuploadfail', function (e, data) {
								return options.callback(false);
							});
					};
					return jQuery.Class.Scripts.load('jquery.fileupload', options.Scripts);
				};
				return jQuery.Class.Scripts.load('jquery.iframe-transport', options.Scripts);
			};
			return jQuery.Class.Scripts.load('vendor/jquery.ui.widget', options.Scripts);
		},
		options	: {
			dataType	: 'json',
			url			: 'api/save/?uploadPhoto',
			$uploader	: false,
			start		: function(data) { return true; },
			callback	: function(data) { return true; },
			Scripts		: {
				path	: 'vendor/packages/jQuery-File-Upload/',
				prefix	: ''
			}
		},
		init	: function(arguments) {
			if(!this._super(arguments)) { return false; }
			var options = this.options;
			
			if(!options.$uploader.length) { return false; }
			
			return this._setup();
		}
	}
}; //jClass.Upload