'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:TipoalertaCtrl
 * @description
 * # TipoalertaCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('TipoalertaCtrl', function ($scope, $q, $filter, $http, TareasResourse, $timeout, $log) {
    $scope.statuses ='';

    var inicioSesion = $q.defer();

    inicioSesion.promise.then(usrASesion);
    //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
    function usrASesion(usr){
      if(usr.nombre != 'wrong'){
        $scope.statuses = usr;
      }else{
        $scope.errormsj= true;
      }
    };

    $scope.iniciarSesion = function(){
      //Enciptamos el passowrd
      //var crypt = md5.createHash($scope.usuario.txtpass);
      var usr =   TareasResourse.getTipos.all()
        .$promise.then(function(usr){
          inicioSesion.resolve(usr);
        });

    };
    $scope.iniciarSesion();

    $scope.showStatus = function(tarea) {
      var selected = [];
      if(tarea.idtiposalerta) {
        selected = $filter('filter')($scope.statuses, {value: tarea.idtiposalerta});
      }
      return selected.length ? selected[0].nombre : tarea.idtiposalerta;
    };



  });
