var Gallery = {
	protected	: { },
	public	: {
		options : {
			source		: 'api/get/?allImages',
			$gallery	: false,
			thumbPrefix	: 't_',
			rel			: 'thumbnails',
			path		: 'external/',
			fancyClass	: 'fancybox',
			linkClass	: 'thumbnail_',
			callback	: function() { return true; },
			fancybox	: {},
			Scripts		: {
				path		: 'vendor/packages/fancyBox/source/',
				name		: 'jquery.fancybox.pack',
				prefix		: '',
				callback	: function() { return true; }
			}
		},
		openImage			: function(id) {
			return this.options.$gallery.children('a.' + this.options.linkClass + id).click();
		},
		linkTemplate		: function(picture, id) {
			picture = {
				thumbnail	: this.options.path + this.options.thumbPrefix + picture,
				image		: this.options.path + picture,
				rel			: this.options.rel ? this.options.rel : ''
			};

			var template = '';
			template += '<a rel="' + picture.rel + '" href="' + picture.image + '" class="' + this.options.fancyClass + ' ' + this.options.linkClass + id + '">';
			template += '<img src="' + picture.thumbnail + '" />';
			template += '</a>';
			return template;
		},
		_getFancyBox	: function(callback) {
			if(typeof(callback) == 'function') { this.options.Scripts.callback = callback; }
			$('head').append('<link rel="stylesheet" href="' + this.options.Scripts.path + 'jquery.fancybox.css" type="text/css" />');
			
			$instance = this;
			this.options.Scripts.callback = function() {
				jQuery('.' + $instance.options.fancyClass).fancybox($instance.options.fancybox);
				return $instance.options.callback($instance);
			};
			
			
			return jQuery.Class.Scripts.load(this.options.Scripts.name, this.options.Scripts);
		},
		_setup			: function() {
			if(!this.options.init) { return false; }
			var options = this.options;
			
			$gallery = options.$gallery;
			$instance = this;

			return jQuery.getJSON(options.source, function(response) {
				if(typeof(response.data) != 'object' || !response.status) { return false; }
				var html = '';
				jQuery.each(response.data, function() {
					html += $instance.linkTemplate(this.picture, this.id);
				});
				
				$gallery
					.html(html)
					.css('overflow-y', 'visible');
				$gallery
					.height(599)
					.css('overflow-y', 'auto')
					.height(600);
					
				return (typeof(jQuery.fancybox) != 'object') ? $instance._getFancyBox($instance.options.callback) : $instance.options.callback();
			}) ? true : false;
		},
		init		: function(arguments) {
			if(!this._super(arguments)) { return false; }
			if(!this.options.$gallery.length || typeof(this.options.source) != 'string' || typeof(this.options.callback) != 'function') { return false; }
			return this._setup();
		}
		
	}
}; //jClass.Gallery