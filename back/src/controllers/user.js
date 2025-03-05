const frmtr = require('../helpers/frmtr')
const generateCode = require('../helpers/generateCode')
const shortenIsoDate = require('../helpers/shortenIsoDate')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = async (req, res) => {
    const { username, birthdate, email, password, language } = req.body;
    try {
        // Check if all fields are provided
        if (!username || !birthdate || !email || !password) res.status(400).json(frmtr('error', null, 'Missing fields, must have: username, birthdate, email, password'));

        // Check if the email is already used
        const user = await User.findOne({ where: { email } });
        if (user) res.status(400).json(frmtr('error', null, 'Email already used'));

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const { username, birthdate, email, password, language } = req.body;
        const newUser = await User.create({ username, birthdate, email, password: hashedPassword, language });
        if (!newUser) res.status(500).json(frmtr('error', null, 'Error while creating the account'));

        res.status(200).json(frmtr('success', newUser, 'Account created successfully'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !password) res.status(400).json(frmtr('error', null, 'Missing fields: email, password'));

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) res.status(204).json(frmtr('error', null, 'No user found with this email'))

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) res.status(404).json(frmtr('error', null, 'Invalid password'))

        // Generate a token
        const token = jwt.sign({ userId: user.userId }, process.env.BACK_TOKEN_SECRET_KEY, { expiresIn: process.env.BACK_TOKEN_EXPIRES_IN });
        user.lastLogin = new Date().toISOString();
        await user.save();

        // Remove sensitive data from the response
        delete user.dataValues.password
        delete user.dataValues.validateEmailToken
        delete user.dataValues.resetPasswordCode

        // Add the token to the response
        user.dataValues.connectionToken = token

        // Format the date
        user.dataValues.birthdate = shortenIsoDate(user.dataValues.birthdate)

        res.status(200).json(frmtr('success', user, 'Logged in successfully'))
    } catch (error) {
        // res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.verifyEmail = async (req, res) => {
    const { email, token } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !token) res.status(400).json(frmtr('error', null, 'Missing fields: email, token'));

        // Check if the user exists
        const user = await User.findOne({ where: { email, validateEmailToken: token } });
        if (!user) res.status(404).json(frmtr('error', null, 'Invalid email or token'));

        // Validate the email and remove the token
        user.hasValidatedEmail = true;
        user.validateEmailToken = null;
        await user.save();

        res.status(200).json(frmtr('success', null, 'Email verified successfully'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if all fields are provided
        if (!email) res.status(400).json(frmtr('error', null, 'Missing fields: email'));

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) res.status(404).json(frmtr('error', null, 'No user found with this email'));

        // Generate a reset code and save it to the user
        const resetCode = generateCode();
        user.resetPasswordCode = resetCode;
        await user.save();

        // TODO: Send an email with the reset code

        res.status(200).json(frmtr('success', null, 'Reset code sent to your email'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.resetPassword = async (req, res) => {
    const { email, resetCode, newPassword } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !resetCode || !newPassword) res.status(404).json(frmtr('error', null, 'Missing fields: email, resetCode, newPassword'));

        // Check if the user exists
        const user = await User.findOne({ where: { email, resetPasswordCode: resetCode } });
        if (!user) res.status(400).json(frmtr('error', null, 'Invalid email or reset code'));

        // Reset the password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordCode = null;
        await user.save();

        res.status(200).json(frmtr('success', null, 'Password reset successfully'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.userInfos = async (req, res) => {
    const userId = req.params.id
    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) res.status(404).json(frmtr('error', null, 'User not found'));

        // Remove sensitive data from the response
        delete user.dataValues.password;
        delete user.dataValues.validateEmailToken
        delete user.dataValues.resetPasswordCode

        // Format the date
        user.dataValues.birthdate = shortenIsoDate(user.dataValues.birthdate)

        res.status(200).json(frmtr('success', user,))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.userUpdate = async (req, res) => {
    const userId = req.params.id
    const { username, birthdate, email, language, homePageEnableSpents, homePageEnableStats, homePageEnableQuote, homePageEnableLasts } = req.body;
    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) res.status(404).json(frmtr('error', null, 'User not found'));

        // Update the user
        const resp = await user.update({ username, birthdate, email, language, homePageEnableSpents, homePageEnableStats, homePageEnableQuote, homePageEnableLasts });
        if (!resp) res.status(500).json(frmtr('error', null, 'Error updating user'));

        // Remove sensitive data from the response
        delete user.dataValues.password;
        delete user.dataValues.validateEmailToken
        delete user.dataValues.resetPasswordCode

        res.status(201).json(frmtr('success', user,))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.userDelete = async (req, res) => {
    const userId = req.params.id
    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) res.status(404).json(frmtr('error', null, 'User not found'));

        // Delete the user
        await user.destroy();

        res.status(200).json(frmtr('success', null, 'User deleted successfully'))
    } catch (error) {
        res.status(500).json(frmtr('error', null, error.message))
    }
};
