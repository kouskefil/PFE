/**
 * Created by kefil on 08/02/17.
 */
define(['configs/app'], function (app){
    app.register.factory('mnsFactory',['globalVarFactory',function(globalVarFactory) {

        var menus = globalVarFactory.getModule().menus;
        var currentMns ;
        var memberOf = function(tab, elt1, elt2){
            var i;
            for(i=0; i<tab.length; i++){
                if(tab[i].name == elt1 && tab[i].parent == elt2)
                    return true;
            }
            return false;
        };


        var mnsFactory = {

            menus : function () {
                return menus;
            },
            skeleton : function () {
                currentMns =  {};
                return currentMns;
            },
            menuAdd : function(){

            var mns = angular.copy(currentMns);
            var i;
            if(menus.length == 0){
                menus.push(mns);

                if(currentMns.parent)
                     currentMns.parent = '';

                currentMns.name = '';
                currentMns.permission = '';
                currentMns.type = '';
                currentMns.userRole = '';
            }
            else{
                if(memberOf(menus, mns.name, mns.parent) == false){
                    menus.push(mns);
                    currentMns.parent = '';
                    currentMns.name = '';
                    currentMns.permission = '';
                    currentMns.type = '';
                    currentMns.userRole = '';
                }
            }
            console.log(menus);
         }
        };

        return mnsFactory;



    }])})