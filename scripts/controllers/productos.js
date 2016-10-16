'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VehiculosCtrl
 * @description
 * # VehiculosCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('ProductosCtrl', function ($scope, $q, TareasResourse, $log, $cookieStore, $location, $http,$timeout) {

    var init = function () {
      /**
      Get Unidades de medida
      */
      $scope.url2 ='http://45.55.242.157:8080/api/unidad/get' ;
      $http.get($scope.url2).success(function(usr2){
        $scope.unidades =  usr2;
        console.log('Unidades:'+ JSON.stringify( $scope.unidades) );  
        if(usr2 != 'undefined'){
              var usuario = $cookieStore.get('user');
          /*
          Get Productos
          */
              $scope.url ='http://45.55.242.157:8080/api/producto/get/'+usuario.idusuario;

              $http.get($scope.url).success(function(usr2){
                $scope.productos =  usr2;
                console.log('Productos:'+ JSON.stringify( $scope.productos) );
                $scope.idusuario =  usuario.idusuario;
                console.log('UsuarioId:'+ $scope.idusuario );
              });  
        }
      });
        
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

    function usrASesion2(usr){
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

  /**
  Dado un id retorna el literal de la unidad. 
  */
  $scope.getMedida = function(idmedida){    
    var unidad = ''; 
    for (var i = 0, len = $scope.unidades.length; i < len; i++) {
      if ($scope.unidades[i].idunidad=== idmedida)
        return  ($scope.unidades[i].unidad); 
    }
  }
    $scope.productoNombre = 'Marmol X';
    $scope.productoPrecio = '100';
    $scope.productoCosto = '50';
    $scope.productoIdMedida = 2;
  
  
  var _selected ; 
  
 $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };
  
  
  
  
  
    $scope.AgregarProducto = function(){
      
      console.log(JSON.parse(JSON.stringify('selected: '+$scope.selectedUnidad)))   ; 
      //Se busca la unidad por nombre para conseguir el id
      for (var i = 0; i < $scope.unidades.length; i++) {
              if ($scope.unidades[i].unidad === $scope.selectedUnidad ) {
                console.log('bingo')
                 $scope.selectedUnidad = $scope.unidades[i];
                console.log('selected: '+JSON.parse(JSON.stringify($scope.selectedUnidad)))
                break; 
              }                              // tempVar = one,two,
          }      
      $scope.productoIdMedida = $scope.selectedUnidad.idunidad; 
      console.log('id: '+$scope.productoIdMedida)
      console.log('seleted: '+$scope.selectedUnidad); 
      var usr =   TareasResourse.productoAgregar.agregarProducto({
        nombre: $scope.productoNombre,
        costo: $scope.productoCosto,
        idmedida: $scope.productoIdMedida,
        precio: $scope.productoPrecio,
        idusuario: $scope.idusuario
      })
        .$promise.then(function(usr){
          
           if(usr.affectedRows==1){         
          console.log('Contacto Agregado');
            var producto = {              
              "id_producto":usr.insertId,
              "nombre":$scope.productoNombre,
              "costo":$scope.productoCosto,
              "precio":$scope.productoPrecio,
              "id_tipo_medida":$scope.productoIdMedida,
              "idusuario":$scope.idusuario
            };
            $scope.productos.push(producto); 
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

    $scope.EliminarProducto = function(producto,index){
      var usr =   TareasResourse.productoEliminar.EliminarProducto({
        idusuario: $scope.idusuario,
        id_producto: producto.id_producto

      })
        .$promise.then(function(usr){
          console.log('Result1 :'+ JSON.stringify(usr) );
          if(usr.affectedRows==1){          
            console.log('Result:'+ JSON.stringify(usr) );
            $scope.productos.splice(index, 1);  //Sacamos de la tabla. 
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
////////////////////////////////////////////////////////////
 
  $scope.isUnidadEmpy = function(){
    console.log('MODEL: '+$scope.selectedUnidad)
    if($scope.selectedUnidad === '' ) $scope.noResults = false;     
  }  
  ////////////////UNIDADES
   $scope.AgregarUnidad = function(){
     $scope.unidadadd =$scope.selectedUnidad
      var usr =   TareasResourse.UnidadAgregar.AgregarUnidad({
        unidad: $scope.unidadadd
      })
        .$promise.then(function(usr){
           if(usr.affectedRows==1){
             
              var unidad = {              
              "idunidad":usr.insertId,
              "unidad":$scope.unidadadd
            };
            $scope.unidades.push(unidad); 
             for (var i = 0; i < $scope.unidades.length; i++) {
                                          if ($scope.unidades[i].unidad === $scope.unidadadd ) {
                                            console.log('bingo')
                                             $scope.selectedUnidad = $scope.unidades[i];
                                            console.log(JSON.parse(JSON.stringify(i)))
                                            console.log(JSON.parse(JSON.stringify($scope.selectedUnidad)))
                                            $scope.noResults = false; 
                                            break; 
                                          }                              // tempVar = one,two,
                                      }
           
                
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
    $scope.open = function (producto) {
    $scope.productoNombre = producto.nombre;
    $scope.productoPrecio = producto.precio;
    $scope.productoCosto = producto.costo;
    $scope.id_producto = producto.id_producto;
    
     for (var i = 0; i < $scope.unidades.length; i++) {
            if ($scope.unidades[i].idunidad === producto.id_tipo_medida ) {
              console.log('bingo')
               $scope.selectedUnidad = $scope.unidades[i];
              console.log(JSON.parse(JSON.stringify($scope.selectedUnidad)))
              $scope.noResults = false; 
              break; 
            }                              
        }    
   $('#ModalEditar').modal('show');    
};
  
  
  $scope.EditarProducto = function(){      
      for (var i = 0; i < $scope.unidades.length; i++) {
              if ($scope.unidades[i].unidad === $scope.selectedUnidad ) {
                 $scope.selectedUnidad = $scope.unidades[i];
                break; 
              }                              // tempVar = one,two,
          }      
      $scope.productoIdMedida = $scope.selectedUnidad.idunidad; 
      var usr =   TareasResourse.productoEditar.EditarProducto({
        nombre: $scope.productoNombre,
        costo: $scope.productoCosto,
        idmedida: $scope.productoIdMedida,
        precio: $scope.productoPrecio,
        idusuario: $scope.idusuario,
        id_producto: $scope.id_producto
      })
        .$promise.then(function(usr){
          init();
          usrASesion2(usr);
          conn.resolve(usr);
        });
    }

  
   });
