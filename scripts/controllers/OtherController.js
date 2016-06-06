'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:navegCtrl
 * @description
 * # navegCtrl
 * Controller of the appApp
 */
angular.module('appApp')
.controller('OtherController', function ($scope) {


    $scope.pageChangeHandler = function(num) {
      console.log('going to page ' + num);
    };

    }

);
