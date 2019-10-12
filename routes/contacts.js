const express = require('express');
const {check} = require('express-validator');

const auth = require('../middleware/auth');
const validate = require('../middleware/validation');

const {
	createContact,
	updateContact,
	getContacts,
	deleteContact
} = require('../controllers/contactsController');

const router = express.Router();

// @route GET api/contacts
// @desc Get contacts
// @access Private
router.get('/', auth, getContacts);

// @route POST api/contacts
// @desc Create contact
// @access Private
router.post(
	'/',
	[auth, check('name', 'Name is required'), validate],
	createContact
);

// @route PUT api/contacts
// @desc Update contact
// @access Private
router.put('/:id', auth, updateContact);

// @route DELETE api/contacts
// @desc Delete contact
// @access Private
router.delete('/:id', auth, deleteContact);

module.exports = router;
