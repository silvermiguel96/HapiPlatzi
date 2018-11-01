'use strict'

const Hapi = require('hapi')

const server = Hapi.server({
    // proccess es una parametro que podemos mandar por defecto 
    port : process.env.PORT || 3000,

    host : 'localhost'
})

async function init  () {
    server.route({
        method: 'GET',
        path: '/',
        // El metodo enfrenta un cambio con el req y h
        handler: (req, h) => {
            return 'Hola Mundo Nuevo !'
        }
    })

    try{
        await server.start()
    }catch (error){
        console.error(error)
        console.exit(1)
    }
 console.log( `El Servidor corriendo en  : ${server.info.uri}`)
}

init()