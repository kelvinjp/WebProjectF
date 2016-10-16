'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VehiculosCtrl
 * @description
 * # VehiculosCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('UnidadesCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, $http,$timeout) {

    var init = function () {
      /**
      Get Unidades de medida
      */
      $scope.url2 ='http://45.55.242.157:8080/api/unidad/get' ;
      $http.get($scope.url2).success(function(usr2){      
        console.log('Unidades:'+ JSON.stringify( $scope.unidades) );  
        if(usr2 != 'undefined'){          
             $scope.unidades =  usr2;
          console.log('Unidades:'+ JSON.stringify( $scope.unidades) ); 
        }
      });
        
    };
  // and fire it after definition
  init();

  var conn = $q.defer();  
 
    var conn2 = $q.defer();


    function Result(usr){
      if(usr.affectedRows==1){       
         init();       
      }else if(usr===undefined){
          console.log('Result:'+ JSON.stringify(usr) );
        //  alert("Error de Conexion");
        }else if (usr.message != 'undefined'){
          alert(usr.message);
        //  alert("Error");
        }else {
          alert(usr); 
        }
      
    }



    $scope.EliminarUnidad = function(unidad){
      var usr =   TareasResourse.UnidadEliminar.EliminarUnidad({
        idunidad: unidad.idunidad
      })
        .$promise.then(function(usr){
          console.log('Result1 :'+ JSON.stringify(usr) );          
          Result(usr);
        });
    }


//Editar esta funcion
    $scope.go = function(contacto) {
      var idContacto = contacto.idcliente; 
      $location.path('/contacto/'+ idContacto);
    };
  
////////////////////////////////////////////////////////////
 
  $scope.isUnidadEmpy = function(){
    console.log('MODEL: '+$scope.selectedUnidad)
    if($scope.selectedUnidad === '' ) $scope.noResults = false;     
  }
  
  
  
  ////////////////UNIDADES
   $scope.AgregarUnidad = function(){
      var usr =   TareasResourse.UnidadAgregar.AgregarUnidad({
        unidad: $scope.UnidadNombre
      })
        .$promise.then(function(usr){          
          Result(usr);         
        });
    }
   
  
   $scope.EditarUnidad = function(){
      var usr =   TareasResourse.UnidadEditar.EditarUnidad({
        idunidad: $scope.idunidad,
        unidad: $scope.UnidadNombre
      })
        .$promise.then(function(usr){
          console.log('Result1 :'+ JSON.stringify(usr) );          
          Result(usr);
        });
    }
   
   
    $scope.open = function (unidad) {
      $scope.idunidad = unidad.idunidad;
      $scope.UnidadNombre = unidad.unidad;
     
   $('#ModalEditar').modal('show');    
};
  
  
  
  
   });
