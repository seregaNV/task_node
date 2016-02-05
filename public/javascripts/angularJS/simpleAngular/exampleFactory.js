(function() {
    "use strict";
    function eF() {
        console.log('example factory');
        return {
            arr: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'NodeJS', 'ExpressJS']
        };
    }
    var app = angular.module('app');
    app.factory('exampleFactory', eF);
})();