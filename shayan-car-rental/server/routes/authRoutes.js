// routes/authRoutes.js
const express = require('express');
const { signup, login, protect, getAdminDetails } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup); // Sign up route (one-time setup)
router.post('/login', login); // Login route
router.get('/admin', protect, getAdminDetails); // Protected route example

module.exports = router;
