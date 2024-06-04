const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info(request.method, request.path)
    next()
}


const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid or missing token' })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({ error: 'token expired' })
    }
    next(error)
}


const tokenExtractor = async (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    }
    next()
  } catch (error) {
    next(error)
  }
}


const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = {
    requestLogger,
    errorHandler,
    tokenExtractor,
    userExtractor
}