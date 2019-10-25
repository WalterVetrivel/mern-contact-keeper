import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const {login, error, clearErrors, isAuth, loadUser} = authContext;
	const {setAlert} = alertContext;

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const {email, password} = user;

	useEffect(() => {
		loadUser();
		if (error && error !== '') {
			setAlert(error, 'danger');
			clearErrors();
		}
	}, [error]);

	const onChange = e => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	const onSubmit = async e => {
		e.preventDefault();
		let isError = false;
		if (email === '') {
			setAlert('Email is required', 'danger');
			isError = true;
		}
		if (password === '') {
			setAlert('Password is required', 'danger');
			isError = true;
		}
		if (!isError) {
			try {
				await login(user);
			} catch (err) {
				console.error(err);
				setAlert('Login failed', 'danger');
			}
		}
	};

	return !isAuth ? (
		<div className="form-container">
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={onChange}
						placeholder="Eg. test@test.com"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={onChange}
						placeholder="Eg. S@mp1ePwd"
						required
					/>
				</div>
				<input
					type="submit"
					className="btn btn-primary btn-block"
					value="Login"
				/>
			</form>
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default Login;
