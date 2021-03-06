/**
 * Created by kefil on 02/11/16.
 */
define(["angular",
    "jquery",
    "ui-router",
    "../js/controllers/layoutCtrl",
    "../js/services/layoutFactory"
    // "ui-bootstrap"
    /*******************************/
], function(angular, $){
    var app = angular.module("myapp", ['ui.router', 'ui.bootstrap','layoutModule', 'layoutCtrlModule','toaster',"ui.codemirror"]);
    app.init = function() {
        angular.bootstrap(document, ["myapp"]);
    };
    return app;
});
