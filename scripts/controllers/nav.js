'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:navegCtrl
 * @description
 * # navegCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('navegCtrl', function ($scope, $cookieStore, $location,$route,$window, $timeout, $mdSidenav, $mdUtil, $log) {

    var usuario = $cookieStore.get('user');
    $scope.estaConectado=$cookieStore.get('estaConectado');

    if(typeof usuario === 'undefined'){
      $scope.usrConectado = {nombre:"", user:'', admin: '', cliente:'', estaConectado:false};

      //Si Se encontro algo en las cookies
    }else{
      var adm = false;
      var clt = false;

      if(usuario.idtiposusuario == 0 ){
        adm = true;
      }else{
        clt = true;
      }

      $scope.usrConectado = {
        nombre: usuario.nombre,
        user: usuario.user,
        admin: adm,
        cliente: clt,
        estaConectado:true
      };
    }


    $scope.pageSetUp=   function () {
      "desktop" === thisDevice ? ($("[rel=tooltip], [data-rel=tooltip]").tooltip(), $("[rel=popover], [data-rel=popover]").popover(), $("[rel=popover-hover], [data-rel=popover-hover]").popover({
        "trigger": "hover"
      }), setup_widgets_desktop(), runAllCharts(), runAllForms()) : ($("[rel=popover], [data-rel=popover]").popover(), $("[rel=popover-hover], [data-rel=popover-hover]").popover({
        "trigger": "hover"
      }), runAllCharts(), setup_widgets_mobile(), runAllForms())
    };



    $scope.salir = function(){
		 delete $window.sessionStorage.token;
      $scope.usrConectado = {nombre:"", user:'', admin: '', cliente:'', estaConectado:false};
      $cookieStore.remove('estaConectado');
      $cookieStore.remove('user');
      $location.path('/login');
      $route.reload();
    };
    $scope.cambiarIdioma = function(idioma){
      $translate.use(idioma);
    }


    /*
    * Navegacion
    * */
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      },300);
      return debounceFn;
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };


  });
