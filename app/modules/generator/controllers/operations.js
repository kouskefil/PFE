/**
 * Created by kefil on 13/11/16.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('operations', ['$scope', '$state', 'operationsFactory', function ($scope, $state, operationsFactory) {
            //variables to be adding in the model
            $scope.operation_Tab = [
                {
                    "label":"sql",
                    "anchor":"sql"
                },
                {
                    "label":"inputs",
                    "anchor":"inputs"
                }
            ];
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
                    "dvalue":"json",
                    "rvalue":"json"
                },
                {
                    "dvalue":"json strict",
                    "rvalue":"jsons"
                },
                {
                    "dvalue":"json array strict",
                    "rvalue":"jas"
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
                    "dvalue":"library",
                    "rvalue":"library"
                },
                {
                    "dvalue":"module",
                    "rvalue":"module"
                }
            ];
            $scope.stepsCollection = [
                    {
                        "stepNum":1,
                        "stepTitle":"operation"
                    },
                    {
                        "stepNum":2,
                        "stepTitle":"sql"
                    },{
                        "stepNum":3,
                        "stepTitle":"inputs"
                    }

                ];
            //end
            /*********functions to be added to the model **/
            $scope.operations = operationsFactory.operations();
            $scope.currentOp = operationsFactory.skeleton();

            $scope.getOp = function (opName) {
                $scope.currentOp = operationsFactory.lookup(opName);
            };

            $scope.inputAdd = function (input) {
                $scope.currentOp.inputs.push(currentOp.input);
            };
            /**********************************************/
            $scope.cclick = function(selectedNode){
                $scope.currentOp = selectedNode;
            }

        }])
})
