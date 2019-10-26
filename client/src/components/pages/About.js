import React, {useEffect, useContext} from 'react';

import AuthContext from '../../context/auth/authContext';

const About = () => {
	const authContext = useContext(AuthContext);
	const {loadUser} = authContext;

	useEffect(() => {
		loadUser();
		console.log('User loaded');
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<h1>About this app</h1>
			<p className="my-1">
				This is a full-stack React app for managing contacts.
			</p>
			<p className="bg-dark p">
				<strong>Version: </strong>1.0.0
			</p>
		</div>
	);
};

export default About;
