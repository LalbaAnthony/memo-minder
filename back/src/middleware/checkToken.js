const jwt = require('jsonwebtoken');
const formatRes = require('../helpers/formatRes');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(401).json(formatRes('error', null, 'No header provided'));

    const token = authHeader.split(' ')[1] || authHeader || null; // authHeader as 'Bearer <token>'

    if (!token) return res.status(401).json(formatRes('error', null, 'No token provided'));

    try {
        const decoded = jwt.verify(token, process.env.BACK_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json(formatRes('error', null, 'Invalid or expired token'));
    }
};
