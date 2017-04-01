/**
 * Created by kefil on 18/01/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('resources', ['$scope', 'resourcesFactory', function ($scope, resourcesFactory) {
            //variables to be adding in the model
            $scope.resource_Tab = [
                {
                    "label":"method",
                    "anchor":"method"
                },
                {
                    "label":"request",
                    "anchor":"request"
                },
                {
                    "label":"response",
                    "anchor":"response"
                }
            ];
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


            $scope.resources = resourcesFactory.resources();
            $scope.RscParent = resourcesFactory.parent();
            $scope.currentRsc = resourcesFactory.skeleton();
            $scope.currentRsc.resources = [];
            $scope.currentRsc.methods = [];
            $scope.currentRsc.responses = [];

            $scope.addmtd = function () {
                $scope.currentRsc.methods.push($scope.currentRsc.method);
                $scope.currentRsc.method = {};
            };
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
})
