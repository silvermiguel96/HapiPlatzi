'use strict'

const questions = require('../model/index').questions
const { writeFile } = require('fs')
const { promisify } = require('util')
const { join } = require('path')

const uuid = require('uuid/v1')
// Prosimificar el file .. Realizar un raper de la funciones write con una promesa
const write = promisify(writeFile)
async function createQuestion (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }
  let result, filename

  try {
    if (Buffer.isBuffer(req.payload.image)) {
      filename = `${uuid()}.png`
      await write(join(__dirname, '..', 'public', 'uploads', filename), req.payload.image)
    }

    result = await questions.create(req.payload, req.state.user, filename)
    req.log('info', `Pregunta creada con el ID: ${result})
    console.log(`)
  } catch (error) {
    req.log('error', `Ocurrio un error : ${error}`)

    return h.view('ask', {
      title: 'Crear Pregunta',
      error: 'Problema creando la pregunta'
    }).code(500).takeover()
  }

  return h.redirect(`/question/${result}`)
}

async function answerQuestion (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }
  let result
  try {
    result = await questions.answer(req.payload, req.state.user)
    console.log(`Respuesta creada ${result}`)
  } catch (error) {
    console.error(error)
  }

  return h.redirect(`/question/${req.payload.id}`)
}

async function setAnswerRight (req, h) {
  if (!req.state.user) {
    return h.redirect('/login')
  }
  let result
  try {
    // Ejecutar el metodo como tal
    result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
  return h.redirect(`/question/${req.params.questionId}`)
}
module.exports = {
  createQuestion: createQuestion,
  answerQuestion: answerQuestion,
  setAnswerRight: setAnswerRight
}
