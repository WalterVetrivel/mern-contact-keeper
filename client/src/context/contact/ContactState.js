import React, {useReducer} from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: [],
		current: null,
		filtered: null,
		error: null
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Get contacts
	const getContacts = async () => {
		try {
			const response = await axios.get('/api/contacts');
			const contacts = response.data.data.contacts.map(contact => {
				return {
					...contact,
					id: contact._id
				};
			});
			dispatch({type: GET_CONTACTS, payload: contacts});
		} catch (err) {
			console.error(err);
			dispatch({type: CONTACT_ERROR, payload: err.msg});
		}
	};

	const clearContacts = () => {
		dispatch({type: CLEAR_CONTACTS});
	};

	// Add contact
	const addContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.post('/api/contacts', contact, config);
			const newContact = {
				...response.data.data.contact,
				id: response.data.data.contact._id
			};
			dispatch({type: ADD_CONTACT, payload: newContact});
		} catch (err) {
			dispatch({type: CONTACT_ERROR, payload: err.msg});
		}
	};

	// Delete contact
	const deleteContact = async id => {
		try {
			const response = await axios.delete(`/api/contacts/${id}`);
			console.log(response);
			dispatch({type: DELETE_CONTACT, payload: id});
		} catch (err) {
			console.error(err);
			dispatch({type: CONTACT_ERROR, payload: err.msg});
		}
	};

	// Set current contact
	const setCurrentContact = id => {
		dispatch({type: SET_CURRENT, payload: id});
	};

	// Clear current contact
	const clearCurrentContact = () => {
		dispatch({type: CLEAR_CURRENT});
	};

	// Update contact
	const updateContact = async contact => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.put(
				`/api/contacts/${contact.id}`,
				contact,
				config
			);
			const updatedContact = {
				...response.data.data.contact,
				id: response.data.data.contact._id
			};
			dispatch({type: UPDATE_CONTACT, payload: updatedContact});
		} catch (err) {
			console.error(err);
			dispatch({type: CONTACT_ERROR, payload: err.msg});
		}
	};

	// Filter contacts
	const filterContacts = text => {
		dispatch({type: FILTER_CONTACTS, payload: text});
	};

	// Clear filter
	const clearFilter = () => {
		dispatch({type: CLEAR_FILTER});
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				getContacts,
				clearContacts,
				addContact,
				deleteContact,
				setCurrentContact,
				clearCurrentContact,
				updateContact,
				filterContacts,
				clearFilter
			}}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
