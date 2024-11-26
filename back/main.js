// Import modules
const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Import config
const sequelize = require('./src/config/database');

// Importing routes
const routes = require('./src/routes');

// Importing helpers
const frmtr = require('./src/helpers/frmtr')
const logFile = require('./src/helpers/logFile')
const logConsole = require('./src/helpers/logConsole')

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express()

// CORS middleware
app.use(cors({
    origin: process.env.VITE_APP_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// Log middleware
app.use((req, res, next) => {
    logFile(`ADDRESS: ${req.socket.remoteAddress}, URL: ${req.url}, METHOD: ${req.method}, RESPONSE: ${res.statusCode}`)
    next()
})

// Favicon middleware
app.use(favicon(__dirname + '/public/favicon.ico'))

// Middleware to parse the body of the request
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// If nothing found above, return 404
app.use(({ res }) => {
    return res.status(404).json(frmtr('error', null, 'Nothing found here!'))
})

// Synchronisation de la base de données et démarrage du serveur
sequelize.sync()
    .then(() => {
        logConsole('Database & tables created!', 'success');
        app.listen(process.env.BACK_API_PORT, () => {
            logConsole(`Listening on http://localhost:${process.env.BACK_API_PORT}/`, 'info');
        });
    })
    .catch(err => {
        logConsole(`An error occurred: ${err}`, 'error');
    });