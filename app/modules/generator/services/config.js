/**
 * Created by kefil on 29/11/16.
 */
'use strict';

define(['configs/app',
    '../controllers/view',
    '../controllers/generator',
    '../controllers/moduleCtrl',
    '../controllers/operations',
    '../controllers/menus',
    '../controllers/resources',
    '../controllers/database',
    '../controllers/workflow',
    '../controllers/dashboard',
    'app/js/directives/angular.treeview.js',
    'app/js/directives/angular-file-model.js',
    'modules/generator/services/componentFactory',
    'modules/generator/services/global_var',
    'modules/generator/services/operationsFactory',
    'modules/generator/services/resourcesFactory' ,
    'modules/generator/services/menusFactory',
    'modules/generator/services/actionsFactory',
    'modules/generator/services/fileFactory'
], function(app){
    app.register.stateProvider

        .state('root.generator',
            {
                url:'',
                template:'<div ui-view></div>',
                onEnter:function (layoutFactory) {
                    layoutFactory.setmName("Modeling");
                },
                abstract:true

            })
        .state('root.generator.init',
            {
                url:'/generator',
                templateUrl:'app/modules/generator/views/generator.html',
                onEnter: function (layoutFactory,globalVarFactory,resourcesFactory, fileFactory,operationsFactory) {
                    layoutFactory.setItems([
                        {
                            name:'Views',
                            state:'root.generator.views'   ,
                            role : 'admin',
                            icon:'glyphicon glyphicon-modal-window'
                        },
                        {
                            name:'Operations',
                            state:'root.generator.operations'   ,
                            role : 'user',
                            icon:'glyphicon glyphicon-cog'
                        },
                        {
                            name:'Resources',
                            state:'root.generator.resources'   ,
                            role : 'admin',
                            icon:'glyphicon glyphicon-link'
                        },
                        {
                            name:'Workflow',
                            state:'root.generator.workflow'   ,
                            role : 'admin',
                            icon:'glyphicon glyphicon-retweet'
                        },
                        {
                            name:'Database',
                            state:'root.generator.database'   ,
                            role : 'user',
                            icon:'glyphicon glyphicon-tasks'
                        }
                    ]);
                    layoutFactory.setLocation('Creating Modules');
                    layoutFactory.setOperations( [
                        {
                            name:"new",
                            icon:"glyphicon glyphicon-edit",
                            action:function () {
                            }
                        },
                        {
                            name: "upload",
                            icon: "glyphicon glyphicon-upload",
                            action:function () {
                                var reader = new FileReader();
                                reader.readAsText($scope.fileModel);
                                reader.addEventListener('load', function() {
                                    var m = JSON.parse(reader.result);
                                    globalVarFactory.setModule(m) ;
                                });
                            }
                        },
                        {
                            name: "save",
                            icon: "glyphicon glyphicon-floppy-save",
                            action:function () {
                                //console.log(containerFactory.module);
                                fileFactory.saveAsJson(angular.toJson(globalVarFactory.getModule()),'models');
                                // $state.go('root');
                            }
                        }
                    ]);
                },

                controller:'generatorCtrl'
            })
        .state('root.generator.new',
            {
                url: '/generator',
                templateUrl: 'app/modules/generator/views/module.html',
                onEnter: function () {

                },
                controller: 'moduleCtrl'

            })
        .state('root.generator.update',
            {
                url:'/loadmodule',
                templateUrl:'app/partials/moduleLoad.html',
                controller:'moduleLoadCtrl'
            })
        .state('root.generator.dashboard',
            {
                url: '/module/:name',
                templateUrl: 'app/modules/generator/views/dashboard.html',
                onEnter:function (layoutFactory) {

                },
                controller:'dashboard'
            })
        .state('root.generator.views',
            {
                url: "/generator/views",
                templateUrl: "app/modules/generator/views/views.html",
                resolve: {
                    HTMLcomponents: function($http){
                        return $http({method: 'GET', url: 'app/modules/generator/services/components.json'})
                            .then (function (data) {
                                return data.data;
                            });
                    }
                },
                onEnter:function (globalVarFactory,layoutFactory, fileFactory, $state) {

                    layoutFactory.setLocation('View');
                    layoutFactory.setOperations(
                        [
                            {
                                name:"new",
                                icon:"glyphicon glyphicon-edit",
                                action:function () {
                                    var module = globalVarFactory.getModule();
                                    var model =  globalVarFactory.getDefaultComponent();
                                    module.models.push(model);
                                    // globalVarFactory.getModule().models.push(globalVarFactory.getDefaultComponent());
                                    $state.go("root.generator.views.properties", {label:model.label, type:model.type, num:model.num});
                                }
                            },
                            {
                                name: "save",
                                icon: "glyphicon glyphicon-floppy-disk",
                                action:function () {
                                    //console.log(containerFactory.module);
                                    fileFactory.saveAsJson(angular.toJson(globalVarFactory.getModule()),'models');
                                    // $state.go('root');
                                }
                            }
                        ]);
                },
                controller: 'view'
            })
        .state('root.generator.views.properties',
            {
                url: '^/:label/:type/:num/',
                templateUrl: function ($stateParams){
                    return 'app/modules/generator/views/partials/' + $stateParams.type +'.html';
                },

                controller: ['$scope','$state', '$stateParams', 'componentSet', function($scope,$state, $stateParams, componentSet){


                }]
            })
        .state('root.generator.operations',{
            url:'/generator/operations',
            templateUrl:'app/modules/generator/views/operations.html',
            onEnter:function (globalVarFactory,layoutFactory, fileFactory) {

                layoutFactory.setLocation('Operations');
                layoutFactory.setOperations(
                    [
                        {
                            name:"new",
                            icon:"glyphicon glyphicon-edit",
                            action:function () {
                                globalVarFactory.AddOperation();
                            }
                        },
                        {
                            name: "save",
                            icon: "glyphicon glyphicon-floppy-disk",
                            action:function () {
                                //console.log(containerFactory.module);
                                fileFactory.saveAsJson(angular.toJson(globalVarFactory.getModule()),'models');
                                // $state.go('root');
                            }
                        }
                    ]);
            },
            controller:'operations'
        })
        .state('root.generator.resources',{
            url:'/generator/resources',
            templateUrl:'app/modules/generator/views/resources.html',
            onEnter:function (globalVarFactory,layoutFactory, fileFactory,operationsFactory) {

                layoutFactory.setLocation('Resources');
                layoutFactory.setOperations(
                    [
                        {
                            name:"new",
                            icon:"glyphicon glyphicon-edit",
                            action:function () {
                                globalVarFactory.newresource();
                            }
                        },
                        {
                            name: "add resources",
                            icon: "glyphicon glyphicon-plus",
                            action:function () {
                                globalVarFactory.addResource();
                            }
                        },
                        {
                            name: "save",
                            icon: "glyphicon glyphicon-floppy-disk",
                            action:function () {
                                fileFactory.saveAsJson(angular.toJson(globalVarFactory.getModule()),'models');
                            }
                        }
                    ]);
            },
            controller:'resources'
        })
        .state('root.generator.workflow',{
            url:'/generator/workflow',
            templateUrl:'app/modules/generator/views/workflow.html',
            onEnter:function (globalVarFactory,layoutFactory, fileFactory,operationsFactory) {

                layoutFactory.setLocation('Workflow');
                // layoutFactory.setOperations(
                //     [
                //         {
                //             name:"upload",
                //             icon:"glyphicon glyphicon-upload",
                //             action:function () {
                //                 globalVarFactory.AddResource();
                //             }
                //         }
                //     ]);
            },
            controller:'workflow'
        })
        .state('root.generator.database',{
            url:'/generator/database',
            templateUrl:'app/modules/generator/views/database.html',
            onEnter:function (globalVarFactory,layoutFactory, fileFactory,operationsFactory) {

                layoutFactory.setLocation('Database');
                // layoutFactory.setOperations(
                //     [
                //         {
                //             name:"upload",
                //             icon:"glyphicon glyphicon-upload",
                //             action:function () {
                //                 globalVarFactory.AddResource();
                //             }
                //         }
                //     ]);
            },
            controller:'database'
        })
        .state('root.generator.menus',{
            url:'/generator/menus',
            templateUrl:'app/modules/generator/views/menus.html',
            onEnter:function (globalVarFactory,layoutFactory,resourcesFactory, fileFactory,operationsFactory,mnsFactory) {

                layoutFactory.setLocation('Menus');
                layoutFactory.setOperations(
                    [
                        {
                            name:"new",
                            icon:"glyphicon glyphicon-edit",
                            action:function () {
                                mnsFactory.menuAdd();
                            }
                        },
                        {
                            name: "save",
                            icon: "glyphicon glyphicon-floppy-disk",
                            action:function () {
                                //console.log(containerFactory.module);
                                fileFactory.saveAsJson(angular.toJson(globalVarFactory.getModule()),'models');
                                // $state.go('root');
                            }
                        }
                    ]);
            },
            controller:'menus'
        })

});
