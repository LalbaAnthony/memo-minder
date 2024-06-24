const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = (token) => {
    const decoded = jwt.verify(token, process.env.BACK_SECRET_KEY);
    const user = User.findByPk(decoded.userId);

    if (!user) return false;
    return true;
}