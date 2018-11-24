'use strict'

const Hapi = require('hapi')
const handlerbars = require('./lib/helpers')
const inert = require('inert')
const path = require('path')
const routes = require('./routes')
const site = require('./controllers/site')
const vision = require('vision')

const server = Hapi.server({
  // proccess es una parametro que podemos mandar por defecto
  port: process.env.PORT || 3000,
  host: 'localhost',
  // definir el objeto de las rutas
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {
  try {
    // funciónn de abuelo para el register
    await server.register(inert)
    await server.register(vision)

    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7,
      isSecure: process.env.NODE_ENV === 'prod', // Nos informa si la ruta es segura
      encoding: 'base64json'
    })

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

    // Antes de registar las rutas , debemos registar la interseccion
    // Nos analizar antes de que se envien las respuestas
    server.ext('onPreResponse', site.fileNotFound)
    // Le imformamos al servidor que ruta utilizamos
    server.route(routes)

    await server.start()
  } catch (error) {
    console.error(error)
    console.exit(1)
  }
  console.log(`El Servidor corriendo en  : ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error.message, error)
})

process.on('unhandledException', error => {
  console.error('unhandledException', error.message, error)
})

init()
