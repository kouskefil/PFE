/**
 * Created by kefil on 04/03/17.
 */
define(['configs/app'], function (app){
    app.register.factory('generatorFactory',[function() {

       return{
           usermodules : function (name) {
               return [
                   {
                       name:'Client Management',
                       date:'2017-12-02',
                       desc:'Lorem'
                   },
                   {
                       name:'Student',
                       date:'2017-12-02',
                       desc:'fefnifjlhfiuhiuhfie'
                   }
               ];
           }
       }


    }])
});
