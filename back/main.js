const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Importing routes
const routes = require('./src/routes');

// Importing middlewares
const logging = require('./src/middlewares/logging')

// Importing helpers
const frmtr = require('./src/helpers/frmtr')
const logConsole = require('./src/helpers/logConsole')

// Importing sequelize
const { sequelize } = require('./src/database');

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express()

// CORS middleware
app.use(cors({}));

// Log middleware
app.use(logging);

// Favicon middleware
app.use(favicon(__dirname + '/public/favicon.ico'))

// Middleware to parse the body of the request
app.use(bodyParser.json());

// Routes
BASE_PATH = '/api'
app.use(BASE_PATH, routes);

// If nothing found above, return 404
app.use(({ res }) => {
    return res.status(404).json(frmtr('error', null, 'Nothing found here!'))
})

// Synchronisation de la base de données et démarrage du serveur
sequelize.sync()
    .then(() => {
        logConsole('Database & tables created!', 'success');
        app.listen(process.env.BACK_PORT, () => {
            logConsole(`Listening on http://localhost:${process.env.BACK_PORT}/ for ${process.env.VITE_FRONT_URL}`, 'info');
        })
        logConsole('Server started!', 'success');
    })
    .catch(err => {
        logConsole(`An error occurred: ${err}`, 'error');
    });