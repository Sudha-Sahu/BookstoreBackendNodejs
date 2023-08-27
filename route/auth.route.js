const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.patch('/forgetpassword', authController.forgetPassword);

module.exports = router;