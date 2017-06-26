/**
 * Created by kefil on 19/02/17.
 */

define(['angular'], function (angular) {
    'use strict';
    angular.module('layoutCtrlModule',["layoutModule"])
        .controller('layoutCtrl', ['$scope','layoutFactory','$log','$state', function ($scope, layoutFactory, $log,$state) {
            $scope._tasks=[
                {
                    "name": "duis aliquip",
                     "occurrence": 4
                },
                {
                    "name": "veniam qui",
                    "occurrence": 1
                },
                {"name": "pariatur ipsum",
                    "occurrence": 9
                },
                {"name": "dolore eiusmod",
                    "occurrence": 11
                },
                {"name": "aliquip veniam"},
                {"name": "excepteur excepteur"},
                {"name": "consectetur deserunt" }
                ];

            //    to get location operations to display on operations bar
            $scope.actions = layoutFactory.getOperations();
            //     to get current location
            $scope.location = layoutFactory.getCurrentLocation();
            //    to perform operation's action
            $scope.doAction = function (item) {
                item.action();
            };
             $scope.go = function () {
                // $state.go('root.install',{module:'admin'});
                  $state.go('root.app');
             };
             $scope.isauthorized = function (menu) {
                return true; 
             };
            /*Layout vars config functions*/
            $scope.navbarCollapsed = true;
            // modules dropdown
            $scope.isCollapsedHorizontal = false;
            $scope.status = {
                isopen: false
            };
            $scope.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };
            $scope.moduleName = layoutFactory.getmName();
            $scope.modules = layoutFactory.getModules();
            $scope.linkedM = layoutFactory.getLinks();
            $scope.items = layoutFactory.getItems();
            $scope.tasks = layoutFactory.getTasks();


            $scope.layout = 'contentPlusSidebar' ;
            $scope.sidebar_layout = 'sidebarVisible sidebar-nav';
            $scope.changeLayout = function () {
                if($scope.layout === 'contentPlusSidebar'){
                    $scope.layout = 'contentSeul';
                    $scope.sidebar_layout = 'sidebarCachee sideb_v';
                    $scope.sidebarState  = 'closed';
                }
                else if ($scope.layout === 'contentSeul'){
                    $scope.layout = 'contentPlusSidebar';
                    $scope.sidebar_layout = 'sidebarVisible sidebar-nav';
                    $scope.sidebarState  = 'opened';
                }
            }

        }])
})         ;