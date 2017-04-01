/**
 * Created by kefil on 05/11/16.
 */
define(['configs/app'], function (app) {
    'use strict';
    app.register.factory('componentSet', ['$q', function ($q ) {
        var num, head;
        var set = {
            currentContainer : null,
            currentComponent : null
        };
        /**
         * component actions in the treeView
         */
        var actions =
        {
            data: null,
            num: 1,
            type: null,
            reset: function(){
                actions.data = null;
                actions.type = null;
            },
            exec: function(component)
            {
                if(actions.type === "clone" || actions.type === "cut"){
                    console.log("coller componsant");
                    console.log(component);
                    if(component.children){
                        actions.data.parent = component.num;
                        component.children.push(actions.data);
                    }
                    actions.reset();
                    return true;
                }
                return false;
            },

            moveup: function(component)
            {
                var parent, pos;

                if(actions.exec(component) === false) {
                    parent = set.getParent(component);
                    pos = parent.children.indexOf(component);

                    if(component.parent !== null){
                        if(pos > 0){
                            parent.children[pos] = parent.children[pos - 1];
                            parent.children[pos -1] = component;
                        }
                    }
                }
            },
            movedown: function(component)
            {
                var parent = set.getParent(component);
                var pos = parent.children.indexOf(component);

                if(component.parent !== null){
                    if(parent.children.length-1 > pos // && pos != 0
                    ){
                        parent.children[pos] = parent.children[pos + 1];
                        parent.children[pos + 1] = component;
                    }
                }
            },
            clone:function (component) //clone => copy
            {

                if(actions.exec() === false){
                    actions.data = angular.copy(component);
                    _changeId(actions.data, "_copy"+ actions.num++);
                    num ++;
                    actions.data.num = num;
                    actions.type = "clone";
                    console.log(num);
                    console.log("copied object");
                    console.log(actions.data);
                }
            },
            cut:function (component)
            {
             console.log("component");
             console.log(component);

             if(actions.exec() === false){
             actions.data = component;
             console.log("exec deleting");
             actions.delete(component);
             actions.type = "cut";
             }
             },
            delete: function(component)
            {
                console.log("delete position: "+ pos);
                console.log(parent);
                var parent;
                var pos;
                if(actions.exec(component) === false) {
                    parent = set.getParent(component);
                    pos = parent.children.indexOf(component);

                    if (component.parent !== null) {
                        parent.children.splice(pos, 1);
                        console.log("etat parent");
                        console.log(parent);
                        if (component.children) {
                            set.currentContainer = parent;
                        }
                        set.currentContainer = parent;
                    }
                }
            }
        };


        var _getbyid = function(elt, id)
        {
            if(elt.num === id)
                return elt;

            if(elt.children){
                var i;
                for(i = 0; i< elt.children.length; i++){
                    var returned_elt = _getbyid(elt.children[i], id);
                    if(returned_elt !== null)
                        return returned_elt;
                }

            }
            return null;
        };
        var _changeId= function(element, suffix)
        {
            element.id = element.id + suffix;
            if(element.children){
                var i;
                for(i = 0; i< element.children.length; i++){
                    _changeId(element.children[i], suffix );
                }
            }
            return null;
        };
        set.getById = function(id)
        {
            return _getbyid(set.getHead(), id);
        };
        set.getParent = function(component){
            if(component.parent !== null)
                return set.getById(component.parent);
            else
                return set.getHead();
        };
        set.getActions = function()
        {
            return actions;
        };
        set.init = function ()
        {
            num = 0;
            head = null;
            set.currentComponent = null;
            set.currentContainer = null;
        };

        set.setcurrentContainer = function (component)
        {
            actions.exec(component);
            set.currentComponent = component;
            if(component.children)
                 set.currentContainer = component;
            else
                set.currentContainer = set.getHead();
        };
        set.getHead = function ()
        {
               return head;
        };

        // module default component (container)
        set.getDefault = function(len)
        {
            var viewName = 'view' + len;
            var c =  {
                num: 0,
                id: 'defaultcontainer',
                type:'partial',
                label: viewName,
                children:[],
                functions : [],
                variables :[],
                operations: [],
                dependencies: []
            };
             set.init();
             set.currentComponent = c;
             set.currentContainer = c;
             head = c;

             return c;
        };

        set.add = function (comp)
        {
            var c;

            if(set.currentComponent === null)
                return null;
            num ++;
            c = {
                num : num,
                id : ''+ comp.type + '' + num ,
                img : comp.img,
                type : comp.type,
                parent : set.currentContainer.num,
                typeparent : set.currentContainer.type,
                designs : comp.designs,
                views : comp.views,
                controllers : comp.controllers
            };

            if(comp.container){
                c.children = [];
            }
            set.currentContainer.children.push(c);
            set.currentComponent = c;
            return c;
        };
        num = 0;
        var lastnum = function(elt){
            var i;
            for(i = 0; i< elt.length; i++){

                if(elt[i].num > num)
                    num = elt[i].num;
                if(elt[i].children)
                    lastnum(elt[i].children);
            }
            return num;
        };

        set.setModel = function (model) {
            head = model;
            set.currentComponent = model;
            set.currentContainer = model;
            num = lastnum(model.children);
        };
        
     return set;
    }])

});