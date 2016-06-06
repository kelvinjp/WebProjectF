'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VehiculosCtrl
 * @description
 * # VehiculosCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('VehiculosCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, $http) {

    var init = function () {
      var usuario = $cookieStore.get('user');
      $scope.url ='http://45.55.242.157:8080/verVehiculos/'+usuario.idusuario;

      $http.get($scope.url).success(function(usr2){
        $scope.vehiculos =  usr2;

      })
    };
// and fire it after definition
    init();


    var conn = $q.defer();

    conn.promise.then(usrASesion);

    function usrASesion(usr){
      if(usr.affectedRows==1){
        init();
        $location.path('/vehiculos');
      }else{
        if(usr==undefined){
          alert("Error de Conexion");
        }else{
          alert("Error");
        }
      }
    };

    $scope.eliminarVehiculo = function(vehiculo){
      var usr =   TareasResourse.eliminarVehiculo.eliminar({
        idvehiculo: vehiculo.idvehiculo,

      })
        .$promise.then(function(usr){
          conn.resolve(usr);
        });
    }

  });
