import React, {useState, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const init = {
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	};

	const contactContext = useContext(ContactContext);

	const [contact, setContact] = useState({...init});

	const onChange = e =>
		setContact({...contact, [e.target.name]: e.target.value});

	const onSubmit = e => {
		e.preventDefault();
		contactContext.addContact(contact);
		setContact({...init});
	};

	const {name, email, phone, type} = contact;
	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">Add Contact</h2>
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
					value="Submit"
					className="btn btn-primary btn-block"
				/>
			</div>
		</form>
	);
};

export default ContactForm;
