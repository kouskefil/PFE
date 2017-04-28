    /**
 * Created by kefil on 18/01/17.
 */
        define(['configs/app'], function (app) {
                'use strict';
            app.register.controller('resources', ['$scope','globalVarFactory','$log', function ($scope, globalVarFactory,$log) {
                //variables to be adding in the model
                /**methodAdd dropdown control*/
                $scope.status = {
                    isopen: false
                };                    
                $scope.resourceMethod = [
                    {
                        "dvalue":"get",
                        "rvalue":"get"
                    },
                    {
                        "dvalue":"post",
                        "rvalue":"post"
                    },
                    {
                        "dvalue":"put",
                        "rvalue":"put"
                    },
                    {
                        "dvalue":"delete",
                        "rvalue":"delete"
                    }
                ];
                $scope.mediatype = [
                    {
                        "dvalue":"text/html",
                        "rvalue":"txthtml"
                    },
                    {
                        "dvalue":"text/css",
                        "rvalue":"txtcss"
                    },
                    {
                        "dvalue":"application/json",
                        "rvalue":"appjson"
                    },
                    {
                        "dvalue":"application/js",
                        "rvalue":"appjs"
                    }
                ];
                $scope.resources = globalVarFactory.getResources();
                $scope.RscParent = [];
                $scope.RscParent = globalVarFactory.getParent();

                $scope.currentRsc = globalVarFactory.rscSkeleton({responses:[]});

                $scope.ids = globalVarFactory.getOperations();
                $scope.setCurrentRsc = function (rsc) {
                   globalVarFactory.setCurrentRsc(rsc);
                };
                $scope.cclick = function (selectedNode) {
                    // $scope.setCurrentRsc(selectedNode);
                    globalVarFactory.setCurrentRsc(selectedNode);
                    $scope.currentRsc = globalVarFactory.rscSkeleton(selectedNode);
                    $scope.methods = $scope.currentRsc.methods;
                    $scope.requests = $scope.currentRsc.requests;
                    // console.log($scope.methods);
                };
              
                $scope.addMethod = function () {
                    globalVarFactory.addMethod($scope.currentRsc.method);
                    $scope.currentRsc.method = {};
                };
                $scope.getMethod = function (method) {
                    $scope.currentRsc.method = method;
                    $scope.requests = globalVarFactory.gLookupByAttribute(globalVarFactory.getOperations(),'name', method.id).inputs;
                    $scope.responses = method.responses;
                    $scope.editMethod = 'editMethod';
                    // $scope.method =  method ;
                };

                $scope.addResponse = function(method){

                    var i, found = -1;
                    var resp;
                    if(!method.responses)
                        method.responses = [];
                    if($scope.currentRsc.response.name){
                        for(i=0; i < method.responses.length; i++){
                            if(method.responses[i].representations[0].param.name === $scope.currentRsc.response.name){
                                found = i;
                                break;
                            }
                        }
                        if(found === -1){
                            resp = {
                                representations: [{"param": {
                                    name: $scope.currentRsc.response.name,
                                    options : []
                                }}]
                            };
                            method.responses.push(resp);
                        }
                        else
                            resp = method.responses[found];
                        if($scope.currentRsc.response.mediatype)
                            resp.representations[0].param.options.push({value: $scope.currentRsc.response.value,
                                mediatype : $scope.currentRsc.response.mediatype});
                        else
                            resp.representations[0].param.options.push({value: $scope.currentRsc.response.value,
                                mediatype : "application/json"});
                    }
                    else{
                        method.responses.push({
                            representations: [{"mediaType": "text/html"}]
                        });
                    }
                    $scope.responses = method.responses;
                    console.log(method);
                    $scope.currentRsc.response = {};
                };
                $scope.setmethoddropdownstyle = function(){
                    $scope.editMethod= 'addmethod';
                }
            }])
        });
