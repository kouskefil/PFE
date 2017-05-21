/**
 * Created by kefil on 09/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('userdetails', ['$scope','userFactory','$uibModal', '$log','groupFactory', function ($scope,userFactory, $uibModal, $log, groupFactory) {
       $scope.user = userFactory.getCurrentUser();
        $scope.users = userFactory.getUsers();
        // $scope.groups = groupFactory.getGroups();
        $scope.userPosition = 0;
        $scope.attr = null;
        $scope.next = function () {
            $scope.userPosition = $scope.users.indexOf($scope.user);
            if($scope.userPosition < $scope.users.length -1) {
                $scope.userPosition = $scope.userPosition + 1;
                $scope.user = $scope.users[$scope.userPosition];
                $log.debug($scope.userPosition);
            }else
            $log.debug($scope.userPosition) ;

        };
        $scope.previous = function () {
            $scope.userPosition = $scope.users.indexOf($scope.user);
            if($scope.userPosition > 0) {
                $scope.userPosition = $scope.userPosition - 1;
                $scope.user = $scope.users[$scope.userPosition];
                $log.debug($scope.userPosition);
            }else
                $log.debug($scope.userPosition) ;
        };

        // $scope.getOtherEmails = function () {
        //     $scope.attr = 'emails';
        //     $scope.otherEmails = userFactory.getOthers('emails');
        // };
        // $scope.getOtherPhones = function () {
        //     $scope.attr = 'phones';
        //     $scope.otherPhones = userFactory.getOthers('phones');
        // };
        // $scope.getOtherCountries = function () {
        //     $scope.attr = 'countries';
        //     $scope.otherCountries = userFactory.getOthers('countries');
        // };
        // $scope.getOtherCities = function () {
        //     $scope.attr = 'cities';
        //     $scope.otherCities = userFactory.getOthers('cities');
        // };
        // $scope.getOtherPobox = function () {
        //     $scope.attr = 'pobox';
        //     $scope.otherPobox = userFactory.getOthers('Pobox');
        // };
        // $scope.edit = '';
        // $scope.editDone = function () {
        //     $scope.edit = '';
        //     $log.debug('editDone ' + $scope.edit);
        // };
        // $scope.grantGrp = function (grp) {
        //     var i;
        //     for(i = 0; i <  $scope.user.user.groups.length; i++){
        //         if( $scope.user.user.groups[i].name === grp.name)
        //             grp.granted = !grp.granted;
        //     }
        // };
        // $scope.editUser  = function (id) {
        //     $scope.edit = id;
        //     $log.debug('editUser ' + $scope.edit);
        // };
    }])
});


