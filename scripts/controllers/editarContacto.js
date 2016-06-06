'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AlertasCtrl
 * @description
 * # AlertasCtrl
 * Controller of the appApp AlertasCtrl
 */
angular.module('appApp')
  .controller('editarContactoCtrl', function ($scope, $q, $filter, $http, TareasResourse, $timeout ) {
    $scope.tipos;
    $scope.estados;
    $scope.alertaComentario ;
    $scope.alertaEstado ;
    $scope.alertaId ;
    $scope.alt;
    $scope.guardado = false;

    $scope.currentPage = 1;
    $scope.pageSize = 5;

    $scope.pageChangeHandler = function(num) {
      console.log('page changed to ' + num);
    };


    /*********************************************************************
     * AQUI OBTENEMOS LOS TIPOS DE ALERTAS
     *
     ******************************************************************* */
    var connAlts = $q.defer();

    connAlts.promise.then(result);
    function result(rs){
      if(rs.nombre != 'wrong'){
        $scope.tipos = rs;
      }else{
        $scope.errormsj= true;
      }
    };

    $scope.iniciarSesion = function(){
      var usr =   TareasResourse.getTipos.all()
        .$promise.then(function(usr){
          connAlts.resolve(usr);
        });

    };
    $scope.iniciarSesion();

    $scope.showTipos = function(alerta) {
      var selected = [];
      if(alerta!='undefine') {
        selected = $filter('filter')($scope.tipos, {idtiposalerta: alerta.idtiposalerta});
      }
      return selected.length ? selected[0].nombre : alerta.idtiposalerta;
    };


    /***************************************************************
     * AQUI OBTENEMOS ESTADOS POSIBLES DE LAS ALERTAS
     * ************************************************************/
    var inicioEstados = $q.defer();

    inicioEstados.promise.then(usrEstado);
    //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
    function usrEstado(usr){
      if(usr.nombre != 'wrong'){
        $scope.estados = usr;
      }else{
        $scope.errormsj= true;
      }
    };

    $scope.iniciarEstado = function(){
      //Enciptamos el passowrd
      //var crypt = md5.createHash($scope.usuario.txtpass);
      var usr =   TareasResourse.getEstados.all()
        .$promise.then(function(usr){
          inicioEstados.resolve(usr);
        });

    };
    $scope.iniciarEstado();



    $scope.showEstado = function(alerta) {
      var selected = [];
      if(alerta!='undefine') {
        selected = $filter('filter')($scope.estados, {idestado: alerta.estado});
      }
      return selected.length ? selected[0].nombre : alerta.idtiposalerta;
    };


/*************************************************************************************
 *
 * Editar Alerta
 *
 * ***********************************************************************************/

    $scope.editarAlerta = function(alerta) {
     var seleccion= [];
     seleccion = $filter('filter')($scope.estados, {idestado: alerta.estado});
      $scope.selectedEstado = seleccion[0];

      $scope.guardado = false;

      $scope.alt = alerta;
      console.log( $scope.alt);
      $scope.alertaComentario = alerta.comentario;
      $scope.alertaEstado = alerta.tipos;
      $scope.alertaIdUsuario = alerta.idalerta;
    };

     var editA = $q.defer();

    editA.promise.then(edAlert);

    function edAlert(usr){
      if(usr.affectedRows==1){
        $scope.guardado = true;
         $scope.alertas = TareasResourse.getAlert.all();
      }else{
        if(usr==undefined){
          alert("Error de Conexion");
        }else{
          alert("Error");
        }
      }
    };
      $scope.guardarCambios = function() {
      var ed =   TareasResourse.e.a({
        idalerta: $scope.alt.idalerta,
        estado: $scope.selectedEstado.idestado,
        comentario: $scope.alt.comentario
      })
        .$promise.then(function(ed){
          editA.resolve(ed);
        });
    };

    $scope.alertas = TareasResourse.getAlert.all();

    $scope.showMap = false;
    $scope.map = { center: { latitude: 18, longitude: -69 }, zoom: 8 };
    $scope.marker = {
      id: 0,
      coords: {
        latitude: 45,
        longitude: -73
      }};

    $scope.actualizar = function(alerta){
      $scope.showMap = true;
      $scope.marker.coords.latitude = alerta.latitud;
      $scope.marker.coords.longitude = alerta.longitud;
      $scope.map.center.latitude  = alerta.latitud;
      $scope.map.center.longitude  = alerta.longitud;
      $scope.map.zoom = 16;
    };


    /**************************************************************************************
     * Format Data
     * ********************************************************************/
 $scope.fDate = function(date){
  var x = date.substring(0,18);

     var t = x.split(/[- 'T':]/);
     var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

      var dformat = [
        d.getDate(),
        d.getMonth()+1,
        d.getFullYear()].join('/')+' '+
              [d.getHours(),
               d.getMinutes()].join(':');
               return dformat;
    };

    /**************************************************************************************
     * Format Data
     * ********************************************************************/


  })


;
