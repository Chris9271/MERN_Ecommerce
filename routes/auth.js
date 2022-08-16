const express = require('express');
const authController = require('../controller/auth');
const {check} = require('express-validator');
const router = express.Router();

router.post('/sign',[
    // check('username').notEmpty().withMessage('Please enter username'),
    check('email').normalizeEmail().isEmail().withMessage('Please enter valid email'),
    check('password').isLength({min: 6}).withMessage('Please check password length')
],authController.addUser)

router.post('/login', authController.userLogin);

router.get('/logout', authController.userLogout);

router.post('/verify', authController.getUserVerify);

router.get('/', authController.checkUser);

module.exports = router;
