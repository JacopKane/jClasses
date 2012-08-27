var Analytics = {
	protected	: {},
	public		: {
		options		: 	{ trackCode	: false },
		init		:	function(arguments) {
			if(!this._super(arguments) || typeof(this.options.trackCode) != 'string') { return false; }
			
			window._gaq = window._gaq || [];
			window._gaq.push(['_setAccount', trackCode]);
			window._gaq.push(['_trackPageview']);

			return (function(document) {
				window.ga = document.createElement('script'); window.ga.type = 'text/javascript'; window.ga.async = true;
				window.ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				window.s = document.getElementsByTagName('script')[0]; window.s.parentNode.insertBefore(window.ga, window.s);
			})(document);
		}
	}
}