/**
 * Created by kefil on 09/05/17.
 */
/**
 * Created by kefil on 09/05/17.
 */
define(['configs/app'], function (app){
    'use strict';
    app.register.factory('userFactory',['$uibModal',function($uibModal) {
        // service definition
        var service = {};
        var currentUser = {};

        service.newUser = function(template){
            var inst = $uibModal.open({
                templateUrl:template,
                controller: ['$scope', '$uibModalInstance', '$log', function($scope, $uibModalInstance, $log) {
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.addGroup = function(){

                    };

                }]
            });

            // /* `modal.result` is a promise that gets resolved when
            //  * $modalInstance.close() is called */
        };

        service.setCurrentUser = function (user) {
          currentUser = user;
        };
        service.getCurrentUser = function () {
           return currentUser;
        };



        return service;
    }])
});

