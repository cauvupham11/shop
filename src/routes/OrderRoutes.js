const express = require('express');
const router = express.Router();
const orderController = require('../controller/OrderController');


router.post('/', orderController.createOrder);
router.get('/:userId', orderController.getAllOrdersByUserId)
router.get('/', orderController.getAllOrder)
module.exports = router;