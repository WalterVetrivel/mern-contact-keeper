import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const {
		current,
		addContact,
		clearCurrentContact,
		updateContact
	} = contactContext;

	let init = {
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	};

	const [contact, setContact] = useState({...init});

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact(init);
		}
		// eslint-disable-next-line
	}, [contactContext, current]);

	const onChange = e =>
		setContact({...contact, [e.target.name]: e.target.value});

	const clearAll = () => {
		clearCurrentContact();
		setContact({...init});
	};

	const onSubmit = e => {
		e.preventDefault();
		if (!current) {
			addContact(contact);
		} else {
			updateContact({...contact, id: current.id});
		}
		clearAll();
	};

	const {name, email, phone, type} = contact;
	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">
				{current === null ? 'Add' : 'Edit'} Contact
			</h2>
			<input
				type="text"
				placeholder="eg. John Doe"
				name="name"
				value={name}
				onChange={onChange}
			/>
			<input
				type="email"
				placeholder="eg. test@test.com"
				name="email"
				value={email}
				onChange={onChange}
			/>
			<input
				type="text"
				placeholder="eg. +61 466 000 000"
				name="phone"
				value={phone}
				onChange={onChange}
			/>
			<h5>Contact Type</h5>
			<input
				type="radio"
				name="type"
				value="personal"
				checked={type === 'personal'}
				onChange={onChange}
			/>
			Personal&nbsp;
			<input
				type="radio"
				name="type"
				value="professional"
				checked={type === 'professional'}
				onChange={onChange}
			/>
			Professional
			<div>
				<input
					type="submit"
					value={current ? 'Update Contact' : 'Add Contact'}
					className="btn btn-primary btn-block"
				/>
				{current && (
					<input
						type="button"
						value="Clear"
						className="btn btn-light btn-block"
						onClick={clearAll}
					/>
				)}
			</div>
		</form>
	);
};

export default ContactForm;
