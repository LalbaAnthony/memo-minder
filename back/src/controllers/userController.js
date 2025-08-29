const frmtr = require('../helpers/frmtr')
const generateCode = require('../helpers/generateCode')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../helpers/generateToken');

const { User } = require('../database');

exports.register = async (req, res) => {
    const { username, birthdate, email, password, language } = req.body;
    try {
        // Check if all fields are provided
        if (!username || !birthdate || !email || !password) return res.status(400).json(frmtr('error', null, 'Missing fields: username, birthdate, email, password'));

        // Check if the email is already used
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json(frmtr('error', null, 'Email already used'));

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({ username, birthdate, email, password: hashedPassword, language });
        if (!newUser) return res.status(500).json(frmtr('error', null, 'Error while creating the account'));

        // Generate a reset code and save it to the user
        const token = generateToken();
        newUser.validateEmailToken = token;
        await newUser.save();

        // TODO: Send an email with the reset code
        console.log(`Validation link for ${email}: ${process.env.VITE_FRONT_URL}/auth?email=${email}&token=${token}`);

        return res.status(201).json(frmtr('success', null, 'Account created successfully'))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !password) return res.status(400).json(frmtr('error', null, 'Missing fields: email, password'));

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json(frmtr('error', null, 'Invalid credentials'))

        // Check if the email has been validated
        if (!user.hasValidatedEmail) return res.status(403).json(frmtr('error', null, 'Email not validated, please check your inbox'))

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(404).json(frmtr('error', null, 'Invalid credentials'))

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

        return res.status(200).json(frmtr('success', user, 'Logged in successfully'))
    } catch (error) {
        // return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.verifyEmail = async (req, res) => {
    const { email, token } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !token) return res.status(400).json(frmtr('error', null, 'Missing fields: email, token'));

        // Check if the user exists
        const user = await User.findOne({ where: { email, validateEmailToken: token } });
        if (!user) return res.status(404).json(frmtr('error', null, 'Invalid email or token'));

        // Validate the email and remove the token
        user.hasValidatedEmail = true;
        user.validateEmailToken = null;
        await user.save();

        return res.status(200).json(frmtr('success', null, 'Email verified successfully'))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if all fields are provided
        if (!email) return res.status(400).json(frmtr('error', null, 'Missing fields: email'));

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(200).json(frmtr('success', null, 'Reset code sent to your email')) // Lying to the user for security reasons

        // Generate a reset code and save it to the user
        const code = generateCode();
        user.resetPasswordCode = code;
        await user.save();

        // TODO: Send an email with the reset code
        console.log(`Reset code for ${email}: ${code}`);

        return res.status(200).json(frmtr('success', null, 'Reset code sent to your email'))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.resetPassword = async (req, res) => {
    const { email, code, password } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !code || !password) return res.status(404).json(frmtr('error', null, 'Missing fields: email, code, password'));

        // Check if the user exists
        const user = await User.findOne({ where: { email, resetPasswordCode: code } });
        if (!user) return res.status(400).json(frmtr('error', null, 'Invalid email or reset code'));

        // Reset the password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordCode = null;
        await user.save();

        return res.status(200).json(frmtr('success', null, 'Password reset successfully'))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.userInfos = async (req, res) => {
    const userId = req.params.id
    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json(frmtr('error', null, 'User not found'));

        // Remove sensitive data from the response
        delete user.dataValues.password;
        delete user.dataValues.validateEmailToken
        delete user.dataValues.resetPasswordCode

        return res.status(200).json(frmtr('success', user, 'User found successfully'))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.userUpdate = async (req, res) => {
    const userId = req.params.id
    const { username, birthdate, language, homePageEnableSpents, homePageEnableStats, homePageEnableQuote, homePageEnableLastsEvents, homePageEnableLastsSeasons, homePageEnableUpcomings, streamingPlatform } = req.body;
    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json(frmtr('error', null, 'User not found'));

        // Update the user
        const resp = await user.update({ username, birthdate, language, homePageEnableSpents, homePageEnableStats, homePageEnableQuote, homePageEnableLastsEvents, homePageEnableLastsSeasons, homePageEnableUpcomings, streamingPlatform });
        if (!resp) return res.status(500).json(frmtr('error', null, 'Error updating user'));

        // Remove sensitive data from the response
        delete user.dataValues.password
        delete user.dataValues.validateEmailToken
        delete user.dataValues.resetPasswordCode

        return res.status(200).json(frmtr('success', user, 'User updated successfully'))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};

exports.userDelete = async (req, res) => {
    const userId = req.params.id
    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json(frmtr('error', null, 'User not found'));

        // Delete the user
        await user.destroy();

        return res.status(200).json(frmtr('success', null, 'User deleted successfully'))
    } catch (error) {
        return res.status(500).json(frmtr('error', null, error.message))
    }
};
