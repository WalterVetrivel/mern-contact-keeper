import React, {useState, useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const {loadUser, registerUser, error, clearErrors, isAuth} = authContext;
	const {setAlert} = alertContext;

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const {name, email, password, password2} = user;

	useEffect(() => {
		loadUser();
		if (error && error !== '') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error]);

	const onChange = e => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	const onSubmit = async e => {
		e.preventDefault();
		let isError = false;
		if (name === '') {
			setAlert('Name is required', 'danger');
			isError = true;
		}
		if (email === '') {
			setAlert('Email is required', 'danger');
			isError = true;
		}
		if (password === '') {
			setAlert('Password is required', 'danger');
			isError = true;
		}
		if (password.length < 6) {
			setAlert('Password must be at least 6 characters long', 'danger');
			isError = true;
		}
		if (password !== password2) {
			setAlert("Passwords don't match", 'danger');
			isError = true;
		}
		if (!isError) {
			try {
				await registerUser(user);
			} catch (err) {
				console.error(err);
				setAlert('Registration failed', 'danger');
			}
		}
	};

	return !isAuth ? (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={onChange}
						placeholder="Eg. John Doe"
						required
					/>
				</div>
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
						minLength="6"
						onChange={onChange}
						placeholder="Eg. S@mp1ePwd"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						name="password2"
						value={password2}
						minLength="6"
						onChange={onChange}
						placeholder="Eg. S@mp1ePwd"
						required
					/>
				</div>
				<input
					type="submit"
					className="btn btn-primary btn-block"
					value="Register"
				/>
			</form>
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default Register;
