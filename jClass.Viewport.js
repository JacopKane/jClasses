var Viewport = {
	protected	: { },
	public	: {
		_current		: 0,
		options : {
			width		: 520,
			height		: 800,
			direction	: {
				type	: 'horizontal',
				size	: false,
				margin	: false
			},
			animation	: {
				duration	: 'medium',
				easing		: 'swing'
			},
			$view		: false,
			$slide		: false,
			$ports		: false,
			afterSlide	: function(object) { return true; },
			beforeSlide	: function(position, object) { return true; }
		},
		go : function(position, callback) {
			
			this.options.beforeSlide(position, this);
			
			if(position > (this.options.$ports.length - 1) || position == this._current) { 
				return this.options.afterSlide(false);
			}
			
			var current = {
				margin		: parseInt(this.options.$slide.css(this.options.direction.margin)),
				position	: this._current
			};
			
			callback = (typeof(callback) == 'function') ? callback : this.options.afterSlide;
			
			var animationProperties = { };
			animationProperties[this.options.direction.margin] = (0 - (position * this.options[this.options.direction.size])) + 'px';
			var $instance = this;
			
			return this.options.$slide.animate( animationProperties, {
					complete	: function() {
						$instance._current = position;
						return callback($instance);
					},
					duration	: $instance.options.animation.duration,
					easing		: $instance.options.animation.easing
			});
		},
		prev : function(callback) {
			var position = ((this._current - 1) < 0) ? (this.options.$ports.length - 1) : this._current - 1;
			return this.go(position, callback);
		},
		next : function(callback) {
			var position = ((this._current + 1) > (this.options.$ports.length - 1)) ? 0 : this._current + 1;
			return this.go(position, callback);
		},
		init	: function(arguments) {
			if(!this._super(arguments)) { return false; }
			
			if(!this.options.$view || !this.options.$view.length) { return false; }
			
			this.options.direction.margin = this.options.direction.type == 'vertical' ? 'marginTop' : 'marginLeft';
			this.options.direction.size	= this.options.direction.type == 'vertical' ? 'height' : 'width';
						
			this.options.$slide = this.options.$view.children(':first');
			this.options.$ports = this.options.$slide.children();
			
			if(!this.options.$slide.length || !this.options.$ports.length) { return false; }
			
			this.options.$view
				.width(this.options.width)
				.height(this.options.height)
				.css('overflow', 'hidden');
				
			this.options.$slide
				.addClass('clearfix')
				.css(this.options.direction.margin, 0)
				.height(this.options.direction.type == 'vertical' ? (this.options.height * this.options.$ports.length) : this.options.height)
				.width(this.options.direction.type == 'horizontal' ? (this.options.width * this.options.$ports.length) : this.options.width);
			
			this.options.$ports
				.css('float', 'left')
				.width(this.options.width)
				.height(this.options.height);
		}
		
	}
}; //jClass.Viewport