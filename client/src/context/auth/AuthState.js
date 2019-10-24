import React, {useReducer} from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	USER_LOADED,
	AUTH_ERROR,
	CLEAR_ERRORS
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		user: null,
		isAuth: null,
		loading: true,
		error: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load user
	const loadUser = () => {};

	// Register user
	const registerUser = () => {};

	// Login user
	const login = () => {};

	// Logout
	const logout = () => {};

	// Clear errors
	const clearErrors = () => {};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuth: state.isAuth,
				user: state.user,
				loading: state.loading,
				error: state.error,
				loadUser,
				login,
				logout,
				registerUser,
				clearErrors
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
