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
  .controller('EditablerowCtrl', function ($scope, $filter, $http, $q, TareasResourse ) {

    function setTareas(){
      $scope.tareas = TareasResourse.getEstados.all();
    }

    setTareas();

    $scope.editar = false;

    $scope.saveUser = function(data, id) {

      //$scope.user not updated yet
      if(id==-1){
        var usr =  TareasResourse.addEstado.new({
          nombre:data.nombre,
          Descripcion:data.Descripcion
        });
        usr.$promise.then(function(result){
          setTareas();
        });
      }else{
        console.log(data);
        var usr = TareasResourse.Estado.editar({
          idestado:id,
          nombre:data.nombre,
          Descripcion:data.Descripcion
        });
        usr.$promise.then(function(result){
          setTareas();
        });
      }
    };

    $scope.removeUser = function(index) {
      var usr = TareasResourse.deleteEstado.dl({
        idestado:index
      });
      usr.$promise.then(function(result){
        setTareas();
      });
    };
//-------------------------------------------------------------------

    $scope.addEstado = function() {
      $scope.inserted = {
        idestado: -1,
        nombre: '',
        Descripcion: ''
      };
      $scope.tareas.push($scope.inserted);
    };
  });
