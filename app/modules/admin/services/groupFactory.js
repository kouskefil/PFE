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
        var groups = [
            {
                "_id": "591efc94c6bbba4cd4f5c6a3",
                "name": "RADIANTIX",
                "desc": "Ut consequat fugiat nulla cupidatat adipisicing mollit incididunt consequat. Qui ad deserunt amet fugiat enim consectetur do fugiat excepteur officia deserunt nisi eiusmod. Veniam non cupidatat dolor laborum. Est tempor exercitation laborum minim cillum magna ea. Esse deserunt ex dolor aliqua sit magna cupidatat et amet. Sunt dolor nisi do quis fugiat dolor amet nostrud duis do ad excepteur. Dolor voluptate occaecat aliqua deserunt sint tempor laborum laborum consectetur proident culpa reprehenderit reprehenderit.\r\n"
            },
            {
                "_id": "591efc94570c58482906ecd8",
                "name": "SLUMBERIA",
                "desc": "Nostrud nisi commodo mollit exercitation excepteur sint. Mollit aliqua eu aliquip est sint incididunt sit. Consectetur laboris in eu mollit eu deserunt sint nostrud. Proident do reprehenderit voluptate irure laborum aliqua exercitation. Officia anim sint commodo excepteur ex elit excepteur magna aute consequat deserunt. Magna enim anim ex tempor quis.\r\n"
            },
            {
                "_id": "591efc9487eaf9378c71f82b",
                "name": "ENTOGROK",
                "desc": "Minim non culpa sint velit id tempor amet magna cupidatat cupidatat. Cupidatat culpa veniam ipsum elit ad. Amet eu ipsum ullamco nulla quis. Tempor commodo in culpa deserunt et sit cillum velit non excepteur. Irure consequat ad deserunt tempor. Duis esse Lorem duis officia. Proident sint duis occaecat velit consectetur incididunt dolore laboris.\r\n"
            },
            {
                "_id": "591efc944803e7a58c963e80",
                "name": "KYAGURU",
                "desc": "Labore nulla dolor laborum mollit sunt mollit sunt non. Non qui eu ad non ipsum ad ipsum sit ea. Id culpa dolore exercitation ut ea reprehenderit excepteur. Pariatur esse minim mollit veniam eu cillum.\r\n"
            },
            {
                "_id": "591efc941b32304149d2e8b3",
                "name": "INSOURCE",
                "desc": "Tempor Lorem ad exercitation quis minim adipisicing magna tempor dolore anim. Consequat sunt id id elit dolore ullamco veniam enim deserunt dolor do dolore id enim. Fugiat sunt laborum ea pariatur enim aute labore ea in.\r\n"
            },
            {
                "_id": "591efc94e7b64c2f4c577570",
                "name": "KEGULAR",
                "desc": "In ipsum aliqua consequat laborum minim duis sit. Dolor nostrud laboris sit Lorem proident incididunt nulla adipisicing velit minim deserunt proident aute et. Sunt nisi aute excepteur id aliqua in do incididunt veniam laborum. Velit reprehenderit commodo quis mollit.\r\n"
            },
            {
                "_id": "591efc9434c1a5e1e3ab8de4",
                "name": "ERSUM",
                "desc": "Do adipisicing aliqua velit eiusmod dolor laborum in aute incididunt cupidatat commodo proident. Sunt ea irure duis ea excepteur do dolore veniam nisi laboris nisi dolor est. Non officia in qui eiusmod eu nulla. Laborum laboris do commodo occaecat laborum. Quis aute dolor sit culpa deserunt non sunt quis nisi nulla officia non. Et esse excepteur tempor nisi.\r\n"
            },
            {
                "_id": "591efc94f81d2a1267b49d06",
                "name": "MANTRIX",
                "desc": "Eu irure incididunt dolor aliquip laborum deserunt. Mollit ullamco pariatur velit est voluptate aliqua aliqua adipisicing labore aute eiusmod commodo velit cupidatat. Laborum officia esse est anim elit tempor aliqua elit est aliquip irure non sunt consectetur. Dolor in ad qui elit fugiat labore ex voluptate.\r\n"
            },
            {
                "_id": "591efc9449e8cfe9b93ce69e",
                "name": "MANGLO",
                "desc": "Non tempor sit excepteur duis laboris non in sunt. Culpa labore officia ex laboris ullamco aute eiusmod do ipsum duis. Irure id sunt culpa ea proident qui dolor in occaecat. Amet consectetur cupidatat pariatur non sint.\r\n"
            },
            {
                "_id": "591efc94b203dd1a8e726520",
                "name": "DANCERITY",
                "desc": "Culpa veniam est esse ipsum sint consectetur minim officia nulla sunt laboris. Excepteur ea labore cupidatat consequat qui consequat eu in consectetur. Proident Lorem et magna culpa dolore. Esse labore aliqua occaecat dolore Lorem elit culpa ea in ex do Lorem eu irure. Ex non nostrud irure esse cillum ipsum cillum nisi. Non ut incididunt aliquip labore excepteur labore Lorem ex aliqua aliquip reprehenderit adipisicing.\r\n"
            },
            {
                "_id": "591efc94ca7233d501b88c99",
                "name": "JASPER",
                "desc": "Ad veniam cillum do sunt reprehenderit mollit reprehenderit non. Sint velit duis culpa ad sint nisi pariatur reprehenderit ullamco esse pariatur mollit eu. Magna ut amet nulla quis cupidatat. Ad quis ex aliquip elit.\r\n"
            },
            {
                "_id": "591efc9486b25f60bb7aec16",
                "name": "SIGNIDYNE",
                "desc": "Voluptate deserunt elit do consectetur aute dolor excepteur sit dolor pariatur officia. Quis sint labore tempor fugiat fugiat consectetur est. Enim nulla occaecat velit duis ea quis dolor in non anim mollit.\r\n"
            },
            {
                "_id": "591efc94bdb221e671231b2c",
                "name": "INEAR",
                "desc": "Duis adipisicing Lorem aliquip et ad dolore. Eiusmod commodo eiusmod eiusmod id proident enim exercitation eiusmod amet sint qui. Ea culpa elit laborum minim laboris Lorem sit ea labore. Exercitation dolore adipisicing mollit eu consectetur minim commodo exercitation adipisicing reprehenderit.\r\n"
            },
            {
                "_id": "591efc94bd442d29002a3cab",
                "name": "ISOLOGICS",
                "desc": "Culpa enim duis Lorem dolor et ipsum. Eu dolore nulla enim excepteur nisi cillum est excepteur culpa non. Ullamco aute esse sunt ad esse culpa consequat Lorem ea duis. Enim quis sit cupidatat in pariatur aute nisi aliqua sunt. Ut elit ipsum labore proident minim ex do quis tempor. Voluptate sint labore velit enim sunt sint sint do laboris velit deserunt occaecat adipisicing. Veniam amet irure magna voluptate minim eu dolore id labore adipisicing nulla consequat nulla.\r\n"
            },
            {
                "_id": "591efc94cb780e9e7ab22f1d",
                "name": "NETUR",
                "desc": "Nisi cupidatat aliquip consequat nisi. Aliqua labore duis enim quis anim enim dolor culpa magna sunt cillum adipisicing aliquip. Aliqua fugiat enim occaecat officia ut. Anim culpa dolor mollit enim amet pariatur aliqua sunt sunt consequat aliquip. Incididunt nisi sunt occaecat ex aute deserunt mollit tempor officia. Adipisicing labore velit deserunt tempor. Dolor fugiat cillum ut quis anim magna et laborum.\r\n"
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
        service.newGrp = function(template){
            $log.debug('service.newgrp');
            var inst = $uibModal.open({
                templateUrl:template,
                controller: ['$scope', '$uibModalInstance', '$log', function($scope, $uibModalInstance, $log) {
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.grpTmp = [];
                    $scope.addGroup = function(){
                        var i;
                        for(i = 0; i < $scope.grpTmp.length; i++){
                            groups.push($scope.grpTmp[i]);
                        }
                        $scope.cancel();
                    };
                    $scope.tmpAdd = function () {
                        $scope.grpTmp.push({name:$scope.name, desc:$scope.desc}) ;
                        $scope.name = "";
                        $scope.desc = "";
                    };


                }]
            });
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
        // service.fillRoles = function (module, group) {
        //         var roles = [];
        //         var i,j,r, find = false;
        //         for(i = 0; i < module.roles.length; i++){
        //             for(j = 0; j < group.roles.length; j++) {
        //                 if(module.roles[i] === group.roles[j]){
        //                     find = true;
        //                 }
        //             }
        //             if(find === false){
        //                 console.log(module.roles[i]);
        //                 roles.push(module.roles[i]);
        //             }
        //         }
        //         console.log(roles);
        //         return  roles;
        // };
        return service;
    }])
});


