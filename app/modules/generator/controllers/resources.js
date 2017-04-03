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
                $scope.RscParent = globalVarFactory.getParent();
                $scope.currentRsc = globalVarFactory.rscSkeleton();
                $scope.ids = globalVarFactory.getOperations();
               
                $scope.setCurrentRsc = function (rsc) {
                   globalVarFactory.setCurrentRsc(rsc);
                };
                $scope.cclick = function (selectedNode) {
                    // $scope.setCurrentRsc(selectedNode);
                    globalVarFactory.setCurrentRsc(selectedNode);
                    $scope.currentRsc = globalVarFactory.getCurrentRsc();
                    $scope.methods = $scope.currentRsc.methods;
                    // console.log($scope.methods);
                };
              
                $scope.addMethod = function () {
                    globalVarFactory.addMethod($scope.currentRsc.method);
                    console.log(globalVarFactory.getModule());
                };
                // $scope.toggled = function(open) {
                //     $log.log('Dropdown is now: ', open);
                // };

                $scope.addrsps = function () {
                    $scope.currentRsc.responses.push($scope.currentRsc.response);
                    $scope.currentRsc.response = {};
                };

                $scope.respAdd = function(){
                    var i, found = -1;
                    var resp;

                    if($scope.currentRsc.response.name){
                        for(i=0; i < $scope.currentRsc.method.responses.length; i++){
                            if($scope.currentRsc.method.responses[i].representations[0].param.name == $scope.currentRsc.response.name){
                                found = i;
                                break;
                            }
                        }
                        if(found == -1){
                            resp = {
                                representations: [{"param": {
                                    name: $scope.currentRsc.response.name,
                                    options : []
                                }}]
                            };
                            $scope.currentRsc.methods.responses.push(resp);

                        }
                        else
                            resp = $scope.currentRsc.methods.responses[found];
                        if($scope.currentRsc.response.mediatype)
                            resp.representations[0].param.options.push({value: $scope.currentRsc.response.value,
                                mediatype : $scope.currentRsc.response.mediatype});
                        else
                            resp.representations[0].param.options.push({value: $scope.currentRsc.response.value,
                                mediatype : "application/json"});
                    }
                    else{
                        $scope.currentRsc.methods.responses.push({
                            representations: [{"mediaType": "text/html"}]
                        });
                    }

                    $scope.currentRsc.response = {};
                }
            }])
        });
