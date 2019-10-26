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

export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: [...action.payload],
				loading: false,
				error: false
			};
		case CLEAR_CONTACTS:
			return {
				contacts: null,
				filtered: null,
				current: null,
				error: null,
				loading: true
			};
		case ADD_CONTACT:
			return {...state, contacts: [...state.contacts, action.payload]};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					contact => contact.id !== action.payload
				)
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(contact =>
					contact.id !== action.payload.id ? contact : action.payload
				)
			};
		case SET_CURRENT:
			const current = state.contacts.find(
				contact => contact.id === action.payload
			);
			return {
				...state,
				current
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(contact => {
					const regexp = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regexp) || contact.email.match(regexp);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};
