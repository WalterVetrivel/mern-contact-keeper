import React, {useState} from 'react';

const Register = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const {name, email, password, password2} = user;

	onChange = e => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	onSubmit = e => {
		e.preventDefault();
	};

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Register</span>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={onChange}
							placeholder="Eg. John Doe"
							password
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
					<div className="form-group">
						<label htmlFor="password2">Confirm Password</label>
						<input
							type="password"
							name="password2"
							value={password2}
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

export default Register;
