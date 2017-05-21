/**
 * Created by kefil on 21/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('partnerdetails', ['$scope', '$log','userFactory', function ($scope, $log,userFactory) {
        $scope.user = userFactory.getCurrentUser();

        $scope.getOtherEmails = function () {
            $scope.attr = 'emails';
            $scope.otherEmails = userFactory.getOthers('emails');
        };
        $scope.getOtherPhones = function () {
            $scope.attr = 'phones';
            $scope.otherPhones = userFactory.getOthers('phones');
        };
        $scope.getOtherCountries = function () {
            $scope.attr = 'countries';
            $scope.otherCountries = userFactory.getOthers('countries');
        };
        $scope.getOtherCities = function () {
            $scope.attr = 'cities';
            $scope.otherCities = userFactory.getOthers('cities');
        };
        $scope.getOtherPobox = function () {
            $scope.attr = 'pobox';
            $scope.otherPobox = userFactory.getOthers('Pobox');
        };
        $scope.edit = '';
        $scope.editDone = function () {
            $scope.edit = '';
            $log.debug('editDone ' + $scope.edit);
        };
        $scope.editUser  = function (id) {
            $scope.edit = id;
            $log.debug('editUser ' + $scope.edit);
        };
    }])
});



