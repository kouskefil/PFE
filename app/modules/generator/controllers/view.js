'use strict';
define(['configs/app'], function (app){
 app.register.controller('view',['$scope','$state','globalVarFactory', 'HTMLcomponents','componentSet', function($scope,$state,globalVarFactory, HTMLcomponents, componentSet){
      $scope.HTMLcomponents = HTMLcomponents;
      $scope.components = null;

      //variables to add in the model

      $scope.currentComponent = globalVarFactory.getModelHead().then(function (data) {
       $scope.currentComponent = data;
       $scope.components = data;

      });
      // The ui-codemirror option
      $scope.cmOption =
      {
       lineNumbers: true,
       indentWithTabs: true,
       onLoad : function(_cm){
        _cm.setOption("mode", 'javascript');

       }
      };

      console.log('cmoption');
      console.log($scope.cmOption);


      $scope.setModel = function (model) {
       globalVarFactory.setModel(model);
       $scope.components = model;
       $scope.currentModel = model;
       $scope.currentComponent = model;
       console.log($scope.components);
      } ;

      //**************************************** fonctions à ajouter dans le model----------
      $scope.addoperation = function () {
       $scope.currentModel.operations.push($scope.operation);
       $scope.operation = {};
      };
      $scope.setoperation = function (operation) {
       $scope.operation = operation;
       $scope.currentoperation = operation;
      };
      $scope.delOperation = function () {
       if ($scope.currentoperation !== null) {
        var pos = $scope.currentComponent.operations.indexOf($scope.currentoperation);
        $scope.currentComponent.operations.splice(pos, 1);
        $scope.operation = {};
        $scope.currentoperation = null;
       }
      };

      //    Variables  functions

      $scope.addv = function () {
       $scope.currentModel.variables.push($scope.variable);
       $scope.variable = {};
      };

      $scope.delv = function () {
       if($scope.variable !== null){
        var pos = $scope.currentModel.variables.indexOf($scope.variable);
        $scope.currentModel.variables.splice(pos,1);
        $scope.variable = {};
        $scope.variable = null;
       }
      };

      $scope.setv = function (variable) {
       $scope.variable  =  variable;
      };

      $scope.clear = function () {
       $scope.operation = {};
      };

      $scope.collection = [];
      $scope.operation = [];
      $scope.select_option = [];

      $scope.g_Add = function (int, obj) {
       $scope.components.variables.push(obj);
       console.log(obj);
       $scope.g_Clear(int);

      };

      //***************************************************************************************

      $scope.treeActions = globalVarFactory.getTreeAction();

      $scope.setcurrentContainer = function (component) {
       globalVarFactory.setcurrentContainer(component);
       $scope.currentComponent = component;
      };
      $scope.models = globalVarFactory.getModule().models;
      console.log('models');
      console.log($scope.models);
      $scope.receptab =  [
       {
        "id":"0" ,
        "label": "config",
        "anchor": "config"
       },
       {
        "id":"1" ,
        "label": "tree",
        "anchor": "tree"
       },
       {
        "id":"2" ,
        "label": "function",
        "anchor": "function"
       },
       {
        "id":"3" ,
        "label": "operation",
        "anchor": "operations"
       },
       {
        "id":"4" ,
        "label": "variable",
        "anchor": "variable"
       }
      ];
      $scope.comptab = [
       {
        "id":"comp" ,
        "label": "component",
        "anchor": "component"
       },
       {
        "id":"view" ,
        "label": "views",
        "anchor": "views"
       }

      ];
      $scope.add = function (component)
      {
       console.log('composant ajouté');
       console.log(component);
       var c = componentSet.add(component);
       $scope.currentComponent = c;
       if(c !== null)
        $state.go("root.generator.views.properties",{label:c.label, type:c.type, num:c.num});
      };
      //*******************************************FONCTIONS À METTRE DANS LA DIRECTIVE treeview
      // function à ajouter dans le controller
      $scope.applytreeActions = function (action, component) {

       switch(action.todo){
        case 1:
         $scope.up(component);
         break;
        case 2:
         $scope.down(component);
         break;
        case 3:
         $scope.clone(component);
         break;
        case 4:
         $scope.cut(component);
         break;
        case 5:
         $scope.delete(component);
         break;
        default:
         console.log("unknown case option");
       }

      };
      $scope.go = function(component){
       $state.go("root.generator.views.properties", {label: component.label, type: component.type, num: component.num});
      };
      $scope.up = function(component){
       componentSet.getActions().moveup(component);
      };
      $scope.cut = function(component){
       componentSet.getActions().cut(component);
      };
      $scope.delete = function(component){
       componentSet.getActions().delete(component);
      };
      $scope.clone = function(component){
       componentSet.getActions().clone(component);
      };
      $scope.down = function(component){
       componentSet.getActions().movedown(component);
      };

      $scope.cclick = function (selectedNode) {
       console.log(selectedNode);
       $scope.setcurrentContainer(selectedNode);
       componentSet.currentComponent = selectedNode;
       $scope.go($scope.currentComponent);
      };

     }]

 );
});
