const express = require('express');
const router = express.Router();
const orderController = require('../controller/order')

router.get('/:userId', orderController.getUserOrder);
router.post('/new', orderController.addNewOrder);

module.exports = router;