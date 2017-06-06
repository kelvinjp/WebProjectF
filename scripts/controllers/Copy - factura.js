'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:VehiculosCtrl
 * @description
 * # VehiculosCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('FacturaCtrl', function ($scope,$routeParams, $q, TareasResourse, $log, $cookieStore, $location, $http,$timeout,$window) {
  
  var idContacto = $routeParams.idContacto; 
   var conn3 = $q.defer();
   conn3.promise.then(resContacto);

    function resContacto(resultSet) {
      $scope.contacto = resultSet;
      $scope.selectedContacto = $scope.contacto; 
      console.log('Contacto:' + JSON.stringify($scope.contacto));
    } 
  
  var getContacto = function() {
      console.log(idContacto+ '$'+$scope.idusuario); 
      var resultSet = TareasResourse.ClientegetOne.getOne({
          idcliente: idContacto,
          idusuario: $scope.idusuario
        })
        .$promise.then(function(resultSet) {    
           conn3.resolve(resultSet);
                    
        });
    }  ; 
  
  var init = function () {
      var usuario = $cookieStore.get('user');
    //Get detalles del  cliene
    $scope.url ='http://45.55.242.157:8080/api/cliente/get/'+usuario.idusuario;
      $http.get($scope.url).success(function(usr2){
        $scope.contactos =  usr2;
        $scope.idusuario =  usuario.idusuario;
        console.log('UsuarioId:'+ $scope.idusuario );       
        getContacto();
      });
    /*
    Ge Unidades
    */
     $scope.url2 ='http://45.55.242.157:8080/api/unidad/get' ;
      $http.get($scope.url2).success(function(usr2){
        $scope.unidades =  usr2;
       // console.log('Unidades:'+ JSON.stringify( $scope.unidades) );  
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
              //  console.log('UsuarioId:'+ $scope.idusuario );
              });  
        }
      });
    };
  init();
  // and fire it after definition
   
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
  
  
  /**
  *
  *Obtenemos la info del contacto
  *
  **/

  

/*Retorna la descripcion de una medida*/
  $scope.getMedida = function(idmedida){    
    var unidad = ''; 
    
    if ($scope.unidades !== undefined){
      for (var i = 0, len = $scope.unidades.length; i < len; i++) {
        if ($scope.unidades[i].idunidad=== idmedida)
         return  ($scope.unidades[i].unidad); 
      }  
    }
    
  }




////////////////////////////////////////////////////////////
 
  $scope.isUnidadEmpy = function(){
    console.log('MODEL: '+$scope.selectedUnidad)
    if($scope.selectedUnidad === '' ) $scope.noResults = false;     
  }
  
   
  //idcliente
   //idusuario
    var cliente = {
         idusuario: $scope.idusuario, 
          nombre: "Kelvin",id: 
          "13600184371",direccion: 
          "Santo Domingo",
          telefono: "8098411883",
          idcliente: idContacto
    } ;
  
$scope.detalles = []; 
  //         $scope.detalles = [{"id_producto":30,"nombre":"Marmol X2","costo":500,"precio":1000,"id_tipo_medida":2,"idusuario":45,"cantidad":5,detalle:'Comentario'},
//                           {"id_producto":40,"nombre":"Marmol Crema Marfil","costo":50,"precio":100,"id_tipo_medida":4,"idusuario":45,"cantidad":10} ]; 
//    
  var encabezado= {tipo:"factura",idusuario:45, fecha: "2015-08-10",nota: "13600184371",asunto: "Santo Domingo",estado: 1,moneda: 1, vence:"2015-08-10"};

     $scope.addRow = function (){
       var count = 0; 
       var dt ; 
       if($scope.detalles !== undefined &&  $scope.detalles.length >0){
            count = $scope.detalles.length; 
          dt = $scope.detalles[count -1]; 
          console.log(dt.nombre); 
       }
    
     
     
      $scope.detalles.push({"id_producto":null,"nombre":"","costo":null,"precio":null,"id_tipo_medida":null,"idusuario":null,"Cantidad":null})
    }
    
    /***************************************************************
    *
    *
    * Totales
    *
    ****************************************************************************/
    $scope.SubTotal = function(){
       var total = 0; 
       if ($scope.detalles !== undefined){
      for (var i = 0, len = $scope.detalles.length; i < len; i++) {       
        if($scope.detalles[i].cantidad !== undefined &&  $scope.detalles[i].precio !== undefined)
          total = total + $scope.detalles[i].cantidad * $scope.detalles[i].precio;          
      }  
    }
     return total;  
    }
    
  $scope.tax = 18; 
  // Calculates the tax of the invoice
  $scope.Impuestos = function() {
      console.log("SubTotal:" +$scope.SubTotal())
      console.log("Tax:" +$scope.tax)
  
    return (($scope.tax * $scope.SubTotal())/100);
  };
  //Total General
     $scope.GrandTotal = function() {
   
    return $scope.Impuestos() + $scope.SubTotal();
  };
    
  
  
    
  
   $scope.FacturaAgregar = function(){
      var usr =   TareasResourse.FacturaAgregar.AgregarFactura({
        cliente: cliente,
        encabezado: encabezado,
        detalle: $scope.detalles
      })
        .$promise.then(function(usr){
          console.log('Factura result :'+ JSON.stringify(usr) );          
          Result(usr);
        });
    }
   
   
    $scope.open = function (unidad) {
      $scope.idunidad = unidad.idunidad;
      $scope.UnidadNombre = unidad.unidad;
     
   $('#ModalEditar').modal('show');  

};
  
  
       // Remotes an item from the invoice
  $scope.EliminarLinea = function(index) {
   console.log("Eliminar:"+ $scope.detalles.indexOf(index))
   $scope.detalles.splice(index, 1);
  };
  
  
  /**
  Fecha Factura
  **/
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];  
  var fecha = new Date(); 
  $scope.stringDate;
  var formattData = function(){
      var day = fecha.getDate();
      var monthIndex = fecha.getMonth();
      var year = fecha.getFullYear();
      console.log(day + ' ' + monthNames[monthIndex] + ' ' + year);
      return day + ' ' + monthNames[monthIndex] + ' ' + year; 
  } 
  $scope.stringDate =  formattData(); 
  
  $scope.notas = true;
   $("#datepicker").hide();
  

var changeDate = function (value,date){   
  // Hide the datepicker div when something is selected
  $("#datepicker").hide();  
  fecha.setDate ( date.selectedDay); 
  fecha.setFullYear (date.selectedYear); 
  fecha.setMonth (date.selectedMonth);
  $scope.stringDate =  formattData();
  $scope.notas = true;
  $scope.$apply(); 
}
  

$("#datepicker").datepicker({ 
      onSelect: function(value, date) {
        changeDate(value,date);       
      } 
});
  
  
  
  $scope.DatePick = function (){
    $scope.notas = false;
    $("#datepicker").toggle();
  }
  
   $scope.myDate = new Date();    
   });
