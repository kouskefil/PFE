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
                $scope.responses = [];
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
                $scope.rsptmp = {
                    mediatype:'',
                    name:'',
                    value:''
                };
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
                    var i;
                    $scope.requests = globalVarFactory.gLookupByAttribute(globalVarFactory.getOperations(),'name', method.id).inputs;
                    console.log('requests');
                    console.log($scope.requests);
                    console.log('method');
                    console.log(method);
                    $scope.responses.length = 0;
                    if(method.responses)
                        for(i=0; i < method.responses.length; i++){
                        if(method.responses[i].representations[0].param){
                            angular.forEach(method.responses[i].representations[0].param.options, function(opt){
                                console.log('opt');
                                console.log(opt);
                                $scope.responses.push({
                                    name : method.responses[i].representations[0].param.name,
                                    mediatype : opt.mediatype,
                                    value :  opt.value
                                });
                            } );
                        }
                        else
                            console.log('dans le else  '+method.responses[i].representations[0].mediatype);
                            $scope.responses.push({
                                name : '',
                                mediatype : method.responses[i].representations[0].mediatype,
                                value :  ''
                            });
                    }
                    $scope.editMethod = 'editMethod';
                    // $scope.method =  method ;
                };

                $scope.addResponse = function(method){

                    var i, found = -1;
                    var resp;
                    if(!method.responses)
                        method.responses = [];
                    if($scope.rsptmp.mediatype == '')
                        $scope.rsptmp.mediatype = 'application/json';
                    if($scope.rsptmp.name){
                        for(i=0; i < method.responses.length; i++){
                            if(method.responses[i].representations[0].param.name === $scope.rsptmp.name){
                                found = i;
                                break;
                            }
                        }
                        if(found === -1){
                            resp = {
                                representations: [{"param": {
                                    name: $scope.rsptmp.name,
                                    options : [
                                        {
                                            mediatype: $scope.rsptmp.mediatype,
                                            value : $scope.rsptmp.value
                                        }
                                    ]
                                }}]
                            };
                            method.responses.push(resp);
                        }
                        else{
                            resp = {
                                mediatype: $scope.rsptmp.mediatype,
                                value : $scope.rsptmp.value
                            };
                            method.responses[found].representations[0].param.options.push(resp);
                        }

                    }
                    else{
                        method.responses.push({
                            representations: [{"mediaType": "text/html"}]
                        });
                    }
                    $scope.responses.push($scope.rsptmp);
                    $scope.rsptmp = {
                        mediatype:'',
                        name:'',
                        value:''
                    };

                    // $scope.responses = method.responses;
                    console.log(method);
                    console.log('responses');
                    console.log($scope.responses);

                };
                $scope.setmethoddropdownstyle = function(){
                    $scope.editMethod= 'addmethod';
                }
            }])
        });
