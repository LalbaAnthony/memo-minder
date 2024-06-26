const jwt = require('jsonwebtoken');

const formatRes = require('../helpers/formatRes')
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const user_id = req.headers['UserId'] || null;
    const token = req.headers['Authorization'] || null;

    if (!user_id) return res.sendStatus(400).json(formatRes('error', null, 'Error while verifiying the user_id'));
    if (!token) return res.sendStatus(400).json(formatRes('error', null, 'Error while verifiying the token'));

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json(formatRes('error', null, 'User not found'));

    // Check if the token is valid
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403).json(formatRes('error', null, 'Error while verifiying the token'));
        req.user = user;
        next();
    });
};
