const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const routes = require('./src/routes');

// Importing helpers
const formatRes = require('./src/helpers/formatRes')
const logFile = require('./src/helpers/logFile')
const logConsole = require('./src/helpers/logConsole')

const app = express()

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Middleware logger
app.use((req, res, next) => {
    logFile(`ADDRESS: ${req.socket.remoteAddress}, URL: ${req.url}, METHOD: ${req.method} `)
    next()
})

// Middleware to put favicon
app.use(favicon(__dirname + '/public/favicon.ico'))

// Middleware to parse the body of the request
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// If nothing found above, return 404
app.use(({ res }) => {
    res.status(404).json(formatRes('error', null, 'Nothing found here!'))
})

// Synchronisation de la base de données et démarrage du serveur
sequelize.sync()
    .then(() => {
        logConsole('Database & tables created!');
        app.listen(process.env.BACK_API_PORT, () => {
            logConsole(`Listening on http://localhost:${process.env.BACK_API_PORT}/`);
        });
    })
    .catch(err => {
        logConsole(`An error occurred: ${err}`, 'error');
    });