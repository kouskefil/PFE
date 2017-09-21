/**
 * Created by kefil on 05/11/16.
 */
define(['configs/app'], function (app){
	app.register.factory('globalVarFactory',['componentSet','$q','$log','$uibModal' ,function (componentSet, $q, $log, $uibModal) {
		
		var module = {name:'', models:[], resources:[], operations:[], dependances:[] };
		var defer = null;
		var upload = false;
		var treeActions =  [
			{
				name:"up",
				icon:"fa fa-arrow-up",
				title:'move up',
				todo:1
			},
			{
				name:"down",
				icon:"fa fa-arrow-down",
				title:'move down',
				todo:2
			},
			{
				name:"copy",
				icon:"fa fa-clone",
				title:'copy',
				todo:3
			},
			{
				name:"cut",
				icon:"fa fa-cut",
				title:'cut',
				todo:4
			},
			{
				name:"delete",
				icon:"fa fa-trash",
				title:'delete',
				todo:5
			}
		];
		/**operations vars**/
		var skel;
		// var currentOp;
		
		var lookup = function (name) {
			var obj = null ;
			for(i = 0; i < module.operations.length; i++){
				if(module.operations[i].name === name)
					obj =  module.operations[i];
			}
			return obj;
		};
		/**operations vars end**/
		
		/**resources vars **/
		var currentRsc ,method, /*RscParent = [],*/resourcesParents = [];
		var genParent = function (rsc,root) {
			var realpath, i ;
				if(root === '')
					realpath = rsc.path;
				else
					realpath = root + '/' +rsc.path;
				var rrr = {realpath:realpath, resource:rsc};
				resourcesParents.push(rrr) ;
				console.log("element pushé");
				console.log(rrr) ;
            if(rsc.resources)
				for(i = 0; i < rsc.resources.length; i++)
					genParent(rsc.resources[i], realpath);

			
			
			
		};
		var addParent = function (rsc) {
			var realpath;
			$log.debug('addParent methods.length='+rsc.methods.length);
			if(rsc.methods.length)
				return ;
			if(rsc.parent == '')
				realpath = rsc.path;
			else
				realpath =  rsc.parent + '/' + rsc.path;
			resourcesParents.push({realpath:realpath, resource:rsc}) ;
		};
		var parentLookup = function(rsc){
			// var realpath, i;
			// realpath =  rsc.parent + '/' + rsc.path;
			$log.debug('lookup resourcesParents length '+ resourcesParents.length);
			for(i = 0 ; i < resourcesParents.length; i ++) {
				$log.debug(' realpath='  +rsc.parent+ ' resourcesParents[i].realpath=' + resourcesParents[i].realpath);
				if (resourcesParents[i].realpath == rsc.parent) {
					$log.debug('lookup i = +' + i + ' rsc =' + resourcesParents[i].resource);
					return resourcesParents[i].resource;
				}
			}
			
			return null;
		};
		var getParents = function (/*resources*/) {
			
			return resourcesParents;
		};
		var getparams = function (str, params) {
			var i, /*tmp*/j;
			console.log(str);
			for (i = 0; i < str.length; i++){
				if (str.charAt(i) == "{"){
					j = i + 1;
					while(str.charAt(++i) != "}" );
					params.push(str.substring(j, i));
				}
			}
			console.log("params");
			console.log(params);
			return params;
		};
		var makeoperation = function (operation) {
			var i, op = null, params = [];
			for (i = 0; i < module.operations.length; i++){
				if(operation == module.operations[i].name) {
					op = module.operations[i];
					break;
				}
			}
			getparams(currentRsc.parent, params);
			getparams(currentRsc.path, params);
			if(op === null){
				op = {
					name: operation
				};
				if (params.length ){
					op.in =  [];
					for (i = 0; i < params.length; i++){
						op.in.push({
							name : params[i]
						});
					}
				}
				module.operations.push(op);
				
			}
			else{
				for (i = 0; i < params.length; i++){
					op.in[i].name =  params[i] ;
				}
			}
		};
		var updatersc = function () {
			var params = [],i,j, op = null;
			getparams(currentRsc.parent, params);
			getparams(currentRsc.path, params);
			console.log('params');
			console.log(params);
			if (params.length)
				for (i = 0; i < currentRsc.methods.length; i++){
					console.log('currentRsc.methods[i].id');
					console.log(currentRsc.methods[i]);
					if (currentRsc.methods[i].request !== null &&
						currentRsc.methods[i].request !== undefined){
						for (j = 0; j < params.length; j++){
							console.log('old='+	currentRsc.methods[i].request.params[j].name + ' new='+params[j]);
							currentRsc.methods[i].request.params[j].name = params[j];
						}
						
						//	mise à jour des operations
						
						for (j = 0; j < module.operations.length; j++){
							if(currentRsc.methods[i].id === module.operations[j].name) {
								op = module.operations[j];
								break;
							}
						}
						if (op != null){
							for (j = 0; j < params.length; j++){
								op.in[j].name =  params[j] ;
							}
						}
					}
					
				}
		};

		/** resources vars end*/
		var global = {
            /*operations methods*/
			skeleton : function (obj) {
				skel =  {
					name:obj.name,
					command:obj.command,
					out:obj.out,
					sql:obj.sql,
					inputs:obj.inputs
				};
				return skel;
			},
			/**
			 * @returns { Number }
			 */
			AddOperation : function () {
				console.log(angular.copy(skel));
				if( module.operations.length > 0 && lookup(angular.copy(skel.name))!== null) {
					skel.name = '';
					skel.type = '';
					skel.reply = '';
					skel.sql = {};
					skel.in = [];
					return -1;
				}
				else {
					module.operations.push(angular.copy(skel));
					skel.name = '';
					skel.type = '';
					skel.reply = '';
					skel.sql = {};
					skel.in = [];
					return 0;
				}
			},
			getOperations: function () {
				return module.operations;
			},
            /*resource methods*/
			getupdatersc: function () {
				return updatersc;
			},
			setCurrentMethod: function (mtd) {
				method = mtd;
			},
			addMethod : function (mtd) {
				var i, /*found = false,*/ params = [];
				if(!currentRsc.methods)
					currentRsc.methods = [];
				currentRsc.methods.push(mtd);
				console.log(currentRsc);
				
				getparams(currentRsc.parent, params);
				getparams(currentRsc.path, params);
				if (params.length){
					mtd.request = {
						params: []
					};
					for (i = 0; i < params.length; i++){
						mtd.request.params.push({name: params[i]}) ;
					}
				}
				
				makeoperation(mtd.id);
			},
			rscSkeleton : function (obj) {
				currentRsc =  {
					path : obj.path,
					parent : obj.parent,
					resources : obj.resources,
					methods : obj.methods
					// responses : obj.responses
				};
				return currentRsc;
			},
			setCurrentRsc : function (rsc) {
				currentRsc =  rsc;
			},
			getCurrentRsc : function () {
				return currentRsc;
			},
			getResources : function () {
				return module.resources;
			},
			// getCurrentRsc : function () {
			// 	return currentRsc;
			// },
			newresource : function () {
                return $uibModal.open({
                    templateUrl:'app/modules/generator/views/resources/newResource.html',
                    controller: ['$scope', '$log', '$uibModalInstance','RscParent', function($scope, $log, $uibModalInstance, RscParent) {
						 $scope.RscParent = RscParent;
						$scope.currentRsc = {
							path : "",
							parent : "",
							methods : [],
                            resources : []
						};
                        $scope.addResource = function(){
                            var rsc = angular.copy($scope.currentRsc);
                            $log.debug('addresouce');
                            $log.debug(rsc);
                            if(rsc.parent === '')
                                module.resources.push(rsc);
                            else
                                parentLookup(rsc).resources.push(rsc);
                            addParent(rsc) ;
                        };
                        $scope.close = function () {
                            $uibModalInstance.close();
                        }

                    }],
					resolve: {
                        RscParent: function () {
                            var i;
                            for(i = 0; i < module.resources.length; i++)
                                genParent(module.resources[i], '');
                            return resourcesParents;
                        }
					}
                });
			},
			// fonction qui permet de modifier une resource
			rscUpdater : function () {
                return $uibModal.open({
                    templateUrl:'app/modules/generator/views/resources/editResource.html',
                    controller: ['$scope', '$uibModalInstance', 'globalVarFactory','RscParent', function($scope, $uibModalInstance, globalVarFactory, RscParent) {
                       $scope.RscParent = RscParent;
                        $scope.currentRsc = globalVarFactory.getCurrentRsc();
						console.log(   $scope.currentRsc );
                    	$scope.close = function () {
                            $uibModalInstance.close();
                        }
                    }],
                    resolve: {
                        RscParent: function () {
                            var i;
                            for(i = 0; i < module.resources.length; i++)
                                genParent(module.resources[i], '');
                            return resourcesParents;
                        }
                    }
                });
            },
            /*resource methods end*/
            /*module methods*/
			getModule : function () {
				return module;
			},
			setModule : function (m) {
				module = m;
				upload = true;
			},
			setName : function (name) {
				module.name =  name;
			},
			// getcurrentComponent : function () {
			// 	return componentSet.currentComponent;
			// },
			getTreeAction : function () {
				return treeActions;
			},
			getDefaultComponent : function () {
				componentSet.getDefault(module.models.length);
				if(defer !== null){
					defer.resolve(componentSet.getHead());
					defer = null;
				}
				return componentSet.getHead();
			},
			getModelHead : function () {
				defer = $q.defer();
				return defer.promise;
			},
			setModel : function (model) {
				componentSet.setModel(model);
			},
			setcurrentContainer : function (comp) {
				componentSet.setcurrentContainer(comp);
			},
            /*global methods*/
			gDelete : function (collection, obj) {
				var i;
				for(i = 0; i < collection.length; i++){
					if(collection[i] === obj) {
						var pos = collection.indexOf(obj);
						collection.splice(pos, 1);
					}
				}
			},
			gLookupByAttribute : function (collection, attribute, value) {
				var i, find = null;
				for(i = 0; i < collection.length; i++){
					if(collection[i][attribute] === value){
						find = collection[i];
						break;
					}
				}
				return find;
			},
			addTrigger :function(template){
				 $uibModal.open({
					templateUrl:template,
					controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
						$scope.setMethodTrigger = function(){
							method.trigger = $scope.trigger;
							console.log(method);
							$uibModalInstance.close();
						};
					}]
				});
			},
			memberOf: function (obj, collection) {
				var i, found = {obj:{}, index:-1};
				for (i = 0; i < collection.length; i++){
					if (collection[i] == obj) {
                        found = {obj:collection[i], index:i};
                        break;
                    }
				}
				return found
            },
			add : function (obj, collection) {
				collection.push(obj);
            },
			delete : function (obj, collection) {
				collection.splice(collection.indexOf(obj), 1);
            },
			update : function (oldObj, newObj, collection) {
				var i;
                for (i = 0; i < collection.length; i++){
                    if (collection[i] == oldObj) {
                        collection[i] = newObj;
                        break;
                    }
                }
            },
            inheritance : function () {
            var modalInstance = $uibModal.open(
                {
                    templateUrl: 'app/modules/generator/views/dependance.html',
                    controller: ['$uibModalInstance','$scope','globalVarFactory',function ($uibModalInstance, $scope, globalVarFactory) {
                       $scope.type = "simple";
                        $scope.resources = [];
                    	function getRsc(rsc, origin) {
                            var name, cpy;
                            for (var i = 0; i < rsc.length; i++) {
                            	rsc[i].type = "inherited";
                            	rsc[i].origin = origin;
                                if (rsc[i].resources)
                                    getRsc(rsc[i].resources, origin);
                            }
                        }
                    	var inherit = function(){
                            var reader = new FileReader();
                            reader.readAsText($scope.fileModel);
                            reader.addEventListener('load', function() {
                                var m = JSON.parse(reader.result);
								getRsc( m.resources, m.name);
                                for (var i = 0; i < m.resources.length; i++)
                                    // if ($scope.resources[i].type == "inherited")
                                    globalVarFactory.getModule().resources.push(m.resources[i]);
                                for(var j = 0; j < m.operations.length; j++) {
                                	m.operations[j].type = "inherited";
                                    globalVarFactory.getModule().operations.push(m.operations[j]);
                                }
                                globalVarFactory.getModule().dependances.push({name: m.name, type:"inherited"});
                            });
                        };
                    	$scope.creatDependance = function () {
							if ($scope.type == "simple")
								globalVarFactory.getModule().dependances.push(
									{
										name : $scope.name
									}
								);
							else
								inherit();
							console.log(globalVarFactory.getModule());
                            $uibModalInstance.close();
                        }
                    }] ,
                    size: 'md'
                });
        }

			
		};
		return global;
	}])
	
});