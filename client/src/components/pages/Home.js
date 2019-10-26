import React, {useEffect, useContext} from 'react';

import AuthContext from '../../context/auth/authContext';

import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
	const authContext = useContext(AuthContext);
	const {loadUser} = authContext;

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="grid-2">
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<Contacts></Contacts>
			</div>
		</div>
	);
};

export default Home;
