module.exports = (msg) => {
    const fs = require('fs');

    const date = new Date();
    const log = `${date.toISOString()} | ${msg}\n`;

    fs.appendFile('logs/log.txt', log, (err) => {
        if (err) {
            console.error(err);
        }
    });
}