/**
 * Created by kefil on 19/02/17.
 */

define(['angular'], function (angular) {
    'use strict';
    angular.module('layoutCtrlModule',["layoutModule"])
        .controller('layoutCtrl', ['$scope','layoutFactory','$log','$state', function ($scope, layoutFactory, $log,$state) {
            $scope._tasks=[
                {
                    "name": "in laboris est fugiat",
                    "desc": "Incididunt laboris id velit laboris id commodo. Cillum ullamco deserunt sit nostrud do ad ex laboris labore qui. Qui elit eu duis cupidatat occaecat id elit cupidatat. Et cillum qui ex tempor dolore esse sunt aliqua sunt sit tempor excepteur do nostrud. Tempor fugiat consequat id do velit aliqua anim nostrud enim consequat ex ad sint id. Duis dolore deserunt cupidatat laborum.\r\n",
                    "occurrence": 5
                },
                {
                    "name": "in laborum ex elit",
                    "desc": "Adipisicing reprehenderit aliqua mollit dolor ipsum veniam do sunt consequat do veniam labore exercitation. Irure sit velit officia incididunt cillum ullamco voluptate labore dolor duis ea. Ea officia amet magna sunt nostrud fugiat excepteur non reprehenderit labore. Est elit officia enim aliqua sunt est eu proident consequat adipisicing.\r\n",
                    "occurrence": 5
                },
                {
                    "name": "mollit tempor pariatur ad",
                    "desc": "Ipsum quis eu veniam voluptate quis quis culpa culpa id. Laboris quis deserunt culpa consectetur et tempor excepteur sunt incididunt esse ad officia anim. Dolor proident cupidatat ad aliqua eiusmod. Ipsum nostrud sit Lorem dolore sint cupidatat velit in voluptate amet occaecat dolor exercitation aliqua. Duis dolor veniam consectetur sunt exercitation cupidatat labore id voluptate. Pariatur ut ipsum eu voluptate nulla officia proident.\r\n",
                    "occurrence": 3
                },
                {
                    "name": "ullamco mollit sunt cillum",
                    "desc": "Consequat do aute magna et nisi Lorem id commodo reprehenderit irure voluptate dolor. Fugiat laboris nulla Lorem do consectetur aute. Occaecat id id id et sit minim duis nisi amet. Voluptate enim qui ex cupidatat est dolore reprehenderit officia qui velit cupidatat. Tempor nulla adipisicing aliquip minim duis eiusmod non nisi eu est qui do.\r\n",
                    "occurrence": 10
                },
                {
                    "name": "voluptate sint cillum voluptate",
                    "desc": "Irure Lorem minim est excepteur. Nisi nulla eu voluptate adipisicing officia elit anim anim eu eu. Ut do culpa deserunt fugiat voluptate duis magna cillum mollit nostrud quis consectetur est irure.\r\n",
                    "occurrence": 8
                },
                {
                    "name": "laborum incididunt nisi nisi",
                    "desc": "Minim cupidatat in consectetur sint et ut nulla cillum mollit. Ullamco irure reprehenderit ea Lorem dolor amet incididunt. Consectetur eiusmod fugiat aliqua sit ea laborum duis laborum aliqua cupidatat anim consequat aliquip. Ut irure pariatur amet nisi id est officia cupidatat. Nulla duis commodo proident elit do exercitation velit consequat occaecat. Sit nulla eu in ipsum mollit magna excepteur elit voluptate. Dolore mollit quis cupidatat est tempor ullamco est quis est amet laboris ea aute incididunt.\r\n",
                    "occurrence": 10
                },
                {
                    "name": "aute minim tempor cillum",
                    "desc": "Adipisicing voluptate commodo minim pariatur et nisi deserunt dolore et voluptate. Pariatur magna proident cillum adipisicing cillum deserunt amet duis reprehenderit ex ea. Eiusmod labore id dolor dolore officia ut pariatur officia commodo ad. Deserunt est nisi est sint. Nisi non dolore aute dolor proident quis ex enim nisi.\r\n",
                    "occurrence": 8
                }
            ];
            console.log('layout  controller');

            //    to get location operations to display on operations bar
            $scope.actions = layoutFactory.getOperations();
            //     to get current location
            $scope.location = layoutFactory.getCurrentLocation();
            //    to perform operation's action
            $scope.doAction = function (item) {
                item.action();
            };
             $scope.go = function () {
                $state.go('root.install',{module:'admin'});
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
            // $scope.tasks = layoutFactory.getTasks();


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