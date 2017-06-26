'use strict';
define(['configs/app'], function (app){
    app.register.controller('moduleCtrl',['$scope','$state','globalVarFactory', function($scope,$state,globalVarFactory){

            $scope.new = function(){

                    globalVarFactory.getModule().name = $scope.name;
                    $state.go('root.generator.overview');
            };
        }]);
});
