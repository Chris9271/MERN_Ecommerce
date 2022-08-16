const express = require('express');
const router = express.Router();
const verifyController = require('../controller/verify');

router.post('/resend', verifyController.requestVerifyMail);

router.post('/forget', verifyController.forgetPassword);

router.post('/reset', verifyController.resetPassword);

router.post('/request', verifyController.getVerifyString);

router.post('/', verifyController.checkIsUpdate);

module.exports = router;