const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');    
const { authenticateJWT, authorizeRoles } = require('../middleware/auth');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);

router.get('/', authenticateJWT, authorizeRoles('admin'), userController.getAllUsers);
router.get('/search', authenticateJWT, userController.searchUsers);
router.get('/:id', authenticateJWT, userController.getUserById);
router.put('/:id', authenticateJWT, userController.updateUser);
router.patch('/:id/password', authenticateJWT, userController.updateUserPassword);
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;