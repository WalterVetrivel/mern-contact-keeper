import React from 'react';
import PropTypes from 'prop-types';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelopeOpen, faPhone} from '@fortawesome/free-solid-svg-icons';

const ContactItem = ({contact}) => {
	const {id, name, email, phone, type} = contact;

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
				<button className="btn btn-dark btn-sm">Edit</button>
				<button className="btn btn-danger btn-sm">Delete</button>
			</p>
		</div>
	);
};

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
};

export default ContactItem;
