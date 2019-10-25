import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';

import PrivateRoute from './components/routing/PrivateRoute';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

if (localStorage.getItem('token')) {
	setAuthToken(localStorage.getItem('token'));
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar />
							<div className="container">
								<Alerts />
								<Switch>
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
									<PrivateRoute exact path="/" component={Home} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
