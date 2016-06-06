'use strict';

/**
 * @ngdoc service
 * @name appApp.crud
 * @description
 * # crud
 * Service in the appApp.
 */
angular.module('appApp')
  .factory('TareasResourse', function ($resource) {
    var host ='http://45.55.242.157:8080/';
  var factory = {

    iniciar: $resource(host+'login',{},{
      sesion: {method: 'POST', params:{
        username:'@email',
        password:'@password'}
      }
    }),

    clienteAgregar: $resource(host+'api/cliente/agregar',{},{
      agregar: {method: 'POST', params:{
        nombre:'@nombre',
        identificacion:'@password',
        telefono:'@cedula',
        email:'@email',
        direccion:'@direccion',
        idusuario:'@idusuario'}
      }
    }),
    clienteEliminar: $resource(host+'api/cliente/eliminar',{},{
      eliminar: {method: 'POST', params:{
        idusuario:'@idusuario',
        idcliente:'@idcliente'
      }
      }
    }),
    getPendientes: $resource(host+'api/getPendientes',{},{
      all: {method: 'GET',isArray:true}
    }),
    getDeclinados: $resource(host+'api/getDeclinados',{},{
      all: {method: 'GET',isArray:true}
    }),
    getRegistrados: $resource(host+'api/getRegistrados',{},{
      all: {method: 'GET',isArray:true}
    }),
    getTipos: $resource(host+'api/getTiposAlert',{},{
      all: {method: 'GET',isArray:true}
    }),

    membresia: $resource(host+'api/membresia',{},{
      add: {method: 'POST', params:{
        username:'@username',
        tiempo:'@tiempo',
        vence:'@vence'}
      }
    }),
    getEstados: $resource(host+'api/getEstados',{},{
      all: {method: 'GET',isArray:true}
    }),
    Estado: $resource(host+'api/editEstado',{},{
      editar: {method: 'POST', params:{
        idestado:'@idestado',
        nombre:'@nombre',
        Descripcion:'@Descripcion'}
      }
    }),
    addEstado: $resource(host+'api/addEstado',{},{
      new: {method: 'POST', params:{
        nombre:'@nombre',
        Descripcion:'@Descripcion'}
      }
    }),
    deleteEstado: $resource(host+'api/deleteEstado',{},{
      dl: {method: 'POST', params:{
        idestado:'@idestado'}
      }
    }),
    getMembresias: $resource(host+'api/getMembresia',{},{
      all: {method: 'GET',isArray:true}
    }),
    editMembresia: $resource(host+'api/editMembresia',{},{
      editar: {method: 'POST', params:{
        idmebresia:'@idmebresia',
        nombre:'@nombre',
        dias:'@dias'}
      }
    }),
    addMembresia: $resource(host+'api/addMembresia',{},{
      new: {method: 'POST', params:{
        nombre:'@nombre',
        dias:'@dias'}
      }
    }),
    deleteMembresia: $resource(host+'api/deleteMembresia',{},{
      dl: {method: 'POST', params:{
        idmebresia:'@idmebresia'}
      }
    }),
    declinar: $resource(host+'api/declinarUsuario',{},{
      usuario: {method: 'POST', params:{
        username:'@username'
      }
      }
    })
      ,
    eliminarVehiculo: $resource(host+'api/eliminarVehiculo',{},{
      eliminar: {method: 'POST', params:{idvehiculo:'@idvehiculo'}
      }
    }),

    factura: $resource(host+'api/factura/agregar',{},{
      agregar: {method: 'POST', params:{
        cliente: '@cliente',
        encabezado: '@encabezado',
        detalle: '@detalle'
      }
      }
    }),


    editar: $resource(host+'api/editUser',{},{
      cliente: {method: 'POST', params:{
        nombres:'@nombres',
        apellidos:'@apellidos',
        username:'@username',
        password:'@password',
        telefono:'@telefono',
        direccion:'@direccion',
        cedula:'@cedula',
        idtipouser:'@idtipouser',
        email:'@email'
      }
      }
    }),
     e: $resource(host+'api/editAlert',{},{
      a: {method: 'POST', params:{
        idalerta:'@idalerta',
        estado:'@estado',
        comentario:'@comentario'
      }
      }
    }),
     vehiculo: $resource(host+'api/newVehiculo',{},{
      add: {method: 'POST', params:{
        color: '@color',
        placa: '@placa',
        chasis: '@chasis',
        idusuario: '@idusuario',
        marca: '@marca',
        modelo: '@modelo',
        fecha: '@fecha'
      }
      }
    })

  };
  return factory;

});
