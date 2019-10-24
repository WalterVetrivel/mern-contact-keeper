import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
	const alertContext = useContext(AlertContext);

	const {alerts} = alertContext;

	return (
		alerts.length > 0 &&
		alerts.map(alert => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				<FontAwesomeIcon icon={faInfoCircle} />
				&nbsp;
				{alert.msg}
			</div>
		))
	);
};

export default Alerts;
