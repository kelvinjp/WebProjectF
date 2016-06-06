'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VehiculosCtrl
 * @description
 * # VehiculosCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('ContactosCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, $http) {

    var init = function () {
      var usuario = $cookieStore.get('user');
      $scope.url ='http://45.55.242.157:8080/api/cliente/get/'+usuario.idusuario;

      $http.get($scope.url).success(function(usr2){
        $scope.contactos =  usr2;
        console.log('Result:'+ JSON.stringify( $scope.contactos) );
        $scope.idusuario =  usuario.idusuario;
        console.log('UsuarioId:'+ $scope.idusuario );

      })
    };
// and fire it after definition
    init();


    var conn = $q.defer();

    conn.promise.then(usrASesion);

    function usrASesion(usr){
      if(usr.affectedRows==1){
        alert("Exito!");

        console.log('Result:'+ JSON.stringify(usr) );
      }else{
        if(usr==undefined){
          console.log('Result:'+ JSON.stringify(usr) );
          alert("Error de Conexion");
        }else{
          console.log('Result:'+ JSON.stringify(usr) );
          alert("Error");
        }
      }
    };



    var conn2 = $q.defer();

    conn2.promise.then(usrASesion);

    function usrASesion2(usr){
      if(usr.affectedRows==1){
        alert("Exito!");

        console.log('Result:'+ JSON.stringify(usr) );
      }else{
        if(usr==undefined){
          console.log('Result:'+ JSON.stringify(usr) );
          alert("Error de Conexion");
        }else{
          console.log('Result:'+ JSON.stringify(usr) );
          alert("Error");
        }
      }
    };


    $scope.clienteNombre = 'Banreservas SRL';
    $scope.clienteRNC = 131104827;
    $scope.clienteTelefono = 8098411883;
    $scope.clienteDireccion = 'Distrito Nacional';
    $scope.clienteEmail = 'kpimentel@banreservas';


    $scope.AgregarContacto = function(){
      var usr =   TareasResourse.clienteAgregar.agregar({
        nombre:$scope.clienteNombre,
        identificacion:$scope.clienteRNC,
        telefono:$scope.clienteTelefono,
        email:$scope.clienteEmail,
        direccion:$scope.clienteDireccion,
        idusuario: $scope.idusuario

      })
        .$promise.then(function(usr){
          init();
          usrASesion2(usr);
          conn.resolve(usr);
        });
    }



    $scope.EliminarContacto = function(contacto){
      var usr =   TareasResourse.clienteEliminar.eliminar({
        idusuario: $scope.idusuario,
        idcliente: contacto.idcliente

      })
        .$promise.then(function(usr){
          console.log('Result1 :'+ JSON.stringify(usr) );
          init();
          usrASesion2(usr);
          conn2.resolve(usr);
        });
    }




    $scope.go = function(contacto) {
      $location.path('/editarContacto/'+ contacto.idcliente);
    };

  });
