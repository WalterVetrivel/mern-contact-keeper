import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelopeOpen, faPhone} from '@fortawesome/free-solid-svg-icons';

import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({contact}) => {
	const contactContext = useContext(ContactContext);

	const {id, name, email, phone, type} = contact;

	const onEdit = () => {
		contactContext.setCurrentContact(id);
	};

	const onDelete = () => {
		contactContext.deleteContact(id);
		contactContext.clearCurrentContact();
	};

	return (
		<div className="card bg-light">
			<h3
				className="text-primary text-left"
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
				{name}&nbsp;
				<span
					className={`badge ${
						type === 'professional' ? 'badge-success' : 'badge-primary'
					}`}>
					{type.slice(0, 1).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<FontAwesomeIcon
							icon={faEnvelopeOpen}
							style={{marginRight: '.5rem'}}
						/>
						{email}
					</li>
				)}
				{phone && (
					<li>
						<FontAwesomeIcon icon={faPhone} style={{marginRight: '.5rem'}} />
						{phone}
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-dark btn-sm" onClick={onEdit}>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={onDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
};

export default ContactItem;
