const logFile = require('../helpers/logFile');

module.exports = async (req, res, next) => {
    logFile(`ADDRESS: ${req.socket.remoteAddress}, URL: ${req.url}, METHOD: ${req.method}, RESPONSE: ${res.statusCode}`)
    next()
};