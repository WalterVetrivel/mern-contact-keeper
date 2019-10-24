import React, {useState, useContext} from 'react';

import AlertContext from '../../context/alert/alertContext';

const Login = () => {
	const alertContext = useContext(AlertContext);
	const {setAlert} = alertContext;

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const {email, password} = user;

	const onChange = e => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	const onSubmit = e => {
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
		}
	};

	return (
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
					value="Register"
				/>
			</form>
		</div>
	);
};

export default Login;
