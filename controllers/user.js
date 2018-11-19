'use strict'

// const Boom = require('boom')
const users = require('../model/index').users

async function createUser (req, h) {
  let result
  try {
    result = await users.create(req.payload)
  } catch (error) {
    console.error(error)
    return h.view('register', {
      title: 'Registro',
      error: 'Error Creando el usuario'
    })
    // error del servidor
  }

  return h.view('register', {
    title: 'Registro',
    success: 'Usuario creado exitosamente'
  })
}

async function validateUser (req, h) {
  let result
  try {
    result = await users.validateUser(req.payload)
    if (!result) {
      return h.view('login', {
        title: 'login',
        error: 'Email y/o contraseña incorrecta'
      })
    }
  } catch (error) {
    console.error(error)
    return h.view('login', {
      title: 'login',
      error: 'Problemas validando el usuario'
    })
  }
  // Almacena el estado
  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

function logout (req, h) {
  // Responder con un redirect
  return h.redirect('login').unstate('user')
}
// requeset , objeto h , error
function failValidation (req, h, err) {
  const templates = {
    '/create-user': 'register',
    '/validate-user': 'login'
  }
  return h.view(templates[req.path], {
    title: 'Error de validacion',
    error: 'Por Favor complete los campos requeridos'
  }).code(400).takeover() // Finalizar el ciclo y responde con el code
}

module.exports = {
  createUser: createUser,
  validateUser: validateUser,
  logout: logout,
  failValidation: failValidation
}
