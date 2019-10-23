import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER
} from '../types';

export default (state, action) => {
	switch (action.type) {
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
			break;
		case SET_CURRENT:
			break;
		case CLEAR_CURRENT:
			break;
		case FILTER_CONTACTS:
			break;
		case CLEAR_FILTER:
			break;
		default:
			return state;
	}
};
