const express = require('express');

const {createUser} = require('../controllers/usersController');

const router = express.Router();

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', createUser);

module.exports = router;
