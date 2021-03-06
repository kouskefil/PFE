/**
 * Created by kefil on 21/03/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('overview', ['$scope', 'layoutFactory','globalVarFactory','toaster','$window','$uibModal', function ($scope, layoutFactory,globalVarFactory,  toaster, $window,$uibModal) {
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
        $scope.contributors = globalVarFactory.getModule().dependances;
        $scope.date = new Date();
        $scope.dynamicPopover = {
                // content: 'Hello, World!',
                templateUrl: 'branch.html'
                // title: 'Title'
            };
        $scope.pop = function(type){
            toaster.pop(type,"", "Mangezszferzxvrtry etyhhrgerthrgrth rt rhrthr bien", 5000);
            // toaster.pop('wait', "title", "myTemplate.html");
        };
        $scope.clear = function(){
            toaster.clear();
        };
        $scope.openModal = function () {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: 'upload.html',
                    controller: ['$uibModalInstance','$scope','$state',function ($uibModalInstance, $scope, $state) {
                    
						$scope.text = "toto";
                        $scope.filetype = [
                            {type:"service"},
                            {type:"controller"},
                            {type:"view"},
                            {type:"operation"},
                            {type:"workflow"},
                            {type:"database"}
                        ];
						$scope.mode =
							{
								lineNumbers: true,
								indentWithTabs: true,
								onLoad : function(_cm){
									_cm.setOption("mode", "javascript");
									
								}
							};
						
						$scope.fic = function(){
							var reader = new FileReader();
	                         console.log('reazder');
							reader.onload = function(e) {
								$scope.$apply(function () {
									console.log($scope.text);
									$scope.text = reader.result;
									console.log('data');
									console.log($scope.text);
								});
								// console.log($scope.text);
								// $scope.text = reader.result;
								// console.log('data');
								// console.log($scope.text);
							};
							reader.readAsText($scope.fileModel, 'utf-8');
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }] ,
                    size: 'md'
                });

        };

    }])
});
