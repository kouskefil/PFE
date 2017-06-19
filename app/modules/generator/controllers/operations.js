/**
 * Created by kefil on 13/11/16.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('operations', ['$scope', '$state', 'globalVarFactory', function ($scope, $state, globalVarFactory) {
            //variables to be adding in the model
            $scope.operations_type = [
                {
                    "dvalue":"command",
                    "rvalue":"command"
                },
                {
                    "dvalue":"command reply",
                    "rvalue":"command reply"
                },
                {
                    "dvalue":"request",
                    "rvalue":"request"
                },
                {
                    "dvalue":"request reply",
                    "rvalue":"request reply"
                },
                {
                    "dvalue":"empty",
                    "rvalue":"empty"
                },
                {
                    "dvalue":"empty",
                    "rvalue":"empty"
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
                    "dvalue":"userid",
                    "rvalue":"$ctx.userid"
                },
                {
                    "dvalue":"app",
                    "rvalue":"$app"
                },
                {
                    "dvalue":"login",
                    "rvalue":"$ctx.login"
                }
            ];
            $scope.operations = [];
            $scope.selected = '';
            //end
            /*********functions to be added to the model **/
            $scope.operations = globalVarFactory.getOperations();
            $scope.currentOp = globalVarFactory.skeleton({});
            $scope.edition = false;         
         
            $scope.addInput = function () {
                if($scope.currentOp.inputs === undefined){
                    $scope.currentOp.inputs = [];
                    $scope.currentOp.inputs.push($scope.input);
                    $scope.input = {};
                    console.log('array created');
                }
                else if($scope.edition === true) {
                    console.log('edition');
                    $scope.edition = false;
                    $scope.input = {};
                }
                 else{
                    $scope.currentOp.inputs.push($scope.input);
                    $scope.input = {};
                    console.log('normal');
                }
                console.log($scope.currentOp.inputs);
            };
            $scope.editInput = function(input){
                $scope.edition = true;
                $scope.input = input;
                console.log('edition');
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
