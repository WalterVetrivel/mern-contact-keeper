const express = require('express');

const {getCurrentUser, login} = require('../controllers/authController');

const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', getCurrentUser);

// @route POST api/auth
// @desc Login
// @access Public
router.post('/', login);

module.exports = router;
