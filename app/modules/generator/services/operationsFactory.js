/** Created by kefil on 23/01/17. */
define(['configs/app'], function (app){
    app.register.factory('operationsFactory',['globalVarFactory',function(globalVarFactory) {
        var skel;
        var operations = globalVarFactory.getModule().operations;
        var lookup = function (name) {
            var obj = null ;
            for(i = 0; i < operations.length; i++){
                if(operations[i].name == name)
                    obj =  operations[i];
            }
            return obj;
        };
        return {
        operations : function () {
            return operations
        },
        skeleton : function () {
            skel =  {
                name:'',
                command:'',
                out:'',
                sql:'',
                inputs:[]
            };
            return skel;
        },

        addop : function () {
            if( operations.length > 0 && lookup(angular.copy(skel.name)) != null) {
                return 1;
            }else {
                operations.push(angular.copy(skel));
                skel.name = '';
                skel.command = '';
                skel.out = '';
                skel.sql = '';
                skel.inputs = [];

                return 0;
            }
        }
    }

    }])
})
