/**
 * Created by kefil on 21/05/17.
 */
/**
 * Created by kefil on 09/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('userinfo', ['$scope','userFactory','$uibModal', '$log','groupFactory', function ($scope,userFactory, $uibModal, $log, groupFactory) {
        $scope.user = userFactory.getCurrentUser();
        $scope.users = userFactory.getUsers();
        $scope.groups = groupFactory.getGroups();
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
        };
    }])
});


