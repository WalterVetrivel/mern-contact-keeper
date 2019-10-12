const express = require('express');
const {check} = require('express-validator');

const {validate} = require('../middleware/validation');
const {getCurrentUser, login} = require('../controllers/authController');

const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', getCurrentUser);

// @route POST api/auth
// @desc Login
// @access Public
router.post(
	'/',
	[
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Password is required').exists(),
		validate
	],
	login
);

module.exports = router;
