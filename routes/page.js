const express = require('express');
const router = express.Router();
const pageController = require('../controller/page');

router.get('/men', pageController.getMensProduct);
router.get('/women', pageController.getWomensProduct);
router.get('/sale', pageController.getSaleProduct);
router.get('/new', pageController.getNewProduct);
router.get('/accessory', pageController.getAccessoryProduct);
router.get('/product/:id', pageController.getSingleProduct);

module.exports = router;