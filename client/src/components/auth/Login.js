import React, {useState} from 'react';

const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const {email, password} = user;

	onChange = e => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	onSubmit = e => {
		e.preventDefault();
	};

	return (
		<div className="form-container">
			<h1>
				Login
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={onChange}
							placeholder="Eg. test@test.com"
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
						/>
					</div>
					<input
						type="submit"
						className="btn btn-primary btn-block"
						value="Register"
					/>
				</form>
			</h1>
		</div>
	);
};

export default Login;
