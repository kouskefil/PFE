/**
 * Created by kefil on 29/11/16.
 */
'use strict';

define(['configs/app',
    '../controllers/user',
    '../controllers/userDetails',
    '../controllers/group',
    '../services/underscore-min',
    '../services/pagerService',
    '../services/userFactory',
    '../services/groupFactory',
    '../../../js/services/layoutFactory'

], function(app){
    app.register.stateProvider

        .state('root.admin',
            {
                url:'/admin',
                template:'<div ui-view=""></div>',
                onEnter:function (layoutFactory) {
                    layoutFactory.setmName("Admin");
                }
            })
        .state('root.admin.init',
            {
                url:'/admin',
                templateUrl:'app/modules/admin/views/userlist.html',
                onEnter: function (layoutFactory) {
                    layoutFactory.setItems([
                        {
                            name:'Users',
                            state:'root.admin.init'   ,
                            icon:'glyphicon glyphicon-user'
                        },
                        {
                            name:'Groups',
                            state:'root.admin.groups'   ,
                            icon:'fa fa-group'
                        }
                    ]);
                    layoutFactory.setOperations( [
                        {
                            name:"new",
                            icon:"glyphicon glyphicon-edit",
                            action:function () {
                            }
                        },
                        {
                            name: "save",
                            icon: "glyphicon glyphicon-floppy-save",
                            action:function () {

                            }
                        }
                    ]);
                },
                controller:'users'
            }
        )
        .state('root.admin.user',{
            url:'/user-admin',
            templateUrl:'app/modules/admin/views/userdetails.html',
            onEnter : function (layoutFactory, userFactory) {
                layoutFactory.setOperations(
                    [
                        {
                            name:"new",
                            icon:"glyphicon glyphicon-edit",
                            action:function () {
                                userFactory.newUser('app/modules/admin/views/newUser.html');
                            }
                        },
                        {
                            name:"resetPass",
                            icon:"fa fa-recycle",
                            action:function () {
                            }
                        },
                        {
                            name:"disable",
                            icon:"fa fa-user",
                            action:function () {
                            }
                        }
                    ]
                )

            },
            controller:'userdetails'

        })
        .state('root.admin.groups',{
            url:'/user-groups',
            templateUrl:'app/modules/admin/views/group.html',
            onEnter: function (layoutFactory, groupFactory,$log) {
                layoutFactory.setLocation('Users groups');
                layoutFactory.setOperations( [
                    {
                        name:"new",
                        icon:"glyphicon glyphicon-edit",
                        action:function () {
                            groupFactory.newGrp();
                        }
                    },
                    {
                        name: "save",
                        icon: "glyphicon glyphicon-floppy-save",
                        action:function () {
                            $log.debug('setOperation');

                        }
                    }
                ]);
            },
            controller:'groups'
        })
});
