/**
 * Created by kefil on 19/03/17.
 */
define(['configs/app'], function (app){
    app.register.factory('actionsFactory',[function() {

        var operations = [];
        var actions = null;
        return {
            setOperations: function (opCollection) {
                var i;
                operations.length = 0;

                for (i = 0; i < opCollection.length; i++)
                    operations.push(opCollection[i]);
            },
            getOperations : function () {
                return operations;
            },

            setAction : function (actionsCollection) {
                actions = actionsCollection;
            },

            getActions : function () {
                return actions;
            },
            execMenuItem : function (action) {
                var func = actions[action];
                if(angular.isFunction(func))
                    func();
            }
        }

    }])
});
