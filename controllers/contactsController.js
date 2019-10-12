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
		return res.json({data: {contacts}});
	} catch (err) {
		console.error(err);
		return res.status(500).json({msg: 'Something went wrong'});
	}
};

exports.updateContact = async (req, res) => {
	const {name, email, phone, type} = req.body;

	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(404).json({msg: 'Contact not found'});

		if (contact.user.toString() !== req.user.id)
			return res.status(401).json({msg: 'Unauthorized'});

		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{$set: contactFields},
			{new: true}
		);

		return res.json({msg: 'Contact updated', data: {contact}});
	} catch (err) {
		console.error(err);
		return res.status(500).json({msg: 'Something went wrong'});
	}
};

exports.deleteContact = async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) return res.status(404).json({msg: 'Contact not found'});

		if (contact.user.toString() !== req.user.id)
			return res.status(401).json({msg: 'Unauthorized'});

		await Contact.findByIdAndRemove(req.params.id);

		return res.json({msg: 'Contact deleted'});
	} catch (err) {
		console.error(err);
		return res.status(500).json({msg: 'Something went wrong'});
	}
};
