function errorHandler(error, message) {
    console.error(message + ' - ' + error)
    throw new Error(error.toString()) 
}

module.exports = errorHandler