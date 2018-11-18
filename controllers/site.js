'use strict'

function home (req, h) {
    // permite especificar el codio
   // return h.response('Hola mundo ...').code(200)
      return h.view('index', {
        title: 'home',
        user: req.state.user
      })
}
function register (req, h) {
    return h.view('register', {
      title: 'Registro',
      user: req.state.user // Manda la informacion del usuario
    })
}

function login (req, h) {
    return h.view('login', {
     title: 'Ingrese',
     user: req.state.user
    })   
}

module.exports = {
    home: home,
    register: register,
    login: login

}