const jwt = require('jsonwebtoken');
const frmtr = require('../helpers/frmtr');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) res.status(401).json(frmtr('error', null, 'No header provided'));

    const token = authHeader.split(' ')[1] || authHeader || null; // authHeader as 'Bearer <token>'

    if (!token) res.status(401).json(frmtr('error', null, 'No token provided'));

    try {
        const decoded = jwt.verify(token, process.env.BACK_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json(frmtr('error', null, 'Invalid or expired token'));
    }
};