/**
 * Created by kefil on 09/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('userdetails', ['$scope','userFactory', function ($scope,userFactory) {
        $scope.user = userFactory.getCurrentUser();
        console.log( $scope.user);
    }])
});


