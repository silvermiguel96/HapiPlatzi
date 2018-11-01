'use strict'

function home (req, h) {
    // permite especificar el codio
   // return h.response('Hola mundo ...').code(200)
      return h.view('index', {
        title: 'home'
      })
}
function register (req, h) {
    return h.view('register', {
      title: 'Registro'
    })
}


module.exports = {
    home: home,
    register: register

}