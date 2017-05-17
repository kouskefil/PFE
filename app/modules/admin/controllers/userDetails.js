/**
 * Created by kefil on 09/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('userdetails', ['$scope','userFactory','$uibModal', function ($scope,userFactory,$uibModal) {
        $scope.user = userFactory.getCurrentUser();

        $scope.editUser  = function (title, attr) {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: 'updateUser.html',
                    controller: ['$uibModalInstance','$scope','userFactory',function ($uibModalInstance, $scope,userFactory) {
                        $scope.title = title;
                        $scope.user = userFactory.getCurrentUser();
                        $scope.updatedValue = $scope.user[attr];
                        $scope.attr = attr;

                        $scope.setUserAttr = function (attr) {
                            switch (attr){
                                case 'gender':
                                    $scope.user.gender = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'birthday':
                                    $scope.user.birthday = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'birthp':
                                    $scope.user.birthp = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'type':
                                    $scope.user.type = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'login':
                                    $scope.user.login = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'accountExp':
                                    $scope.user.accountExp = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'passExp':
                                    $scope.user.passExp = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'status':
                                    $scope.user.status = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'phone':
                                    $scope.user.phone = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'email':
                                    $scope.user.email = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'pbox':
                                    $scope.user.pbox = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'others':
                                    $scope.user.others = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'city':
                                    $scope.user.city = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                case 'country':
                                    $scope.user.country = $scope.updatedValue;
                                    $uibModalInstance.close();
                                    break;
                                default:
                                    console.log('toto');
                            }
                        }
                    }],
                    size : 'sm'
                });
            modalInstance.result.then(function (selectedItem){
                $scope.selected = selectedItem;
            });
        };
        console.log( $scope.user);
    }])
});


