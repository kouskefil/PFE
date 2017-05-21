/**
 * Created by kefil on 07/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('users', ['$scope','$state','userFactory', 'layoutFactory',function ($scope,$state,userFactory,layoutFactory) {
        $scope.location = 'Admin';
        $scope.users = userFactory.getUsers();
        $scope.pager = {};
      
        $scope.searchLostFocus = function () {
           $scope.inputSearchedit = '';
        };
        $scope.searchGainFocus = function () {
            $scope.top = 1;
            $scope.inputSearchedit = 'floatingPanel searchEditing';
        };
        $scope.actions = layoutFactory.getOperations();

        $scope.setSelectedUser = function (user) {
            userFactory.setCurrentUser(user);
            $state.go('root.admin.user');
        }
    }])
});

