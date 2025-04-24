const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/search', userController.searchUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.patch('/:id/password', userController.updateUserPassword);
router.delete('/:id', userController.deleteUser);

module.exports = router;