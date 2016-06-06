/**
 * Created by kelvinjp on 26/04/2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name angularv1App.controller:EditablerowCtrl
 * @description
 * # EditablerowCtrl
 * Controller of the angularv1App
 */
angular.module('appApp')
  .controller('membresiasCtrl', function ($scope, $filter, $http, $q, $location,TareasResourse) {
    $scope.tareas = TareasResourse.getMembresias.all();

    $scope.editar = false;

    $scope.saveUser = function(data, id) {
      if(id==-1){
          var usr= TareasResourse.addMembresia.new({
          nombre:data.nombre,
          dias:data.dias
        });
        usr.$promise.then(function(result){
          $scope.tareas = TareasResourse.getMembresias.all();
        });
      }else{
        console.log(data);
        var usr =  TareasResourse.editMembresia.editar({
          idmebresia:id,
          nombre:data.nombre,
          dias:data.dias
        });
        usr.$promise.then(function(result){
          $scope.tareas = TareasResourse.getMembresias.all();
        });
      }
    };

    $scope.removeUser = function(index) {
      var usr = TareasResourse.deleteMembresia.dl({
        idmebresia:index
      });
      usr.$promise.then(function(result){
        $scope.tareas = TareasResourse.getMembresias.all();
      });
    };
//-------------------------------------------------------------------

    $scope.addMembresia = function() {
      $scope.inserted = {
        idmebresia: -1,
        dias: ''
      };

      $scope.tareas.push($scope.inserted);
    };


  });
