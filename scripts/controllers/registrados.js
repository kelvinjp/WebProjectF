'use strict';

/**
 * @ngdoc function
 *
 */
angular.module('appApp')
  .controller('registradosCtrl', function ($scope, $q, $filter, $http, TareasResourse, $timeout ) {
    $scope.tipos;
    $scope.estados = [{id:1, nombre:'1 Año'}, {id:2, nombre:'2 Año'}];
    $scope.alertaComentario ;
    $scope.alertaEstado ;
    $scope.alertaId ;
    $scope.alt;
    $scope.guardado = false;


  $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.meals = [];


    $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
    };


/*************************************************************************************
 *
 * Editar Alerta
 *
 * ***********************************************************************************/

$scope.aceptarUsuario = function(alerta) {
  $scope.estados = TareasResourse.getMembresias.all();;
  $scope.selectedEstado = $scope.estados[0];

  $scope.guardado = false;

  $scope.alt = alerta;
  console.log( $scope.alt);
  $scope.alertaComentario = alerta.comentario;
  $scope.alertaEstado = alerta.tipos;
  $scope.alertaIdUsuario = alerta.idalerta;
};

    /**
     * ADD MEMBRESIA
     */

     var editA = $q.defer();

    editA.promise.then(conn);

    function conn(result){
      if(result.affectedRows==1){
        $scope.guardado = true;
          $scope.usuarios = TareasResourse.getRegistrados.all();
      }else{
        if(result==undefined){
          alert("Error de Conexion");
        }else{
          alert("Error");
        }
      }
    };
    $scope.guardarCambios = function() {

      console.log( $scope.alt.idalerta);
      console.log( $scope.alt.comentario);
      console.log( $scope.selectedEstado.idestado);

      var ed =   TareasResourse.membresia.add({
        username: $scope.alt.username,
        tiempo: $scope.selectedEstado.dias,
        vence:$scope.alt.vence
      })
        .$promise.then(function(ed){
          editA.resolve(ed);
        });
    };

    $scope.usuarios = TareasResourse.getRegistrados.all();

    /**
     * DECLINE USER
     */

    var declinar = $q.defer();

    declinar.promise.then(conn);

    function conn(result){
      if(result.affectedRows==1){
       alert('Usuario declinado');
        $scope.usuarios = TareasResourse.getRegistrados.all();
      }else{
        if(result==undefined){
          alert("Error de Conexion");
        }else{
          alert("Error");
        }
      }
    };
    $scope.declinarUsuario = function(usuario) {

      var ed =   TareasResourse.declinar.usuario({
        username: usuario.username
      })
        .$promise.then(function(ed){
          declinar.resolve(ed);
        });
    };

    $scope.usuarios = TareasResourse.getRegistrados.all();

  })


;
