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
    '../../../js/services/layoutFactory',
    '../directive/edituser'

], function(app){
    app.register.stateProvider
        .state('root.admin',{
                url:'/admin',
                template:'<div ui-view=""></div>',
                onEnter:function (layoutFactory) {
                    layoutFactory.setmName("Admin");
                }
            })
        .state('root.admin.init', {
                url:'/admin',
                templateUrl:'app/modules/admin/views/userlist.html',
                onEnter: function (layoutFactory,userFactory) {
                    layoutFactory.setLocation('Users ');
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
                                userFactory.editUser('app/modules/admin/views/newUser.html');
                            }
                        }
                    ]);
                },
                controller:'users'
            })
        .state('root.admin.user',{
            url:'/user-admin',
            templateUrl:'app/modules/admin/views/userdetails.html',
            onEnter : function (layoutFactory, userFactory) {
                layoutFactory.setLocation('User settings');
                layoutFactory.setOperations(
                    [
                        {
                            name:"new",
                            icon:"glyphicon glyphicon-edit",
                            action:function () {
                                userFactory.editUser('app/modules/admin/views/newUser.html');
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
                                userFactory.editUser('app/modules/admin/views/disable_user.html');
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
                            groupFactory.newGrp('app/modules/admin/views/newGrp.html');
                        }
                    }
                ]);
            },
            controller:'groups'
        })
});
