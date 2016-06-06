'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AltaCtrl
 * @description
 * # AltaCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('addVehiculoCtrl', function ($scope, $q, $filter, $http, $cookieStore, $location, TareasResourse) {
    var usuario = $cookieStore.get('user');
    $scope.vehiculoMarca = '';
    $scope.vehiculoModelo = '';
    $scope.vehiculoFecha = '';
    $scope.vehiculoPlaca = '';
    $scope.vehiculoChasis = '';
    $scope.vehiculoColor = '';
    

    var apiconn = $q.defer();

    apiconn.promise.then(usrASesion);

    function usrASesion(usr){
      if(usr.affectedRows==1){
        $location.path('/vehiculos');
      }else{
        if(usr==undefined){
        alert("Error de Conexion");
        }else{
          alert("No se pudo agregar.");
        }
      }

    };

    $scope.altaVehiculo = function(){
      var usr =   TareasResourse.vehiculo.add({
         color: $scope.vehiculoColor,
        placa: $scope.vehiculoPlaca,
        chasis: $scope.vehiculoChasis,
        idusuario: usuario.idusuario,
        marca: $scope.vehiculoMarca,
        modelo: $scope.vehiculoModelo,
        fecha: $scope.vehiculoFecha
      })
        .$promise.then(function(usr){
          apiconn.resolve(usr);
        });
    }

  });
