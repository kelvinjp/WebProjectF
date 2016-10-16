'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VehiculosCtrl
 * @description
 * # VehiculosCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('ContactosCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, $http,$route) {

    var init = function () {
      var d = new Date();
      console.log('ini h: '+d.getMilliseconds()); 
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
        console.log('Result:'+ JSON.stringify(usr) );
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



    var conn2 = $q.defer();

    conn2.promise.then(usrASesion);

    function addContacto(usr){
      if(usr.affectedRows==1){         
          console.log('Contacto Agregado');
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


    $scope.clienteNombre = 'Banreservas SRL';
    $scope.clienteRNC = 131104827;
    $scope.clienteTelefono = 8098411883;
    $scope.clienteDireccion = 'Distrito Nacional';
    $scope.clienteEmail = 'kpimentel@banreservas.com';


    $scope.AgregarContacto = function(){
      var usr =   TareasResourse.clienteAgregar.agregar({
        nombre:$scope.clienteNombre,
        identificacion:$scope.clienteRNC,
        telefono:$scope.clienteRNC,
        email:$scope.clienteEmail,
        direccion:$scope.clienteDireccion,
        idusuario: $scope.idusuario
      })
        .$promise.then(function(usr){     
          
          if(usr.affectedRows==1){         
          console.log('Contacto Agregado');
            var contacto = {
              "idcliente":usr.insertId,
              "nombre":$scope.clienteNombre,
              "identificacion":$scope.clienteRNC,
              "telefono":$scope.clienteRNC,
              "email":$scope.clienteEmail,
              "direccion":$scope.clienteDireccion,
              "idusuario":$scope.idusuario,
              "estado":"A"
            }; 
            $scope.contactos.push(contacto); 
          }else{//Ocurrio un error. 
                  if(usr===undefined){
                    console.log('Result:'+ JSON.stringify(usr) );
                    alert("Error de Conexion");
                }else{
                    console.log('Result:'+ JSON.stringify(usr) );
                    alert("Error");
                  }
                }
        });
    }



    $scope.EliminarContacto = function(contacto,index){
      console.log('Se eliminara el cliente: '+contacto.idcliente+ ' del usuario: '+$scope.idusuario); 
      var usr =   TareasResourse.clienteEliminar.eliminar({
        idusuario: $scope.idusuario,
        idcliente: contacto.idcliente
      })
        .$promise.then(function(usr){
          console.log('Result1 :'+ JSON.stringify(usr) );
          if(usr.affectedRows==1){          
            console.log('Result:'+ JSON.stringify(usr) );
            $scope.contactos.splice(index, 1); 
          }else{
            if(usr===undefined){
              console.log('Result:'+ JSON.stringify(usr) );
              alert("Error de Conexion");
            }else{
              console.log('Result:'+ JSON.stringify(usr) );
              alert("Error");
            }
          }
        });
    }
    
     




    $scope.go = function(contacto) {
      var idContacto = contacto.idcliente; 
      $location.path('/contacto/'+ idContacto);
    };

  });
