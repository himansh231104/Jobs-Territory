const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Routes
router.get('/me', authMiddleware, getMe);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
