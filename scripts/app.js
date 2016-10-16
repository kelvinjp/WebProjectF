'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('appApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'xeditable',
    'ui.bootstrap',
    'angular-md5',
    'uiGmapgoogle-maps',
    'angularUtils.directives.dirPagination',
    'ngMaterial'
	//,		'ngMessages'
	// ,'ng-mfb'

  ])



  .run(function(editableOptions, $rootScope, $location, $cookieStore,$filter){
    editableOptions.theme = 'bs3';

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      //Si esta desconectado y intenta entrar a menu lo enviamos a login
      if($cookieStore.get('estaConectado')== false || $cookieStore.get('estaConectado') == null) {
        if( next.templateUrl == 'views/contactos.html' || next.templateUrl == 'views/pendientes.html'||next.templateUrl == 'views/registrados.html'
          ||next.templateUrl == 'views/alta2.html'||next.templateUrl == 'views/declinados.html'
          ||next.templateUrl == 'views/editarusuario.html'||next.templateUrl == 'views/main.html'
          ||next.templateUrl == 'views/vehiculos.html'){
          $location.path('/login');
        }
      }
      else{
        var usuario = $cookieStore.get('user');
        //SI esta conectado y intenta entrar al login lo enviamos a menu
        if(next.templateUrl == 'views/lg.html'){
          $location.path('/contactos');
        }
      }
    });
  })

  .config(
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/editarContacto', {
        templateUrl: 'views/editarContacto.html',
        controller: 'editarContactoCtrl'
      })
      .when('/login', {
        templateUrl: 'views/lg.html',
        controller: 'LoginCtrl'
      })
      .when('/pendientes', {
        templateUrl: 'views/pendientes.html',
        controller: 'pendientesCtrl'
      })
      .when('/registrados', {
        templateUrl: 'views/registrados.html',
        controller: 'registradosCtrl'
      })
      .when('/registrar', {
        templateUrl: 'views/alta2.html',
        controller: 'Alta2Ctrl'
      })
      .when('/alta', {
        templateUrl: 'views/alta.html',
        controller: 'AltaCtrl'
      })
      .when('/declinados', {
        templateUrl: 'views/declinados.html',
        controller: 'declinadosCtrl'
      })
      .when('/registrado', {
        templateUrl: 'views/registrado.html',
        controller: 'AltaCtrl'
      })
      .when('/Estados', {
        templateUrl: 'views/EditEstado.html',
        controller: 'EditablerowCtrl'
      })
      .when('/membresias', {
        templateUrl: 'views/membresias.html',
        controller: 'membresiasCtrl'
      })
      .when('/perfil', {
        templateUrl: 'views/editarusuario.html',
        controller: 'EditarusuarioCtrl'
      })
			.when('/contactos', {
        templateUrl: 'views/contactos.html',
        controller: 'ContactosCtrl'
      })
			.when('/contacto/:idContacto', {
        templateUrl: 'views/editarContacto.html',
        controller: 'editarContactoCtrl'
      })
			.when('/productos', {
					templateUrl: 'views/productos.html',
					controller: 'ProductosCtrl'
				})
			.when('/unidades', {
					templateUrl: 'views/unidades.html',
					controller: 'UnidadesCtrl'
				})
			.when('/facturas', {
					templateUrl: 'views/facturas.html',
					controller: 'FacturasCtrl'
				})
			.when('/factura/:idContacto', {
					templateUrl: 'views/factura.html',
					controller: 'FacturaCtrl'
				})
      .otherwise({
        redirectTo: '/'
      });
  }
)

	.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        	config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      return response || $q.when(response);
    },
    responseError: function (response) {
            if (response.status === 401) {
                //here I preserve login page 
                $rootScope.$broadcast('Login-Fail'); 
            } else {
								console.log('Request Error: '+ JSON.stringify(response));
						}			
            return $q.reject(response);
      }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
