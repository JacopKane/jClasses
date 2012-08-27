var Facebook = {
	protected	: {
		
	},
	public	: {
		options	: {
			appId		: 'YOUR_APP_ID', // App ID
			channelUrl	: window.location.href + 'channel.php',
			status		: true, // check login status
			cookie		: true, // enable cookies to allow the server to access the session
			xfbml		: true,  // parse XFBML
			oauth		: true,
			language	: 'en_US',
			afterInit	: function() { return true; }
		},
		init	: function(arguments) {
			if(!this._super(arguments)) { return false; }
			var options = this.options;
			
			if(!$('div#fb-root').length) {
				$('body').prepend('<div id="fb-root"></div');
			}
			
			window.fbAsyncInit = function() {
				var callback = options.afterInit;
				delete options.afterInit;
				
				FB.init(options);
				
				return callback(FB);
			};
			
			// Load the SDK Asynchronously
			return (function(d) {
				var js, id = 'facebook-jssdk';
				if (d.getElementById(id)) {return false;}
				js = d.createElement('script');
				js.id = id;
				js.async = true;
				js.src = "https://connect.facebook.net/" + options.language + "/all.js";
				d.getElementsByTagName('head')[0].appendChild(js);
			}(window.self.document));
		}
	}
}; //jClass.Facebook