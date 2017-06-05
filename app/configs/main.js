/**
 * Created by kefil on 07/11/16.
 */
require.config({
     baseUrl: "app",
    packages: [{
        name: "codemirror",
        location: "../assets/codemirror/lib/codemirror",
        main: "lib/codemirror"
    }],
    paths : {

        "angular" : "assets/angular/angular.min",
        "angular-animate" : "assets/angular/angular-animate",
        "ui-router" : "assets/angular/angular-ui-router.min",
        "ui-bootstrap" : "assets/bootstrap/js/ui-bootstrap.min",
        "treeview": "js/directives/angular.treeview.js",
        "infinit-scroll": "js/directives/ng-infinite-scroll.min",
        "slim-scroll": "js/directives/ng-slim-scroll",
        "jquery":"assets/jquery/jquery.min"
        // "sidebar":"assets/js/sidebar",
        // "bootstrap": "assets/bootstrap/js/bootstrap.min",
    },
    shim : {
        "angular": {
            exports: "angular"
        },
        "angular-animate": {
            exports: "angular"
        },
        "ui-router": {
            deps: ["angular"],
            exports: 'ui-router'
        },
        "ui-bootstrap": {
            deps: ["angular"],
            exports:"ui-bootstrap"
        },
        "jquery": {
            exports:"jquery"
        },
        "infinit-scroll": {
             deps: ["angular"],
            exports:"infinit-scroll"
        },
        "slim-scroll": {
             deps: ["angular"],
            exports:"slim-scroll"
        }
    },
    waitSecond: 0
});


require([
    "configs/app",
    "configs/route",
    "ui-bootstrap",
    "jquery",
    "infinit-scroll",
    "slim-scroll"
], function(app) {
     app.init();

});
