/**
 * Created by kefil on 05/11/16.
 */
    define(['configs/app'], function (app){
        app.register.factory('globalVarFactory',['componentSet','$q','$log' ,function (componentSet, $q,$log) {

        var module = {name:'', models:[], resources:[], operations:[] };
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
        var currentOp;

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
        var resourcesParents = [];
        var genParent = function (rsc,root) {
            var realpath, i ;
            if(!rsc.methods.length){
                if(root == '')
                    realpath = rsc.path;
                else
                    realpath = root + '/' +rsc.path;
                resourcesParents.push({realpath:realpath, resource:rsc}) ;
                for(i = 0; i < rsc.resources.length; i++)
                    genParent(rsc.resources[i], realpath);
            }



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
        var getParents = function (resources) {

            return resourcesParents;
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
                    if( module.operations.length > 0 && lookup(angular.copy(skel.name))!== null) {
                        skel.name = '';
                        skel.command = '';
                        skel.out = '';
                        skel.sql = '';
                        skel.inputs = [];
                        return -1;
                    }
                    else {
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
            addMethod : function (mtd) {
                if(!currentRsc.methods)
                    currentRsc.methods = [];
                currentRsc.methods.push(mtd);
                console.log(currentRsc);
            },
            rscSkeleton : function (obj) {
                currentRsc =  {
                path : obj.path,
                parent : obj.parent,
               resources : obj.resources,
               methods : obj.methods,
               responses : obj.responses
            };
                return currentRsc;
            },
            setCurrentRsc : function (rsc) {
               currentRsc =  rsc;
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
            addResource : function(){
                var rsc = angular.copy(currentRsc);
                $log.debug('addresouce');
                $log.debug(rsc);
               if(rsc.parent == '')
                   module.resources.push(rsc);
               else
                   parentLookup(rsc).resources.push(rsc);
               addParent(rsc) ;
            },
            generateParent: function () {
                var i;
                for(i = 0; i < module.resources.length; i++)
                    genParent(module.resources[i], '');
                return resourcesParents;
            },
            newresource : function () {
                currentRsc.path = '';
                currentRsc.parent = '';
                currentRsc.resources = [] ;
                currentRsc.methods = [];
                currentRsc.responses = [];
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
            },
            /*global methods*/
            gDelete : function (collection, obj) {
                var pos = collection.indexOf(obj);
                collection.splice(pos, 1);
            },
            gLookup : function (collection, obj) {
               var i, find;
               for(i = 0; i < collection.length; i++){
                   if(collection[i] === obj){
                       find = true;
                   }
               }
               return find;
            }   ,
            gLookupByAttribute : function (collection, attribute, value) {
                var i, find = null;
                for(i = 0; i < collection.length; i++){
                    if(collection[i][attribute] === value){
                        find = collection[i];
                        break;
                    }
                }
                return find;
            }
        };
        return global;
    }])

});