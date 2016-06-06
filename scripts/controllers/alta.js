'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AltaCtrl
 * @description
 * # AltaCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('AltaCtrl', function ($scope,$q,  $filter, $http, $cookieStore, $location, TareasResourse) {
    $scope.clientePassoword = '';
    $scope.clientePassoword2 = '';
    $scope.clienteNombre = '';
    $scope.clienteEmail = '';
    $scope.clienteCedula ='';
    $scope.pbar = false;
    $scope.required = false;
    $scope.passInvalido= false;



    $scope.emailExiste = false;
    $scope.usuarioExiste = false;

    var conn = $q.defer();

    conn.promise.then(usrASesion);

    function usrASesion(usr){
      console.log(usr);
     // $scope.pbar = false;
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


    $scope.validatePass = function(){
      if ($scope.clientePassoword != $scope.clientePassoword2 && $scope.clientePassoword2 != ''){
        $scope.passInvalido= true;
        return true;
      }else {
        $scope.passInvalido= false;
        return false;
      }
    }


    $scope.altaClietne = function(){

      console.log(
        'password: '+ $scope.clientePassoword,
        'Email: '+$scope.clienteEmail
        ,'Nombre: '+$scope.clienteNombre
      )

      $scope.pbar = true;

      var usr =   TareasResourse.addCliente.nuevoCliente({
        nombre: $scope.clienteNombre,
        password: $scope.clientePassoword,
        email: $scope.clienteEmail
       // idtipouser: 1
      });
        usr.$promise.then(function(result){
          $scope.pbar = false;
          console.log('Result:'+ JSON.stringify(result) );

          if(result.affectedRows == 1){
            console.log("Usuario Agregado Correctamente!");

            $location.path('/login');
          }else{
              if(result.email == true){
                $scope.emailExiste = true;
            }
          }




        });
    }

  });
