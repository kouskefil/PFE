/**
 * Created by kefil on 09/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('userdetails', ['$scope','userFactory','$uibModal', '$log','groupFactory', function ($scope,userFactory, $uibModal, $log, groupFactory) {
        $scope.user = userFactory.getCurrentUser();
        $scope.groups = groupFactory.getGroups();
        $scope.attr = null;
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
        $scope.grantGrp = function (grp) {
            var i;
            for(i = 0; i <  $scope.user.user.groups.length; i++){
                if( $scope.user.user.groups[i].name === grp.name)
                    grp.granted = !grp.granted;
            }
        };

        $scope.editUser  = function (id) {
            $scope.edit = id;
            $log.debug('editUser ' + $scope.edit);
            // var modalInstance = $uibModal.open(
            //     {
            //         templateUrl: 'updateUser.html',
            //         controller: ['$uibModalInstance','$scope','userFactory',function ($uibModalInstance, $scope,userFactory) {
            //             $scope.title = title;
            //             $scope.user = userFactory.getCurrentUser();
            //             $scope.updatedValue = $scope.user[attr];
            //             $scope.attr = attr;
            //
            //             $scope.setUserAttr = function (attr) {
            //                 switch (attr){
            //                     case 'gender':
            //                         $scope.user.gender = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'birthday':
            //                         $scope.user.birthday = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'birthp':
            //                         $scope.user.birthp = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'type':
            //                         $scope.user.type = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'login':
            //                         $scope.user.login = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'accountExp':
            //                         $scope.user.accountExp = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'passExp':
            //                         $scope.user.passExp = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'status':
            //                         $scope.user.status = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'phone':
            //                         $scope.user.phone = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'email':
            //                         $scope.user.email = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'pbox':
            //                         $scope.user.pbox = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'others':
            //                         $scope.user.others = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'city':
            //                         $scope.user.city = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     case 'country':
            //                         $scope.user.country = $scope.updatedValue;
            //                         $uibModalInstance.close();
            //                         break;
            //                     default:
            //                         console.log('toto');
            //                 }
            //             }
            //         }],
            //         size : 'sm'
            //     });
            // modalInstance.result.then(function (selectedItem){
            //     $scope.selected = selectedItem;
            // });
        };
    }])
});


