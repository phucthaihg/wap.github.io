const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);
/*
router.post('/', cartController.removeItem);
router.post('/', cartController.increaseItem);
router.post('/', cartController.decreaseItem);
router.post('/', cartController.placeOrder);
*/
module.exports = router;