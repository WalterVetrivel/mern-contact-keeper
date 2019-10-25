import React, {useReducer} from 'react';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

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
	const loadUser = async () => {
		if (localStorage.getItem('token')) {
			setAuthToken(localStorage.getItem('token'));
			try {
				const response = await axios.get('/api/auth');
				dispatch({type: USER_LOADED, payload: response.data});
			} catch (err) {
				dispatch({type: AUTH_ERROR});
			}
		} else {
			dispatch({type: AUTH_ERROR});
		}
	};

	// Register user
	const registerUser = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const response = await axios.post('/api/users', formData, config);
			dispatch({type: REGISTER_SUCCESS, payload: response.data});
			loadUser();
		} catch (err) {
			dispatch({type: REGISTER_FAIL, payload: err.response.data.msg});
		}
	};

	// Login user
	const login = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const response = await axios.post('/api/auth', formData, config);
			dispatch({type: LOGIN_SUCCESS, payload: response.data});
			loadUser();
		} catch (err) {
			dispatch({type: LOGIN_FAIL, payload: err.response.data.msg});
		}
	};

	// Logout
	const logout = () => dispatch({type: LOGOUT});

	// Clear errors
	const clearErrors = () => dispatch({type: CLEAR_ERRORS});

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
