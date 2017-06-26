/**
 * Created by kefil on 04/03/17.
 */
define(['configs/app', '../services/generatorFactory'], function (app) {
    'use strict';
    app.register.controller('generatorCtrl', ['$log', '$document', '$uibModal', '$scope', 'generatorFactory','fileFactory', 'globalVarFactory','$state','layoutFactory',
        function ($log, $document, $uibModal, $scope, generatorFactory,fileFactory, globalVarFactory,$state,layoutFactory ) {

        layoutFactory.setOperations(
            [
                {
                    name:"new",
                    icon:"glyphicon glyphicon-edit",
                    action:function () {
                        $scope.openModal(100, 'new.html', 'create')
                    }
                },
                {
                    name:"upload",
                    icon:"glyphicon glyphicon-upload",
                    action:function () {
                        $scope.openModal(100, 'upload.html', 'upload')
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
        $scope.openModal = function (size, template) {
            var modalInstance = $uibModal.open(
                {
                     templateUrl: template,
                    controller: ['$uibModalInstance','$scope','$state',function ($uibModalInstance, $scope, $state) {
                    $scope.editModule = function (action) {
                        if(action === 'create'){
                            globalVarFactory.setName($scope.moduleName);
                            // console.log(globalVarFactory.getModule());
                            $state.go('root.generator.overview');
                            $uibModalInstance.close();
                        }
                        else {
                            var reader = new FileReader();
                            reader.readAsText($scope.fileModel);
                            reader.addEventListener('load', function() {
                                var m = JSON.parse(reader.result);
                                globalVarFactory.setModule(m) ;
                                $state.go('root.generator.overview');
                                $uibModalInstance.close();
                            });
                        }

                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }] ,
                size: size
            });
            // modalInstance.result.then(function (selectedItem){
            //     $scope.selected = selectedItem;
            // }, function () {
            //     $log.info('Modal dismissed at: ' + new Date());
            // });
        };

        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;
        $scope.usermodules = generatorFactory.usermodules('toto');
            
    }])});
