const express = require('express');

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
router.post('/', getContacts);

// @route POST api/contacts
// @desc Create contact
// @access Private
router.post('/', createContact);

// @route PUT api/contacts
// @desc Update contact
// @access Private
router.put('/:id', updateContact);

// @route DELETE api/contacts
// @desc Delete contact
// @access Private
router.delete('/:id', updateContact);

module.exports = router;
