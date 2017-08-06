'use strict';
define(['configs/app'], function (app){
    app.register.controller('view',['$scope','$state','globalVarFactory', 'HTMLcomponents','componentSet', function($scope,$state,globalVarFactory, HTMLcomponents, componentSet){
            $scope.HTMLcomponents = HTMLcomponents;
            $scope.components = null;
            $scope.updateparam = false;
            $scope.action = {};
            $scope.variable = {};
            $scope.function = {};
            $scope.selected = '';
            $scope.treeActions = globalVarFactory.getTreeAction();
            $scope.cmOption =    {
                    lineNumbers: true,
                    indentWithTabs: true,
                    onLoad : function(_cm){
                        _cm.setOption("mode", "javascript");
                    }
                };
            $scope.currentComponent = globalVarFactory.getModelHead().then(function (data) {
                $scope.currentComponent = data;
                $scope.components = data;

            });
            $scope.setModel = function (model) {
                globalVarFactory.setModel(model);
                $scope.components = model;
                $scope.currentModel = model;
                $scope.currentComponent = model;
				$scope.selected = $scope.currentModel.label;
				$scope.init();
                console.log($scope.components);
            } ;
            $scope.init = function () {
                $scope.updateparam = false;
                $scope.action = {};
                $scope.variable = {};
                $scope.function = {};
            };
            $scope.addParams = function (paramName) {
                if(paramName == 'function'){
                    if (!$scope.currentModel.functions)
                        $scope.currentModel.functions = [];
                    globalVarFactory.add($scope.function, $scope.currentModel.functions);
                    $scope.function = {};
                }
                else if (paramName == 'variable'){
                    if (!$scope.currentModel.variables)
                        $scope.currentModel.variables = [];
                    globalVarFactory.add($scope.variable, $scope.currentModel.variables);
                    console.log($scope.variable);
                }
                else {
                     if(!$scope.currentModel.actions)
                         $scope.currentModel.actions = [];
                    globalVarFactory.add($scope.action, $scope.currentModel.actions);
                    $scope.action = {};
                }

            };
            $scope.setParam = function (obj, typeofobj) {
                console.log(obj);
                $scope.updateparam = true;
                 if (typeofobj == 'function'){
                     $scope.oldParam = obj;
                     $scope.function = obj;
                 }
                 else if (typeofobj == 'variable'){
                     $scope.oldParam = obj;
                     $scope.variable = obj;
                 }
                 else{
                     $scope.oldParam = obj;
                     $scope.action = obj;
                 }
            };
            $scope.deleteParam = function (paramName, obj) {
                if (paramName == 'function')
                   globalVarFactory.delete(obj, $scope.currentModel.functions);
                else if (paramName == 'variable')
                    globalVarFactory.delete(obj, $scope.currentModel.variables);
                else
                    globalVarFactory.delete(obj, $scope.currentModel.actions);
            };
            $scope.updateParam = function (paramName) {
                if (paramName == 'function') {
                    globalVarFactory.update($scope.oldParam, $scope.function, $scope.currentModel.functions);
                    $scope.function = {};
                    $scope.oldParam = {};
                }
                else if (paramName == 'variable') {
                    globalVarFactory.update($scope.oldParam, $scope.variable, $scope.currentModel.variables);
                    $scope.variable = {};
                    $scope.oldParam = {};
                }
                else{
                    globalVarFactory.update($scope.oldParam, $scope.action, $scope.currentModel.actions);
                    $scope.action = {};
                    $scope.oldParam = {};
                }
                $scope.updateparam = false;
            };
            $scope.next = function (paramName) {
                var index;
                switch (paramName){
                    case "function":
                        index = globalVarFactory.memberOf($scope.function, $scope.currentModel.functions).index;
                        if (index != -1 && $scope.currentModel.functions.length > index ) {
                            console.log("long"+$scope.currentModel.functions.length);
                            $scope.function = $scope.currentModel.functions[index + 1];
                        }
                        break;
                    default: console.log(paramName);
                }
            };

            $scope.setcurrentContainer = function (component) {
                globalVarFactory.setcurrentContainer(component);
                $scope.currentComponent = component;
            };
            $scope.models = globalVarFactory.getModule().models;
            $scope.add = function (component) {
                console.log('composant ajouté');
                console.log(component);
                var c = componentSet.add(component);
                $scope.currentComponent = c;
                if(c !== null)
                    $state.go("root.generator.views.properties",{label:c.label, type:c.type, num:c.num});
            };
            $scope.applytreeActions = function (action, component) {
                switch(action.todo){
                    case 1:
                        componentSet.getActions().moveup(component);
                        break;
                    case 2:
                        componentSet.getActions().movedown(component);
                        break;
                    case 3:
                        componentSet.getActions().clone(component);
                        break;
                    case 4:
                        componentSet.getActions().cut(component);
                        break;
                    case 5:
                        componentSet.getActions().delete(component);
                        break;
                    default:
                        console.log("unknown case option");
                }
            };
            $scope.go = function(component){
                $state.go("root.generator.views.properties", {label: component.label, type: component.type, num: component.num});
            };
            $scope.deleteModel = function (model) {
                 globalVarFactory.gDelete(globalVarFactory.getModule().models, model);
            };
            $scope.cclick = function (selectedNode) {
                console.log(selectedNode);
                $scope.setcurrentContainer(selectedNode);
                componentSet.currentComponent = selectedNode;
                $scope.go($scope.currentComponent);

            };
            $scope.addcol = function () {
                if(!$scope.currentComponent.columns)
                    $scope.currentComponent.columns = [];
                 $scope.currentComponent.columns.push($scope.currentComponent.c);
                 // $scope.currentComponent.c = {};
            };
            $scope.deleteCol = function (col) {
              globalVarFactory.gDelete($scope.currentComponent.columns, col);
            };
            $scope.oneAtATime = true;

            var _generatevar = function (component, vars) {
                var i, comp;
                console.log(component.model);

                if(component.model != null && component.model != undefined) {
                    comp = component.model.split('.');
                    if (comp.length >= 2) {
                        for (i = 0; i < vars.length; i++)
                            if (vars[i].id == component.id) {
                                vars[i].name = comp;
                                return;
                            }
                        vars.push(
                            {
                                id: component.id,
                                name: comp[0],
                                value: "{}"
                            })
                    }
                }

            };
            var _generatevars = function (composants, vars) {
                var i,j;

                for (i = 0; i < composants.length; i++){
                    console.log('_generatevars') ;
                    console.log(composants[i].type) ;
                    console.log(composants[i].children) ;

                    _generatevar(composants[i], vars);
                    if (composants[i].children != null && composants[i].children != undefined){
                        console.log('in the if') ;
                        _generatevars(composants[i].children, vars);

                    }

                }
            };
            $scope.generatevars = function () {
                console.log($scope.currentModel.children);
                _generatevars($scope.currentModel.children, $scope.currentModel.variables);
            }

        }]

    );
});
