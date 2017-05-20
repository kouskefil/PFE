/**
 * Created by kefil on 10/05/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('groups', ['$scope','groupFactory','$uibModal','userFactory', function ($scope,groupFactory, $uibModal,userFactory) {
        $scope.modules = groupFactory.getModules();
        $scope.groups = groupFactory.getGroups();
        $scope.currentGroup = groupFactory.grpSkeleton({});
        $scope.deleteRole = function (role) {
            $scope.currentGroup.roles.splice($scope.currentGroup.roles.indexOf(role),1);
        };
        $scope.selected ='';
        $scope.step = 1;
        $scope.next = function () {
            $scope.step = $scope.step + 1;
        };

        $scope.setCurrentGroup = function (group) {
            $scope.selected = group.name;
            groupFactory.setCurrentGroup(group);
            $scope.currentGroup = groupFactory.getCurrentGroup()
        };
        $scope.openModal = function ( template) {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: template,
                    controller: ['$uibModalInstance','$scope','$state','groupFactory',function ($uibModalInstance, $scope, $state,groupFactory) {
                        $scope.selected ='';
                        $scope.currentModule = groupFactory.getCurrentModule();
                        $scope.currentGroup = groupFactory.getCurrentGroup();
                        $scope.roleTmp = [];
                        $scope.modules = groupFactory.getModules();
                        $scope.setCurrentModule = function (module) {
                            $scope.selected = module.name;
                            $scope.currentModule = module;
                        };
                        // $scope.roles = groupFactory.fillRoles(groupFactory.getCurrentModule(), $scope.currentGroup);
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.getCurrentGroup = function () {
                            $scope.currentGroup = groupFactory.getCurrentGroup;
                        };
                        $scope.submitRole = function () {
                            var i;
                            for(i = 0; i < $scope.roleTmp.length; i++)
                                $scope.currentGroup.roles.push($scope.roleTmp[i]);
                            $scope.cancel();

                        };
                        $scope.removeRole = function (role) {
                            var pos = $scope.roleTmp.indexOf(role);
                            $scope.roleTmp.splice(pos,1);
                        };
                        $scope.addRole = function (role) {
                            $scope.roleTmp.push(role);
                        };
                    }],
                    size : 'lg'
                });
                modalInstance.result.then(function (selectedItem){
                $scope.selected = selectedItem;
            });
        };
    }])
});


