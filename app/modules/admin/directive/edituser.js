/**
 * Created by kefil on 16/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
        app.register.directive('focusMe', function () {
            return {
                link: function(scope, element, attrs) {
                    scope.$watch(attrs.focusMe, function(value) {
                        if(value === true) {
                            element[0].focus();
                            element[0].select();
                        }
                    });
                }
            };
        });
});

