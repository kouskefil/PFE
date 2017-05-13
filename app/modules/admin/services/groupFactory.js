/**
 * Created by kefil on 10/05/17.
 */
define(['configs/app'], function (app){
    'use strict';
    app.register.factory('groupFactory',['$log','$uibModal',function($log,$uibModal) {
        // service definition
        var service = {};
        var currentModule = {};
        var currentGroup = {};
        var modules = [
            {
                name:"Store Management",
                roles:[
                    {
                        name:"Create product",
                        desc : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda, impedit laudantium quasi tenetur vitae? Delectus dicta dolorem dolorum, eius fuga modi quos voluptatem voluptates. Earum hic pariatur tenetur totam?"
                    },
                    {
                        name:"Read product",
                        desc : "Lorem fffgrtgrtgrgrgregerfgregerggrggrg"
                    },
                    {
                        name:"Delete product"
                    }
                ]
            },
            {
                name:"Scolar",
                roles:[
                    {
                        name:"Create student"
                    },
                    {
                        name:"Read note"
                    },
                    {
                        name:"Delete evaluation"
                    }
                ]
            }
        ];
        var groups =  [
            {
                "_id": "5912f70fe8277aa0f9f23bf6",
                "name": "DATAGEN",
                "roles":[
                    {
                        name:"Cupidatat_fugiat_consequat",
                        desc:"Eu do ea eiusmod ea fugiat amet do et. Cupidatat id anim aute"
                    },
                    {
                        name:"readonly",
                        desc:"Eu do ea eiusmod ea fugiat amet do et. Cupidatat id anim aute"
                    }
                ],
                "desc": "Eu do ea eiusmod ea fugiat amet do et. Cupidatat id anim aute quis aliqua consequat amet sit ad Lorem ex nulla esse aliquip. Consectetur amet elit voluptate amet laborum exercitation eu dolore do. Voluptate laboris commodo dolore cupidatat velit sunt non enim Lorem. Minim aute amet ipsum anim pariatur sit.\r\n"
            },
            {
                "_id": "5912f70febbf15cf9a232bb5",
                "name": "ISOTRACK",
                "desc": "Reprehenderit magna mollit ea eu consectetur laboris duis incididunt id ea. Minim esse cillum reprehenderit in anim. Nisi fugiat veniam deserunt sint. Cillum ea qui fugiat tempor id veniam irure minim ullamco adipisicing.\r\n"
            }
        ];
        var skel = {};
        var lookup = function (collection, object) {
            $log.debug('function lookup');
            $log.debug(collection);
            var i,obj = null ;
            for(i = 0; i < collection.length; i++){
                if(collection[i].name == object.name){
                    obj =  collection[i];
                    $log.debug('doublon');
                }

            }
            return obj;
        };
        /**
         * creating new group with popup
         *
         */
        service.newGrp = function(){
            $log.debug('service.newgrp');
            var inst = $uibModal.open({
                template:'  <div>' +
                '        <div class="modal-header">' +
                '         <h5 class="modal-title" id="modal-title1">' +
                '          <i class="fa fa-groups"></i>' +
                '          New group <span class="glyphicon glyphicon-remove" style="float: right" data-ng-click="cancel()"></span>' +
                '         </h5>' +
                '        </div>' +
                '        <div class="modal-body" id="modal-body1">' +
                '         <div class="form-group">' +
                '          <label for="input2">Group name</label>' +
                '          <input class=" form-control"  placeholder="password" name="input2" id="input2" type="text" ng-model="name"/>' +
                '         </div> <!-- div id:input2 -->' +
                '         <div class="form-group">' +
                '          <label for="input3">Description</label>' +
                '          <textarea class=" form-control"  placeholder="password" name="input3" id="input3"  ng-model="desc"></textarea>' +
                '         </div> <!-- div id:input3 -->' +
                '         <div class="modal-footer">' +
                '           <button  style="width:100%"  class="floatingPanel" ng-click="addGroup(group)">Add group</button>' +
                '           </div>'+                          
                '        </div>' +
                '       </div>',
                controller: ['$scope', '$uibModalInstance', '$log', function($scope, $uibModalInstance, $log) {
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.addGroup = function(){
                        groups.push({name:$scope.name, desc:$scope.desc}) ;

                    };

                }]
            });

            // /* `modal.result` is a promise that gets resolved when
            //  * $modalInstance.close() is called */
        };
        /*
        end
         */

        service.grpSkeleton = function (obj) {
            skel =  {
                name:obj.name,
                command:obj.desc,
                roles : []
            };
            return skel;
        };
        service.addGroup = function (group) {
            $log.debug('addgroup longueur = '+ groups.length);
            if( groups.length > 0 && lookup(groups,group)!== null) {
                skel.name = '';
                skel.desc = '';
                skel.roles = [];
                return -1;
            }
            else {
               groups.push(group);
                skel.name = '';
                skel.desc = '';
                skel.roles = [];
                return 0;
            }
        };
        service.getGroups = function () {
          return groups;
        };
        service.getModules = function () {
          return modules;
        };
        service.setCurrentModule = function (module) {
            currentModule = module;
        };
        service.getCurrentModule = function () {
            return currentModule;
        };
        service.getCurrentGroup = function () {
            return currentGroup;
        };
        service.setCurrentGroup = function (group) {
             currentGroup = group;
        };
        service.fillRoles = function (module, group) {
                var roles = [];
                var i,j,r, find = false;
                for(i = 0; i < module.roles.length; i++){
                    for(j = 0; j < group.roles.length; j++) {
                        if(module.roles[i] === group.roles[j]){
                            find = true;
                        }
                    }
                    if(find === false){
                        console.log(module.roles[i]);
                        roles.push(module.roles[i]);
                    }
                }
                console.log(roles);
                return  roles;
        };
        return service;
    }])
});


