'use strict'

const questions = require('../model/index').questions
async function home (req, h) {
  // Los methodos del servidor los accedesmos desde el req
  const data = await req.server.methods.getLast(10)

  // permite especificar el codio
  // return h.response('Hola mundo ...').code(200)
  return h.view('index', {
    title: 'home',
    user: req.state.user,
    questions: data
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

async function viewQuestion (req, h) {
  let data
  try {
    data = await questions.getOne(req.params.id)
    if (!data) {
      return notFound(req, h)
    }
  } catch (error) {
    console.error(error)
  }

  return h.view('question', {
    title: 'Detalles de la pregunta',
    user: req.state.user,
    question: data,
    key: req.params.id
  })
}
function notFound (req, h) {
// Pasar un objeto vacio , y paso otro objeto que permite agregadar propiedades al vision
  return h.view('404', {}, { layout: 'error-layout' }).code(404)
}

function fileNotFound (req, h) {
  const response = req.response
  if (!req.path.startsWith('/api') && response.isBoom && response.output.statusCode === 404) {
    return h.view('404', {}, { layout: 'error-layout' }).code(404)
  }
  return h.continue
}

function ask (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }

  return h.view('ask', {
    title: 'Crear una pregunta',
    user: req.state.user
  })
}

module.exports = {
  ask: ask,
  home: home,
  notFound: notFound,
  fileNotFound: fileNotFound,
  register: register,
  login: login,
  viewQuestion: viewQuestion
}
