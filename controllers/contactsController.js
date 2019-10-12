const User = require('../models/User');
const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
	const {name, email, phone, type} = req.body;
	try {
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user: req.user.id
		});

		const contact = await newContact.save();
		return res.status(201).json({msg: 'Contact created', data: {contact}});
	} catch (err) {
		console.error(err);
		return res.status(500).json({msg: 'Something went wrong'});
	}
};

exports.getContacts = async (req, res) => {
	try {
		const contacts = await Contact.find({user: req.user.id}).sort({
			createdAt: -1
		});
		return res.json({data: contacts});
	} catch (err) {
		console.error(err);
		return res.status(500).json({msg: 'Something went wrong'});
	}
};

exports.updateContact = (req, res) => {
	res.send('Update contact');
};

exports.deleteContact = (req, res) => {
	res.send('Delete contact');
};
