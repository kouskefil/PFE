/**
 * Created by kefil on 18/01/17.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.controller('resources', ['$scope','globalVarFactory','$log', function ($scope, globalVarFactory,$log) {
        //variables to be adding in the model
        /**methodAdd dropdown control*/
        $scope.selected = '';
        $scope.method =  {} ;
        $scope.edit = '';
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
        $scope.RscParent = globalVarFactory.generateParent();
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
            if(!selectedNode.methods)
                selectedNode.methods = [];
            if(!selectedNode.requests)
                selectedNode.requests = [];
            globalVarFactory.setCurrentRsc(selectedNode);
            $scope.currentRsc = globalVarFactory.rscSkeleton(selectedNode);
            $scope.methods = $scope.currentRsc.methods;
            $scope.requests = $scope.currentRsc.requests;
        };
        $scope.treeActions =
            [
                {
                    name:"delete",
                    icon:"glyphicon glyphicon-trash",
                    title:'delete resource'
                }
            ];
       
        var gp = function (collection, path, resource) {
            for(var i = 0; i < collection.length; i++){
                if (collection[i].path === path) {
                    collection[i].resources.splice(collection[i].resources.indexOf(resource),1);
                }else if(collection[i].resources )
                    gp(collection[i].resources, path);
            }
        };
        $scope.applytreeActions = function(action, rsc){
            var array, parentPath;
            if(rsc.parent){
                array = rsc.parent.split('/');
                if(array.length > 1)
                    parentPath = array[array.length-1];
                else
                    parentPath = array[0];
                gp($scope.resources, parentPath, rsc);
            }
            else  $scope.resources.splice($scope.resources.indexOf(rsc), 1);
        };
        $scope.addMethod = function (method) {
            console.log(method);
            globalVarFactory.addMethod(angular.copy(method));
            $scope.method =  angular.copy(method);
            method.name = '';
            method.id = '';
            method.role = '';
            // $scope.currentRsc.method = {};
        };
        $scope.addResponse = function(method){
            var i, found = -1;
            var resp;
            if(!method.responses)
                method.responses = [];
            if($scope.rsptmp.mediatype === '')
                $scope.rsptmp.mediatype = 'application/json';
            if($scope.rsptmp.name){
                for(i=0; i < method.responses.length; i++){
                    console.log(method.responses[i].representations[0]);
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
                    representations: [{"mediatype": "text/html"}]
                });
            }
            $scope.responses.push($scope.rsptmp);
            $scope.rsptmp = {
                mediatype:'',
                name:'',
                value:''
            };
        };
        $scope.getMethod = function (method) {
            var i;
            console.log('method');
            console.log(method);
            $scope.selected = method.id;
            $scope.method = method;
            $scope.trigger = $scope.method;
            $scope.requests = globalVarFactory.gLookupByAttribute(globalVarFactory.getOperations(),'name', method.id).inputs;
            $scope.responses.length = 0;
            if(method.responses) {
                console.log(method.responses);
                for (i = 0; i < method.responses.length; i++) {
                    if (method.responses[i].representations[0].param) {
                        var j;
                        for (j = 0; j < method.responses[i].representations[0].param.options.length; j++) {
                            $scope.responses.push({
                                name: method.responses[i].representations[0].param.name,
                                mediatype: method.responses[i].representations[0].param.options[j].mediatype,
                                value: method.responses[i].representations[0].param.options[j].value
                            });
                        }
                    }
                    else
                        $scope.responses.push({
                            name: '',
                            mediatype: method.responses[i].representations[0].mediatype,
                            value: ''
                        });
                }
                // $scope.editMethod = 'editMethod';
            }
        };
        $scope.delete = function (collection) {
            if($scope.method !== {}) {
                globalVarFactory.gDelete(collection, $scope.method);
                $scope.method = {};
            }

        };
        $scope.addtriggerParam = function (param) {
            $log.debug('param');
            $log.debug($scope.method.trigger);
            if (!$scope.method.trigger.in){
                $log.debug('creation du tableau');
                $scope.method.trigger.in = [];
            }
            $scope.method.trigger.in.push(angular.copy(param));
            $log.debug('push complete');
            $log.debug($scope.method.trigger);
            param.name = '';
            param.value = '';
        };
        $scope.setmethoddropdownstyle = function(){
            $scope.editMethod= 'addmethod';
        };












































        // $scope.addResponse = function(method){
        //     var i, found = -1;
        //     var resp;
        //     if(!method.responses)
        //         method.responses = [];
        //     if($scope.rsptmp.mediatype === '')
        //         $scope.rsptmp.mediatype = 'application/json';
        //     if($scope.rsptmp.name){
        //         for(i=0; i < method.responses.length; i++){
        //             if(method.responses[i].representations[0].param.name === $scope.rsptmp.name){
        //                 found = i;
        //                 break;
        //             }
        //         }
        //         if(found === -1){
        //             resp = {
        //                 representations: [{"param": {
        //                     name: $scope.rsptmp.name,
        //                     options : [
        //                         {
        //                             mediatype: $scope.rsptmp.mediatype,
        //                             value : $scope.rsptmp.value
        //                         }
        //                     ]
        //                 }}]
        //             };
        //             method.responses.push(resp);
        //         }
        //         else{
        //             resp = {
        //                 mediatype: $scope.rsptmp.mediatype,
        //                 value : $scope.rsptmp.value
        //             };
        //             method.responses[found].representations[0].param.options.push(resp);
        //         }
        //
        //     }
        //     else{
        //         method.responses.push({
        //             representations: [{"mediatype": "text/html"}]
        //         });
        //     }
        //     $scope.responses.push($scope.rsptmp);
        //     $scope.rsptmp = {
        //         mediatype:'',
        //         name:'',
        //         value:''
        //     };
        // };
    }])
});
