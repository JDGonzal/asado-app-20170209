(function(){

    var asaoApp = angular.module('asaoApp', ['firebase']);

    asaoApp.controller('mainCtrl', ['$scope', function($scope){
        console.log('Estamos Adentro de Firebase!');
    }]);

})();