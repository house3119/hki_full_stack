const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info(request.method, request.path, response.statusCode)
    next()
}

module.exports = {
    requestLogger
}