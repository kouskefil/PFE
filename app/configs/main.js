/**
 * Created by kefil on 07/11/16.
 */
require.config({
     baseUrl: "app",
	// packages: [{
     //    name: "jquery",
     //    location: "assets/codemirror",
     //    main: "lib/codemirror"
	// }
	// ],
    paths : {

        "angular" : "assets/angular/angular.min",
        "toaster" : "assets/angular/toaster",
        "angular-animate" : "assets/angular/angular-animate",
        "ui-router" : "assets/angular/angular-ui-router.min",
        "ui-bootstrap" : "assets/bootstrap/js/ui-bootstrap.min",
        "treeview": "js/directives/angular.treeview.js" ,
        "codemirror":"assets/codemirror/lib/codemirror",
        "jquery":"assets/jquery/jquery.min",
		"uicodemirror":"assets/codemirror/lib/ui-codemirror.min",
		'lib/codemirror': 'assets/codemirror/lib/codemirror',
		'mode/javascript/javascript': 'assets/codemirror/mode/javascript/javascript',
		'mode/css/css': 'assets/codemirror/mode/css/css',
		'mode/sql/sql': 'assets/codemirror/mode/sql/sql'
		// 'mode/html/html': 'assets/codemirror/mode/html/html'
    },
    shim : {
        "angular": {
            deps : ["jquery"],
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
        // "lodash":{
			// // exports:"CodeMirror"
        // },
        "mode/javascript/javascript":{
            deps:["codemirror"] 
        },
         "mode/css/css":{
            deps:["codemirror"]
        },
         "mode/html/html":{
            deps:["codemirror"]
        },
        "mode/sql/sql":{
            deps:["codemirror"]
        },
        
        "uicodemirror": {
            deps:["angular","codemirror", "mode/javascript/javascript","mode/css/css", "mode/sql/sql"],
            // exports:"uicodemirror",
			init: function(angular, codemirror) {
				window.CodeMirror = codemirror;
			}
        }
	
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
	"uicodemirror"
	// "assets/codemirror/mode/javascript/javascript",
	
	// "codemirror/lib/codemirror", "codemirror/mode/javascript/javascript"
], function(app) {
	 app.init();

	
});
