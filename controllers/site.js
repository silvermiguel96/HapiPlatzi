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
  if (req.state.user) {
    return h.redirect('/e')
  }
  return h.view('register', {
    title: 'Registro',
    user: req.state.user // Manda la informacion del usuario
  })
}

function login (req, h) {
  if (req.state.user) {
    return h.redirect('/')
  }

  return h.view('login', {
    title: 'Ingrese',
    user: req.state.user
  })
}

function notFound (req, h) {
// Pasar un objeto vacio , y paso otro objeto que permite agregadar propiedades al vision
  return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

function fileNotFound (req, h) {
  const response = req.response
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404)
  }
  return h.continue
}

module.exports = {
  home: home,
  notFound: notFound,
  fileNotFound: fileNotFound,
  register: register,
  login: login
}
