# jClasses for jQuery

It's a very simple, both inheritance and dependency management for small jQuery scripts.

It's based on John Resig's and Javascript MVC's inheritance method.

## Requirements
* jQuery

## Download
* [Click here](https://github.com/JacopKane/jClasses/zipball/master)
* or with Git from terminal:
	* Submodule:
```$ git submodule add https://github.com/JacopKane/jClasses.git```
	* Clone:
```$ git clone https://github.com/JacopKane/jClasses.git```

##Example:

```Html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="js/jClasses/jquery.jClasses.js"></script>
```

```Javascript

var Configuration = {
	baseUrl : ''
}, jsFolder = Configuration.baseUrl + 'js/';


$(document).ready(function() {

	var afterBaseInit = function($Base) {
		return $('Viewport').extending(Base, { $view : $('div#viewport'), width: 720 }, afterViewportInit);
	}, afterViewportInit = function($Viewport) {
		console.log('everything is intialized. YAY !');
		return true;
	};

	$.Class.init({
		Class_js	: { path : jsFolder + 'jClasses/' },
		Scripts		: {
	   		path	: jsFolder + 'jClasses/',
	   		options	: { path : jsFolder }
		},
		callback : function() {
			return $('Util').extending(Class, function($Util) {
				return $('Base').extending(Class, afterBaseInit);
			});
		}
	};
});

```

## Contribute
Feel free to fix existing classes or contribute new ones. Help will be appreciated.