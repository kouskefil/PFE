define(['configs/app', '../services/generatorFactory'], function (app) {
    'use strict';
    app.register.controller('workflow', ['$log', '$document', '$uibModal', '$scope', 'generatorFactory','fileFactory', 'globalVarFactory','$state','layoutFactory',
        function ($log, $document, $uibModal, $scope, generatorFactory,fileFactory, globalVarFactory,$state,layoutFactory ) {

            layoutFactory.setOperations(
                [

                    {
                        name:"upload",
                        icon:"glyphicon glyphicon-upload",
                        action:function () {
                            $scope.openModal()
                        }
                    }
                ]);
            $scope.openModal = function (size) {
                var modalInstance = $uibModal.open(
                    {
                        // animation: $scope.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'uploaddatabase.html',
                        controller: ['$uibModalInstance','$scope','$state',function ($uibModalInstance, $scope, $state) {
                            $scope.editModule = function (action) {
                                var reader = new FileReader();
                                reader.readAsText($scope.fileModel);
                                reader.addEventListener('load', function() {
                                    var m = JSON.parse(reader.result);
                                    globalVarFactory.setModule(m) ;
                                    $state.go('root.generator.dashboard');
                                    $uibModalInstance.close();
                                });

                            };
                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }] ,
                        size: size
                    });
                modalInstance.result.then(function (selectedItem){
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }

        }])});
