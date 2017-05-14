/**
 * Created by kefil on 07/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('users', ['$scope','$state','pagerFactory','userFactory', 'layoutFactory',function ($scope,$state, pagerFactory,userFactory,layoutFactory) {
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
        $scope.setPage = function (page) {
            if (page < 1 || page >$scope.pager.totalPages) {
                return;
            }
            // get pager object from service
           $scope.pager = pagerFactory.GetPager($scope.users.length, page);
            // get current page of items
            $scope.items = $scope.users.slice($scope.pager.startIndex,$scope.pager.endIndex + 1);
            return 1;
        };
        $scope.setPage(1);
        $scope.setSelectedUser = function (user) {
            userFactory.setCurrentUser(user);
            $state.go('root.admin.user');
        }
    }])
});

