const User= require ('../models/userModel');
const { Sequelize } = require('sequelize');
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: 'user' 
        });
        const { password: _, ...userData } = user.toJSON();
        res.status(201).json(userData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id, {
                attributes: { exclude: ['password'] }
            });
            return res.status(200).json(updatedUser);
        }
        return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const [updated] = await User.update(
            { password: hashedPassword },
            { where: { id: req.params.id } }
        );

        if (updated) {
            return res.status(200).json({ message: 'Password updated successfully' });
        }
        return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;
        const users = await User.findAll({
            where: {
                username: {
                    [Sequelize.Op.like]: `%${username}%`
                }
            },
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = generateToken(user);
        const { password: _, ...userData } = user.toJSON();
        
        res.status(200).json({ 
            message: 'Login successful', 
            user: userData,
            token 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    updateUserPassword,
    deleteUser,
    searchUsers,
    loginUser
};