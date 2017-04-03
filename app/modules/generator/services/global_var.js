/**
 * Created by kefil on 05/11/16.
 */
    define(['configs/app'], function (app){
        app.register.factory('globalVarFactory',['componentSet','$q', function (componentSet, $q) {

        var module = {name:'', models:[], resources:[], operations:[], menus:[] };
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
        var currentRsc , RscParent = [];
        var fillRscParent = function(path){
            var i, newpath;
            for(i = 0; i < module.resources.length; i++){
                if(path.length === 0)
                    newpath = module.resources[i].path;
                else
                    newpath = path + "/" + module.resources[i].path;
                RscParent.push(newpath);
                if(module.resources[i].resources){
                    fillRscParent(newpath, module.resources[i].resources)
                }
            }
            return RscParent;
        };
        var rscLookup = function(path, rsc){
            var v, i, j, tp = "";

            v = path.split('/');
            for(i = 0; i < rsc.length; i++){
                if(v[0] === rsc[i].path){
                    if(v.length === 1)
                        return rsc[i];

                    for(j = 1; j < v.length; j++){
                        if(j === v.length - 1)
                            tp += v[j];
                        else
                            tp += v[j] + "/";
                    }

                    return rscLookup(tp,rsc[i].resources);
                }

            }

            return null;
        };
        var parentLookup = function(){
            return rscLookup(currentRsc.parent, module.resources);
        };
        var getParents = function (resources) {
                var i, j = resources.length ;
                for(i = 0; i < resources.length; i++){
                    RscParent.push(resources[i].parent);
                    if(resources[i].resources.length === 0) {
                        RscParent.push(resources[i].path);
                    }
                    if(resources[i].resources) {
                        getParents(resources[i].resources);
                    }
                }
                return RscParent;
            };
        /** resources vars end*/
        var global = {
            /*operations methods*/
            skeleton : function () {
                skel =  {
                    name:'',
                    command:'',
                    out:'',
                    sql:'',
                    inputs:[]
                };
                return skel;
            },
            /**
              * @returns { Number }
              */
            AddOperation : function () {
                if( module.operations.length > 0 && lookup(angular.copy(skel.name)) !== null) {
                    return 1;
                }else {
                    module.operations.push(angular.copy(skel));
                    skel.name = '';
                    skel.command = '';
                    skel.out = '';
                    skel.sql = '';
                    skel.inputs = [];

                    return 0;
                }
            },
            getOperations: function () {
                 return module.operations;
            },
            /*resource methods*/
            addMethod : function (rsc) {
                currentRsc.methods.push(rsc);
                console.log(currentRsc);
            },
            rscSkeleton : function () {
                currentRsc =  {
                path : '',
                parent : '',
               resources : [],
               methods : [],
               responses : []
            };
                return currentRsc;
            },
            setCurrentRsc : function (rsc) {
               currentRsc =  rsc;
                console.log(currentRsc);
            },
             getResources : function () {
               return module.resources;
             },
             getCurrentRsc : function () {
                return currentRsc;
             },
            getParent : function () {
                return  getParents(module.resources);
            },
            AddResource : function(){
                var rsc = angular.copy(currentRsc);
                var newpath;

                if(rsc.parent) {
                    parentLookup().resources.push(rsc);
                }else
                    module.resources.push(rsc);
                currentRsc.path = '';
                currentRsc.parent = '';
                currentRsc.resources = [];
                currentRsc.methods = [];
                currentRsc.responses = [];

                /*currentRsc subResource = {};*/
                if(rsc.parent)
                    newpath = rsc.parent + "/" + rsc.path;
                else
                    newpath = rsc.path;
                RscParent.push(newpath);
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
            getcurrentComponent : function () {
                return componentSet.currentComponent;
            },
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
            }


        };

        return global;
    }])

});