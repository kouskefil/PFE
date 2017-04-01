/**
 * Created by kefil on 06/02/17.
 */
define(['configs/app'], function (app){
    app.register.factory('resourcesFactory',['globalVarFactory',function(globalVarFactory) {

        var resources = globalVarFactory.getModule().resources;
        var currentRsc, RscParent = [];
        var fillRscParent = function(path){
            var i, newpath;
            for(i = 0; i < resources.length; i++){
                if(path.length == 0)
                    newpath = resources[i].path;
                else
                    newpath = path + "/" + resources[i].path;
                RscParent.push(newpath);
                if(resources[i].resources){
                    fillRscParent(newpath, resources[i].resources)
                }
            }
            return RscParent;
        };
        var rscLookup = function(path, rsc){
            var v, i, j, tp = "";

            v = path.split('/');
            for(i = 0; i < rsc.length; i++){
                if(v[0] == rsc[i].path){
                    if(v.length == 1)
                        return rsc[i];

                    for(j = 1; j < v.length; j++){
                        if(j == v.length - 1)
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
            return rscLookup(currentRsc.parent, resources);
        };
        var getParents = function (resources) {
            var i, j = resources.length ;
            for(i = 0; i < resources.length; i++){
                RscParent.push(resources[i].parent);
                if(resources[i].resources.length == 0) {
                    RscParent.push(resources[i].path);
                }
                if(resources[i].resources) {
                    getParents(resources[i].resources);
                }
            }
            return RscParent;
        };


        var resourcesFactory = {

            resources : function () {
                return resources;
            },
            parent : function () {
                return  getParents(resources);
            },
            skeleton : function () {
                currentRsc =  {};
                return currentRsc;
            },
            resourceAdd : function(){
                var rsc = angular.copy(currentRsc)
                console.log(rsc);
            var newpath;

            if(rsc.parent) {
                parentLookup().resources.push(rsc);
            }else
                resources.push(rsc);
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
        }


    }
    return resourcesFactory;


}])})
