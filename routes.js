'use strict'
const Joi  = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
module.exports = [
  {
    method: 'GET',
    path: '/',
    // El metodo enfrenta un cambio con el req y h
    handler: site.home
  },
 // ## Ruta para registro
  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  // ## Ruta para crear un Usuario
  {
    method: 'POST',
    options:{
      validate: {
        payload: {
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        }
      }
    },
    path: '/create-user',
    handler: user.createUser
  },

  {
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
  }
]