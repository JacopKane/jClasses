var Base = {
	protected	: {},
	public		: {
		options	: {
			init		: false,
			animation	: {},
			elements	: {}
		},
		init		: function(arguments) {
			this.options	= typeof(this.options) == 'object' ? this.options : {};
			this.options = typeof(this.options) ? this.options : {};
			arguments = typeof(arguments) ? arguments : {};
			arguments.init = true;
			this.options = $.extend(true, this.options, arguments);
			return typeof(this.options == 'object') ? this : false;
		}
	}
}; //jClass.Base