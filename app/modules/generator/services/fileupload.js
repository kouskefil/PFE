/**
 * Created by kefil on 01/07/17.
 */

define(['configs/app'], function (app){
    app.register.factory('fileupload',['$http', function ($http) {
        return $http({method: 'POST', url: file})
            .success(function (){

            });
        
    }])

});
