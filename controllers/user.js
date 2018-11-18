'use strict'

const users = require('../model/index').users

async function createUser (req, h) {
    let result
    try {
        result = await users.create(req.payload)
    } catch (error) {
        console.error(error)
        return h.response('Problemas creando el usuario').code(500)
        //error del servidor
    }

    return h.response(`Usuario creado ID: ${result}`)
  }

async function validateUser (req, h){
    let result
    try{
        result = await users.validateUser(req.payload)
     if(!result) {
         return h.response('Email y/o Contraseña incorrecta').code(401)
     }
    }catch (error){
        console.error(error)
        return h.response('Problemas validando el usuario').code(500)
    }
    // Almacena el estado
    return  h.redirect('/').state('user', {
        name : result.name,
        email: result.email
    })
}

function logout(req, h){
    // Responder con un redirect 
    return h.redirect('login').unstate('user')
    
}

module.exports = {
    createUser: createUser,
    validateUser: validateUser,
    logout: logout
}