/**
 * Created by kefil on 21/03/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('overview', ['$scope', 'layoutFactory','globalVarFactory','$sce','toaster','$window', function ($scope, layoutFactory,globalVarFactory, $sce, toaster, $window) {

            $scope.treeActions = [
                {
                    name: "edit",
                    icon: "glyphicon glyphicon-edit",
                    title: 'Edit'
                }
            ];
            $scope.modulefiles = [
                {
                    name: 'partials',
                    children: [
                        {
                            name: 'vue.html',
                            desc: 'toto',
                            date: '20.01.2017'
                        },
                        {
                            name: 'vue.html',
                            desc: 'toto',
                            date: '20.01.2017'
                        },
                        {
                            name: 'vue.html',
                            desc: 'toto.html',
                            date: '20.01.2017'
                        }
                    ]
                },
                {
                    name: 'services',
                    children: [
                        {
                            name: 'config.js',
                            desc: 'html file',
                            date: '20/01/2017'
                        },
                        {
                            name: 'component.js',
                            desc: 'html file',
                            date: '20/01/2017'
                        }
                    ]
                },
                {
                    name: 'controllers',
                    children: [
                        {
                            name: 'geneCtrl.js',
                            desc: 'html file',
                            date: '20/01/2017'
                        },
                        {
                            name: 'componentCtrl.js',
                            desc: 'html file',
                            date: '20/01/2017'
                        }
                    ]
                }

            ];
            $scope.cfiles = [
                {
                    name: 'Librairies',
                    children: [
                        {
                            name: 'vue.html',
                            desc: 'toto',
                            date: '20.01.2017'
                        },
                        {
                            name: 'vue.html',
                            desc: 'toto',
                            date: '20.01.2017'
                        },
                        {
                            name: 'vue.html',
                            desc: 'toto.html',
                            date: '20.01.2017'
                        }
                    ]
                },
                {
                    name: 'modules',
                    children: [
                        {
                            name: 'config.js',
                            desc: 'html file',
                            date: '20/01/2017'
                        },
                        {
                            name: 'component.js',
                            desc: 'html file',
                            date: '20/01/2017'
                        }
                    ]
                }
            ];
            $scope.branches= [
                {
                    "name": "sit"
                },
                {
                    "name": "velit"
                },
                {
                    "name": "culpa"
                },
                {
                    "name": "deserunt"
                },
                {
                    "name": "nisi"
                }
            ];
            $scope.dynamicPopover = {
                content: 'Hello, World!',
                templateUrl: 'branch.html',
                title: 'Title'
            };


        $scope.pop = function(){
            toaster.pop('warning', "title", "myTemplate.html", 100000, 'template');
        };

        $scope.clear = function(){
            toaster.clear();
        };
                
    }])
});
