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
 
	 	$scope.isconected = true; 
    var usuario = $cookieStore.get('user');
    $scope.estaConectado=$cookieStore.get('estaConectado');

    if(typeof usuario === 'undefined'){
      $scope.usrConectado = {nombre:"", user:'', admin: '', cliente:'', estaConectado:false};
			
				

      //Si Se encontro algo en las cookies
    }else{
      var adm = false;
      var clt = false;

      if(usuario.idtiposusuario === 0 ){
        adm = true;
      }else{
        clt = true;
      }

      $scope.usrConectado = {
        nombre: usuario.nombre,
        user: usuario.email,
        admin: adm,
        cliente: clt,
        estaConectado:true
      };
    }

	console.log($scope.usrConectado); 
    $scope.salir = function(){
		 delete $window.sessionStorage.token;
      $scope.usrConectado = {nombre:"", user:'', admin: '', cliente:'', estaConectado:false};
      $cookieStore.remove('estaConectado');
      $cookieStore.remove('user');
      $location.path('/login');
      $route.reload();
    };
    


  
	
	/** Datos para el menu**/
	$scope.menu =  {};
	
      
	
	var proxChange = $scope.menu.Inicio; 
	
	   
	$scope.cambiarMenu = function(next){
		 $location.path(next);
	}; 
	
	$scope.$on('$routeChangeStart', function(next, current) { 
		    
		var path =    current.$$route.originalPath.split('/');
		if (path[1] === '' || path[1] === undefined )
				path[1] = 'Inicio'; 
		$scope.menu[proxChange] =  false;
		$scope.menu[path[1]] =  true;	
		proxChange = path[1]; 
 });
	
	/*Año Para el Footer*/
	var currentTime = new Date(); 
	 $scope.year = currentTime.getFullYear(); 


  });
