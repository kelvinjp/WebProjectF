'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AltaCtrl
 * @description
 * # AltaCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('Alta2Ctrl', function ($scope,$q, $filter, $http, $cookieStore, $location, TareasResourse) {
   $scope.tipos =  [{id:0, nombre:'Administrador'},{id:1, nombre:'Cliente'}];
    $scope.selectedEstado = $scope.tipos[1]; 
     
    $scope.clienteUsername = '';
    $scope.clientePassoword = '';
    $scope.clienteNombre = '';
    $scope.clienteApellido = '';
    $scope.clienteEmail = '';
    $scope.clienteTelfono = '';
    $scope.email = '';
    $scope.clienteDireccion = '';
    $scope.clienteCedula ='';


    var conn = $q.defer();

    conn.promise.then(usrASesion);

    function usrASesion(usr){
      if(usr.affectedRows==1){
        $location.path('/registrado');
      }else{
        if(usr==undefined){
        alert("Error de Conexion");
        }else{
          alert("Este Usuario ya existe");
        }
      }

    };

    $scope.altaClietne = function(){
      alert($scope.selectedEstado.id); 

      var usr =   TareasResourse.addCliente.nuevoCliente({
        nombres: $scope.clienteNombre,
        apellidos: $scope.clienteApellido,
        username: $scope.clienteUsername,
        password: $scope.clientePassoword,
        telefono: $scope.clienteTelfono,
        direccion: $scope.clienteDireccion,
        cedula: $scope.clienteCedula,
        email: $scope.clienteEmail,
        idtipouser:  $scope.selectedEstado.id
      })
        .$promise.then(function(usr){
          conn.resolve(usr);
        });
    }

  });
