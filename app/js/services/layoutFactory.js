/**
 * Created by kefil on 19/02/17.
 */
define(['angular'], function (angular) {
    'use strict';
    angular.module('layoutModule', []).factory('layoutFactory', function () {

        var layout = {
            sidebar : {
                items:[],
                links : []
            },
            nav:{
                mName : [],
                modules:[],
                tasks : []
            }
        };

        var fac = {};

        // actions to display on operations bar
        var operations = [];
        var actions = null;
        var location = [];
        var dashboardConfig = [];
        //dashboard layout configuration
        fac.setDashboardConf = function(config){
           var i;
           dashboardConfig.length = 0;
           for (i = 0; i < config.length; i++){
               dashboardConfig.push(config[i]);
           }
        }  ;
        fac.getDashboardConf = function(){
            return dashboardConfig;
        };
        
        fac.setLocation = function(str){
            location.length = 0;
            location[0] = str;
        };
        fac.getCurrentLocation = function(){
            return location;
        };

        fac.setOperations = function (opCollection) {
            var i;
            operations.length = 0;
            for (i = 0; i < opCollection.length; i++)
                operations.push(opCollection[i]);
        };
        fac.getOperations = function () {
            return operations;
        };

        fac.setAction = function (actionsCollection) {
            actions = actionsCollection;
        };

        fac.getActions = function () {
            return actions;
        };
        fac.execMenuItem = function (action) {
            var func = actions[action];
            if(angular.isFunction(func))
                func();
        };
        // operations bar end

        fac.getmName = function(){
            return layout.nav.mName;
        };
        fac.getItems = function(){
            return layout.sidebar.items;
        };
        fac.getLinks = function(){
            return layout.sidebar.links;
        };
        fac.getTasks = function(){
            return layout.nav.tasks;
        };
        fac.getModules = function(){
            return layout.nav.modules;
        };

        fac.setmName = function(name){
            layout.nav.mName.length = 0;
            layout.nav.mName.push(name);
        };
        fac.setItems = function(items){
            var i;
            layout.sidebar.items.length = 0;

            for(i=0; i < items.length; i++)
                layout.sidebar.items.push(items[i]);
        };
        fac.setLinks = function(links){
            var i;
            layout.sidebar.links.length = 0;

            for(i=0; i < links.length; i++)
                layout.sidebar.links.push(links[i]);
        };
        fac.setTasks = function(tasks){
            var i;
            layout.nav.tasks.length = 0;

            for(i=0; i < tasks.length; i++)
                layout.nav.tasks.push(tasks[i]);
        };
        fac.setModules = function(modules){
            var i;
            layout.nav.modules.length = 0;

            for(i=0; i < modules.length; i++)
                layout.nav.modules.push(modules[i]);
        };

        return fac;
    })
});
