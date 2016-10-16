'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AlertasCtrl
 * @description
 * # AlertasCtrl
 * Controller of the appApp AlertasCtrl
 */
angular.module('appApp')
  .controller('editarContactoCtrl', function($scope, $q, $filter, $http, TareasResourse, $timeout, $routeParams, $cookieStore,$location,$route) {
    /*********************************************************************
     * Contacto
     *
     ******************************************************************* */
    var usuario = $cookieStore.get('user');
    var idusuario = usuario.idusuario;
    var idContacto = $routeParams.idContacto;


    var conn = $q.defer();
    conn.promise.then(response);

    function response(resultSet) {
      console.log('Result:' + JSON.stringify(resultSet));
      $scope.contacto = resultSet;
    }
    $scope.getContacto = function() {
      var resultSet = TareasResourse.ClientegetOne.getOne({
          idcliente: idContacto,
          idusuario: idusuario
        })
        .$promise.then(function(resultSet) {
          conn.resolve(resultSet);
        });
    }
  $scope.getContacto();
  
  
  
  /*** Editar Contacto***/
    var conn2 = $q.defer();

    conn2.promise.then(actContacto);


  
  
  
  function actContacto(usr){
      if(usr.affectedRows==1){
        console.log('Cliente Actualizado: ' ) 
        console.log('Result:'+ JSON.stringify(usr) ); 
         $scope.getContacto();
        //angular.element('#modal').modal('hide');
         $('#myModal').modal('hide');
      }else{
        if(usr===undefined){
          console.log('Result:'+ JSON.stringify(usr) );
          alert("Error de Conexion");
        }else{
          console.log('Result:'+ JSON.stringify(usr) );
          alert("Error");
        }
      }
    }
  $scope.actualizarContacto = function(){
      var usr =   TareasResourse.clienteEditar.Editar({
        nombre:$scope.contacto.nombre,
        identificacion:$scope.contacto.identificacion,
        telefono:$scope.contacto.telefono,
        email:$scope.contacto.email,
        direccion:$scope.contacto.direccion,
        idusuario: idusuario,
        idcliente: idContacto
      })
        .$promise.then(function(usr){
          conn2.resolve(usr);
        });
    }
  
  
   $scope.go = function(contacto) {
      var idContacto = contacto.idcliente; 
      $location.path('/factura/'+ idContacto);
    };


  }); /****Fin Controller ***/