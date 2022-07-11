const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/:accessToken', cartController.getCartByUsername);
router.put('/', cartController.updateItemQuantity);
router.post('/', cartController.placeOrder);

module.exports = router;