/**
 * Created by kefil on 13/11/16.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('operations', ['$scope', '$state', 'globalVarFactory', function ($scope, $state, globalVarFactory) {
            //variables to be adding in the model
            $scope.opCommand = [
                {
                    "dvalue":"insert",
                    "rvalue":"insert"
                },
                {
                    "dvalue":"update",
                    "rvalue":"update"
                },
                {
                    "dvalue":"delete",
                    "rvalue":"delete"
                },
                {
                    "dvalue":"select",
                    "rvalue":"select"
                },
                {
                    "dvalue":"insert-returning",
                    "rvalue":"insert-r"
                },
                {
                    "dvalue":"update-returning",
                    "rvalue":"update-r"
                },
                {
                    "dvalue":"delete-returning",
                    "rvalue":"delete-r"
                },
                {
                    "dvalue":"select-returning",
                    "rvalue":"select-r"
                }
            ];
            $scope.inputType = [
                {
                    "dvalue":"integer 32-bit",
                    "rvalue":"int32"
                },
                {
                    "dvalue":"unsigned integer 32-bit",
                    "rvalue":"uint32"
                },
                {
                    "dvalue":"integer 64-bit",
                    "rvalue":"int64"
                },
                {
                    "dvalue":"unsigned integer 64-bit",
                    "rvalue":"uint64"
                },
                {
                    "dvalue":"double-precision floating point",
                    "rvalue":"dpfp"
                },
                {
                    "dvalue":"string",
                    "rvalue":"str"
                },
                {
                    "dvalue":"boolean",
                    "rvalue":"boolean"
                },
                {
                    "dvalue":"object",
                    "rvalue":"object"
                },
                {
                    "dvalue":"array",
                    "rvalue":"array"
                }
            ];
            $scope.inputStyle = [
                {
                    "dvalue":"template",
                    "rvalue":"template"
                },
                {
                    "dvalue":"query",
                    "rvalue":"query"
                },
                {
                    "dvalue":"plain",
                    "rvalue":"plain"
                }
            ];
            $scope.inputLocation = [
                {
                    "dvalue":"$context.userid",
                    "rvalue":"$context.userid"
                },
                {
                    "dvalue":"app",
                    "rvalue":"$app"
                }
            ];
            $scope.operations = [];
            $scope.selected = '';
            //end
            /*********functions to be added to the model **/
            $scope.operations = globalVarFactory.getOperations();
            $scope.currentOp = globalVarFactory.skeleton({});
            $scope.edition = false;         
         
            $scope.AddInput = function () {
                if($scope.currentOp.inputs === null){
                    $scope.currentOp.inputs = [];
                    $scope.currentOp.inputs.push($scope.input);
                    $scope.input = {};
                }
                else if(globalVarFactory.gLookup($scope.currentOp.inputs,$scope.input) === true){
                    $scope.input = {};
                }
                 else{
                    $scope.currentOp.inputs.push($scope.input);
                    $scope.input = {};
                }
            };
            $scope.editInput = function(input){
                $scope.edition = true;
                $scope.input = input;
            };
            $scope.delInput = function (input) {
                globalVarFactory.gDelete($scope.inputs, input);
                $scope.currentInput = {};
            };
            /**********************************************/
            $scope.cclick = function(operation){

                if(!operation.inputs)
                    operation.inputs = [];
                $scope.currentOp = globalVarFactory.skeleton(operation);
                $scope.inputs = $scope.currentOp.inputs;
                $scope.selected = $scope.currentOp.name;
            };
            $scope.delOperation = function ( op) {
                globalVarFactory.gDelete($scope.operations,op) ;
                $scope.currentOp = {};
            }

        }])
});
