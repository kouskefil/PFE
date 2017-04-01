/**
 * Created by kefil on 21/03/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('dashboard', ['$scope', 'layoutFactory','globalVarFactory', function ($scope, layoutFactory,globalVarFactory) {

            console.log(globalVarFactory.getModule());
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
            //    dashboard layout controller
            var config = layoutFactory.getDashboardConf();
            // console.log(config);
            // $scope.contentClass = config[0].contentClass;
            // $scope.moduleBlocClass = config[1].moduleBlocClass;

        
    }])
})
