const jwt = require('jsonwebtoken');
const frmtr = require('../helpers/frmtr');

module.exports = async (req, res, next) => {
    console.log(process.env.BACK_BYPASS_AUTH);
    if (process.env.BACK_BYPASS_AUTH == 'true') {
        next();
        return;
    }

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json(frmtr('error', null, 'No header provided'));
    }

    const token = authHeader.split(' ')[1] || authHeader || null; // authHeader as 'Bearer <token>'

    if (!token) {
        return res.status(401).json(frmtr('error', null, 'No token provided'));
    }

    try {
        const decoded = jwt.verify(token, process.env.BACK_TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json(frmtr('error', null, 'Invalid or expired token'));
    }
};