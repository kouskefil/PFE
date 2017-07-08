/**
 * Created by kefil on 07/11/16.
 */
require.config({
     baseUrl: "app",
    packages: [{
        name: "codemirror",
        location: "assets/codemirror",
        main: "lib/codemirror"
    }
	],
    paths : {

        "angular" : "assets/angular/angular.min",
        "toaster" : "assets/angular/toaster",
        "angular-animate" : "assets/angular/angular-animate",
        "ui-router" : "assets/angular/angular-ui-router.min",
        "ui-bootstrap" : "assets/bootstrap/js/ui-bootstrap.min",
        "treeview": "js/directives/angular.treeview.js" ,
        // "codemirror":"assets/codemirror/lib/codemirror",
		"uicodemirror":"assets/codemirror/lib/ui-codemirror.min",
		// 'lib/codemirror': 'assets/codemirror/lib/codemirror',
		'mode/javascript/javascript': 'assets/codemirror/mode/javascript/javascript'
    },
    shim : {
        "angular": {
            exports: "angular"
        },
        "toaster": {
            deps: ["angular"],
            exports: "toaster"
        },
        "angular-animate": {
            deps: ["angular"],
            exports : "angular-animate"
        },
        "ui-router": {
            deps: ["angular"],
            exports: 'ui-router'
        },
        "ui-bootstrap": {
            deps: ["angular"],
            exports:"ui-bootstrap"
        },
        // "codemirror":{
			// exports:"CodeMirror"
        // },
        "mode_javascript":{
            deps:["codemirror"] ,
			exports:"mode_javascript"
        },
        "uicodemirror": {
            deps:["angular","codemirror"],
            // exports:"uicodemirror",
			init: function(angular, codemirror) {
				window.CodeMirror = codemirror;
			}
        },
	
    },
    waitSecond: 0
});


require([
	"configs/app",
    "configs/route",
    "ui-bootstrap",
    "angular-animate",
    "toaster" ,
	// "codemirror",
	"uicodemirror",
	// "assets/codemirror/mode/javascript/javascript",
	
	// "codemirror/lib/codemirror", "codemirror/mode/javascript/javascript"
], function(app) {
	 app.init();

	
});
