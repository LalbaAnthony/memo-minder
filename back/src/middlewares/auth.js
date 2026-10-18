const jwt = require('jsonwebtoken');
const frmtr = require('../helpers/frmtr');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json(frmtr('error', null, 'No header provided'));
    }

    const token = authHeader.split(' ')[1] || authHeader || null; // authHeader as 'Bearer <token>'

    if (!token) {
        return res.status(401).json(frmtr('error', null, 'No token provided'));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.BACK_TOKEN_SECRET_KEY);
    } catch (err) {
        return res.status(401).json(frmtr('error', null, 'Invalid or expired token'));
    }

    // Protected handlers scope every query with req.user.userId, so a token without it is rejected
    if (!decoded?.userId) {
        return res.status(401).json(frmtr('error', null, 'Invalid or expired token'));
    }

    req.user = decoded;
    next();
};
