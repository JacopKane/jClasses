# jClasses for jQuery

It's a very simple, both inheritance and dependency management for small jQuery scripts.

It's based on John Resig's and Javascript MVC's inheritance method.

## Requirements
* jQuery

## Download
* [Click here](https://github.com/JacopKane/jClasses/zipball/master)
* or with Git:
	* Submodule:
```
$ git submodule add https://github.com/JacopKane/jClasses.git```
	* Clone:
```
$ git clone https://github.com/JacopKane/jClasses.git```


##Example:
```Javascript

var Configuration = {
	baseUrl : ''
}, jsFolder = Configuration.baseUrl + 'js/';


$(document).ready(function() {

	var afterBaseInit = function($Base) {
		return $('Viewport').extending(Base, { $view : $('div#viewport'), width: 720 }, afterViewport);
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