'use strict'

const Hapi = require('hapi')
const handlerbars = require('handlebars')
const inert = require('inert')
const path = require('path')
const vision = require('vision')

const server = Hapi.server({
  // proccess es una parametro que podemos mandar por defecto
  port: process.env.PORT || 3000,
  host: 'localhost',
  // definir el objeto de las rutas
  routes: {
      files: {
          relativeTo: path.join(__dirname , 'public')
      }
  }
})

async function init () {
  
  try {
      // funcion de abuelo para el register
    await server.register(inert)
    await server.register(vision)

    server.views({
        engines: {
            // hbs es una propiedad de engines en vision 
            hbs: handlerbars
        },
        relativeTo: __dirname, // Llamar la libreria fuera de public
        path: 'views',
        layout: true, // no repetir las vistas
        layoutPath: 'views'
        
    })
    server.route({
        method: 'GET',
        path: '/',
        // El metodo enfrenta un cambio con el req y h
        handler: (req, h) => {
          // permite especificar el codio
         // return h.response('Hola mundo ...').code(200)
            return h.view('index', {
              title: 'home'
            })
        }
      })
    
      server.route({
        method: 'GET',
        // Ruta comodin 
        path: '/{param*}',
        // El metodo enfrenta un cambio con el req y h
        handler: {
              //function 
            directory: {
                path: '.',
                index: ['index.html']
            }
        }
      })
    await server.start()
  } catch (error) {
    console.error(error)
    console.exit(1)
  }
  console.log(`El Servidor corriendo en  : ${server.info.uri}`)
}

init()
