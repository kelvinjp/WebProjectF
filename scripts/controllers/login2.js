'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('Login2Ctrl', function ($scope, $q, TareasResourse, $log, $cookieStore,$window, $location) {
 delete $window.sessionStorage.token;
    var inicioSesion = $q.defer();
    $scope.errormsj =false;

    inicioSesion.promise.then(usrASesion);
    //le propagamos estos valores al controlador padre para poder ocultar elmentos del menu ya que el menu tiene otro controlador
    function usrASesion(usr){
      if(usr.nombre != 'wrong'){
        $scope.usrConectado.nombre = usr.nombres;
        $scope.usrConectado.user = usr.username;
      $window.sessionStorage.token = usr.token;

        var adm = false;
        var clt = false;

        if(usr.idtiposusuario == 0 ){
          adm = true;
        }else{
          clt = true;
        }
        $scope.usrConectado.admin = adm;
        $scope.usrConectado.cliente = clt;

        $scope.usrConectado.estaConectado = true;

        $log.info($scope.usrConectado);

        $cookieStore.put('estaConectado',true);

        $cookieStore.put('user',usr);
        console.log('Result:'+ JSON.stringify(usr) );
        $location.path('/contactos');
      }else{
        $scope.errormsj= true;
      }


    };

    $scope.iniciarSesion = function(){
      //Enciptamos el passowrd
      //var crypt = md5.createHash($scope.usuario.txtpass);

      var usr =   TareasResourse.iniciar.sesion({email:$scope.usuario.txtuser, password:$scope.usuario.txtpass})
        .$promise.then(function(usr){
          inicioSesion.resolve(usr);
        });

    };
  });


