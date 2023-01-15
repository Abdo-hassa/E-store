const express = require('express');
const authController = require('./auth.controller');
const router = express.Router();

router.post('/signup', authController.signup());
router.post('/login', authController.login());

// Protect all routes after this middleware
router.use(authController.protect());;

router.get('/logout', authController.logout());



module.exports = router;
