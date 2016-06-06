'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:EditarusuarioCtrl
 * @description
 * # EditarusuarioCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('EditarusuarioCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, $http) {
    var init = function () {
      var usuario = $cookieStore.get('user');
      $scope.url ='http://45.55.242.157:8080/api/verUser/'+usuario.idusuario;

      $http.get($scope.url).success(function(usr2){

        var usr = usr2[0];
        $scope.clienteUsername = usr.username;
        $scope.clientePassoword = '';
        $scope.clienteNombre = usr.nombres;
        $scope.clienteApellido = usr.apellidos;
        $scope.clienteEmail = usr.email;
        $scope.clienteTelfono= parseInt(usr.telefono);
        $scope.clienteDireccion = usr.direccion;
        $scope.clienteCedula = usr.identificacion;
      })
    };
// and fire it after definition
    init();
/****
 * Editando..
 * */

var conn = $q.defer();

    conn.promise.then(usrASesion);

    function usrASesion(usr){
      if(usr.affectedRows==1){
        alert("Usuario Actualizado");
      }else{
        if(usr==undefined){
          alert("Error de Conexion");
        }else{
          alert("Error");
        }
      }
    };

    $scope.actualizarCliente = function(){

      var usr =   TareasResourse.editar.cliente({
        nombres: $scope.clienteNombre,
        apellidos: $scope.clienteApellido,
        username: $scope.clienteUsername,
        password: $scope.clientePassoword,
        telefono: $scope.clienteTelfono,
        direccion: $scope.clienteDireccion,
        cedula: $scope.clienteCedula,
        email: $scope.clienteEmail,
        idtipouser: 1
      })
        .$promise.then(function(usr){
          conn.resolve(usr);
        });
    }

  });
