/**
 * Created by kefil on 04/11/16.
 */
define(['./app'
            ], function(app) {
    'use strict';
    return app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
            app.register =
            {
                stateProvider: $stateProvider,
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            /* default route */
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: 'app/login.html',
                     controller: 'layoutCtrl'
                })
                .state('root', {
                    url: '/app',
                    templateUrl: 'app/index.html',
                    onEnter:function (layoutFactory) {
                        layoutFactory.setmName("Home");
                        layoutFactory.setLinks([
                            'Scolarite',
                            'Comptabilite',
                            'Cours'
                        ]);

                        var modules = [
                            {
                                name: 'generator',
                                icon : 'glyphicon glyphicon-file',
                                link : 'root.install({module:"generator"})'
                            }
                            ];
                        layoutFactory.setModules(modules);
                        layoutFactory.setTasks([
                            'view mail',
                            'inscriptions'
                        ]);
                    },
                     controller: 'layoutCtrl'
                })

                .state('root.install',{
                    url: '/:module',
                    controller:function ($state,$stateParams) {
                        var route = 'root.'+$stateParams.module + '.init';
                        console.log(route);
                        $state.go(route);
                    },
                    resolve: {
                        lazyConfig: ['$q', '$rootScope','$stateParams', function($q, $rootScope, $stateParams){
                            var deferred = $q.defer();
                            console.log('statparams');
                            console.log($stateParams);
                            var filename = 'modules/'+$stateParams.module+'/services/config';
                            require([filename], function () {
                                $rootScope.$apply(function () {
                                    deferred.resolve();
                                });
                            });
                            return deferred.promise;
                        }]
                    }
                })

        }]);
});
