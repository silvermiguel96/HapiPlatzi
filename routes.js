'use strict'
const Joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')
module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      cache: {
        expiresIn: 1000 * 30,
        privacy: 'private'
      }
    },
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
    path: '/create-user',
    method: 'POST',
    options: {
      // Al poseeer las validaciones procedemos a generar los errores
      validate: {
        payload: {
          name: Joi.string().required().min(3),
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        },
        failAction: user.failValidation
      }
    },
    handler: user.createUser
  },
  // Ingreso al aplicativo
  {
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  // Cierre del aplicativo
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'GET',
    path: '/question/{id}',
    handler: site.viewQuestion
  },
  // Preguntas
  {
    method: 'GET',
    path: '/ask',
    handler: site.ask

  },
  // Validar usuario
  {
    path: '/validate-user',
    method: 'POST',
    options: {
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required().min(6)
        },
        failAction: user.failValidation
      }
    },
    handler: user.validateUser
  },
  // Validador de preguntas
  {
    path: '/create-question',
    method: 'POST',
    options: {
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required()
        },
        failAction: user.failValidation
      }
    },
    handler: question.createQuestion
  },
  // Ruta para responder las preguntas
  {
    path: '/answer-question',
    method: 'POST',
    options: {
      validate: {
        payload: {
          answer: Joi.string().required(),
          id: Joi.string().required()
        },
        failAction: user.failValidation
      }
    },
    handler: question.answerQuestion
  },
  // Ruta para la respuesta correcta
  {
    method: 'GET',
    path: '/answer/{questionId}/{answerId}',
    handler: question.setAnswerRight
  },
  {
    method: 'GET',
    // Ruta comodin
    path: '/assets/{param*}',
    // El metodo enfrenta un cambio con el req y h
    handler: {
      // function
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  },
  {
    method: ['GET', 'POST'],
    path: '/{any*}',
    handler: site.notFound
  }
]
