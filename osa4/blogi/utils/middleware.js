const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(request.method, request.path, request.body)
    next()
}

module.exports = {
    requestLogger
}