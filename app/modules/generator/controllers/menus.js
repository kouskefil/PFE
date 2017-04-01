/**
 * Created by kefil on 19/01/17.
 */

define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('menus', ['$scope','mnsFactory', function ($scope, mnsFactory) {

            //variables to be adding in the model
            $scope.resourceMethod = [
                {
                    "dvalue":"get",
                    "rvalue":"get"
                },
                {
                    "dvalue":"post",
                    "rvalue":"post"
                },
                {
                    "dvalue":"put",
                    "rvalue":"put"
                },
                {
                    "dvalue":"delete",
                    "rvalue":"delete"
                }
            ];
            $scope.menus = mnsFactory.menus();
            $scope.currentMns = mnsFactory.skeleton();





        }])
})
