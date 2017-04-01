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

        var global = {

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