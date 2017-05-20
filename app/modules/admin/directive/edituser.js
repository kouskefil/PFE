/**
 * Created by kefil on 16/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
        app.register.directive('focusMe', function ($timeout, $parse) {
            return {
                link: function(scope, element, attrs) {
                    scope.$watch(attrs.focusMe, function(value) {
                        console.log(value);
                        if (value === true) {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                }
            };
        });
});

