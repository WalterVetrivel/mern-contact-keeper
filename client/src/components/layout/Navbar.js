import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {faIdCardAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import AuthContext from '../../context/auth/authContext';

const Navbar = ({title, icon}) => {
	const authContext = useContext(AuthContext);
	const {isAuth, logout, user} = authContext;

	const onLogout = () => {
		logout();
	};

	const authLinks = (
		<Fragment>
			<li>Hello {user && user.name}</li>
			<li>
				<a onClick={onLogout} style={{cursor: 'pointer'}}>
					<FontAwesomeIcon icon={faSignOutAlt} />
					&nbsp;
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<h1>
				<FontAwesomeIcon icon={icon} />
				&nbsp;
				{title}
			</h1>
			<ul>{isAuth ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.object
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: faIdCardAlt
};

export default Navbar;
