/**
 * Created by kefil on 02/11/16.
 */
define(["angular",
	// "codemirror",
    "ui-router",
    "../js/controllers/layoutCtrl",
    "../js/services/layoutFactory"
    // "ui-bootstrap"
    /*******************************/
], function(angular, CodeMirror ){
	// window.CodeMirror = require('codemirror');
    var app = angular.module("myapp", ['ui.router', 'ui.bootstrap','layoutModule', 'layoutCtrlModule','toaster',"ui.codemirror"]);
    app.init = function() {
        angular.bootstrap(document, ["myapp"]);
    };
    return app;
});
