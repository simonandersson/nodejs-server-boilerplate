/* jshint -W097 */
/* global require, module, console, alert, angular, $ */

'use strict';

(function() {
  var app = angular.module('main', ['ngResource', 'ngRoute']);
  app.jQuery = $;

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/index.html',
      controller: 'main.controller'
    });
  }]);


  app.controller('main.controller', function($scope) {

  });

})();
