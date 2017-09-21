/**
 * Created by kefil on 18/01/17.
 */
define(['configs/app', 'assets/js/lodash'], function (app) {
    'use strict';
    app.register.controller('resources', ['$scope','globalVarFactory','$log','$uibModal',function ($scope, globalVarFactory,$log,$uibModal) {
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
        $scope.styles = [
            "template",
            "query",
            "plain"
        ];
        $scope.resources = globalVarFactory.getResources();
        // $scope.RscParent = globalVarFactory.generateParent();
        $scope.currentRsc = globalVarFactory.rscSkeleton({});
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
            globalVarFactory.setCurrentRsc(selectedNode);
            $scope.currentRsc = selectedNode/*globalVarFactory.rscSkeleton(selectedNode)*/;
            $scope.methods = $scope.currentRsc.methods;
            // $scope.requests = $scope.currentRsc.requests;
        };
        $scope.treeActions = [
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
        var updateResponses = function (method) {
            var i;
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
	    $scope.updatersc = globalVarFactory.getupdatersc();
        $scope.addMethod = function () {
            console.log($scope.method);
            globalVarFactory.addMethod($scope.method);
            $scope.method = {};
        };
        $scope.getMethod = function (method) {
            console.log('method');
            console.log(method);
            $scope.selected = method.id;
            $scope.method = method;
            $scope.trigger = $scope.method;
            if(method.request){
                $scope.requests = method.request.params;
                console.log($scope.requests);
            }
            updateResponses(method) ;

        };

        $scope.delMethod = function (collection, method) {
            globalVarFactory.gDelete(collection, method);
            $scope.method = {};
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
	
        $scope.addtrigger = function (url, mtd) {
            globalVarFactory.setCurrentMethod(mtd);
			globalVarFactory.addTrigger(url);
			$scope.getMethod(mtd);
		};
		$scope.addresp = function(template,method){
		     var  resourceMethod = $scope.resourceMethod, rsptmp = $scope.rsptmp, responses = $scope.responses;
			$uibModal.open({
				templateUrl:template,
				controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                    console.log(method);
                    $scope.params = method.request.params;
                    $scope.mediatype = [
                        {
                            "dvalue":"text/html",
                            "rvalue":"text/html"
                        },
                        {
                            "dvalue":"text/css",
                            "rvalue":"text/css"
                        },
                        {
                            "dvalue":"application/json",
                            "rvalue":"application/json"
                        },
                        {
                            "dvalue":"text/plain",
                            "rvalue":"text/plain"
                        },
                        {
                            "dvalue":"image/jpeg",
                            "rvalue":"image/jpeg"
                        },
                        {
                            "dvalue":"image/png",
                            "rvalue":"image/png"
                        },
                        {
                            "dvalue":"application/javascript",
                            "rvalue":"application/javascript"
                        }
                    ];
                    $scope.rsptmp = rsptmp;
                    $scope.resourceMethod = resourceMethod;
                    $scope.responses = responses;
                    // method =  m;
					$scope.addResponse = function(){
                        var i, found = -1;
                        var resp;
                            console.log('method.....................');
                            console.log(method);
                        if(!method.responses)
                            method.responses = [];
                        if($scope.rsptmp.mediatype === '')
                            $scope.rsptmp.mediatype = 'application/json';
                        if($scope.rsptmp.name){
                            for(i=0; i < method.responses.length; i++){
                                console.log(method.responses[i].representations[0].param);
                                if(method.responses[i].representations[0].param && method.responses[i].representations[0].param.name == $scope.rsptmp.name){
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
                        updateResponses(method);
					};
     
				}]
			});
			console.log($scope.responses);
		}
    }])
});
