const express = require('express');
const {check} = require('express-validator');

const validate = require('../middleware/validation');
const {createUser} = require('../controllers/usersController');

const router = express.Router();

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
	'/',
	[
		check('name', 'Please enter a name')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({min: 6}),
		validate
	],
	createUser
);

module.exports = router;
