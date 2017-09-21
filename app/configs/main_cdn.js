/**
 * Created by kefil on 07/11/16.
 */
require.config({
     baseUrl: "app",
	
    paths : {
        // "angular" : "assets/angular/angular.min",
        "angular" : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular.min",
        // "angular-animate" : "assets/angular/angular-animate",
        "angular-animate" : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular-animate.min",
        "toaster" : "assets/angular/toaster",
        // "ui-router" : "assets/angular/angular-ui-router.min",
        "ui-router" : "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min",
        // "ui-bootstrap" : "assets/bootstrap/js/ui-bootstrap.min",
        "ui-bootstrap" : "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min",
        "treeview": "js/directives/angular.treeview.js" ,
        "codemirror":"assets/codemirror/lib/codemirror",
        // "jquery":"assets/jquery/jquery.min",
        "jquery":"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min",
        // "jquery-ui":"assets/jquery/jquery-ui.min",
        "jquery-ui":"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min",
		// "uicodemirror":"assets/codemirror/lib/ui-codemirror.min",
		"uicodemirror":"https://cdnjs.cloudflare.com/ajax/libs/angular-ui-codemirror/0.3.0/ui-codemirror.min",
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
    "toaster",
	"uicodemirror",
	"jquery-ui"

	// "codemirror/lib/codemirror", "codemirror/mode/javascript/javascript"
], function(app) {
	 app.init();

	
});
