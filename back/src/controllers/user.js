const formatRes = require('../helpers/formatRes')
const generateCode = require('../helpers/generateCode')
const verifiyingToken = require('../helpers/verifiyingToken')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = async (req, res) => {
    const { pseudo, email, password, language } = req.body;
    try {
        // Check if all fields are provided
        if (!pseudo || !email || !password) return res.status(404).json(formatRes('error', null, 'Missing fields: pseudo, email, password'));

        // Check if the email is already used
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(404).json(formatRes('error', null, 'Email already used'));

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({ pseudo, email, password: hashedPassword, language: language || 'en' });
        if (!newUser) return res.status(500).json(formatRes('error', null, 'Error while creating the account'));

        return res.status(201).json(formatRes('success', newUser, 'Account created successfully'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !password) return res.status(404).json(formatRes('error', null, 'Missing fields: email, password'));

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this email'))

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(404).json(formatRes('error', null, 'Invalid password'))

        // Generate a token
        const token = jwt.sign({ userId: user.user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        user.connection_token = token;
        user.last_login = new Date().toISOString();
        await user.save();

        // Remove the password from the resp
        user.password = null;

        return res.status(201).json(formatRes('success', user, 'Logged in successfully'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.verifyEmail = async (req, res) => {
    const { email, token } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !token) return res.status(404).json(formatRes('error', null, 'Missing fields: email, token'));

        // Check if the user exists
        const user = await User.findOne({ where: { email, validate_email_token: token } });
        if (!user) return res.status(404).json(formatRes('error', null, 'Invalid email or token'));

        // Validate the email and remove the token
        user.has_validated_email = true;
        user.validate_email_token = null;
        await user.save();

        return res.status(201).json(formatRes('success', null, 'Email verified successfully'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if all fields are provided
        if (!email) return res.status(404).json(formatRes('error', null, 'Missing fields: email'));

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json(formatRes('error', null, 'No user found with this email'));

        // Generate a reset code and save it to the user
        const resetCode = generateCode();
        user.reset_password_code = resetCode;
        await user.save();

        // TODO: Send an email with the reset code

        return res.status(201).json(formatRes('success', null, 'Reset code sent to your email'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !resetCode || !newPassword) return res.status(404).json(formatRes('error', null, 'Missing fields: email, resetCode, newPassword'));

        // Check if the user exists
        const user = await User.findOne({ where: { email, reset_password_code: resetCode } });
        if (!user) return res.status(404).json(formatRes('error', null, 'Invalid email or reset code'));

        // Reset the password
        user.password = await bcrypt.hash(newPassword, 10);
        user.reset_password_code = null;
        await user.save();

        return res.status(201).json(formatRes('success', null, 'Password reset successfully'))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.infos = async (req, res) => {
    const { userId, token } = req.body;
    try {
        // Check if all fields are provided
        if (!userId || !token) return res.status(404).json(formatRes('error', null, 'Missing fields: userId, token'));

        // Check if the user exists and the token is valid
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findByPk(decoded.userId);
        if (!user) return res.status(404).json(formatRes('error', null, 'Error while verifiying the token'));

        // Remove the password from the response
        user.password = null;

        return res.status(201).json(formatRes('success', user))
    } catch (error) {
        return res.status(500).json(formatRes('error', null, error.message))
    }
};

exports.validateToken = async (req, res) => {
    const { token } = req.body;
    try {
        // Check if all fields are provided
        if (!token) return res.status(404).json(formatRes('error', null, 'Missing fields: token'));

        // Check if the token is valid
        if (!verifiyingToken(token)) return res.status(404).json(formatRes('error', null, 'Error while verifiying the token'));

        return res.status(201).json(formatRes('success', null, 'Token is valid'))
    } catch (error) {
        return res.status(401).json({ valid: false, error: 'Token invalide' });
    }
};
