import React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../components/functions';
var csrftoken = getCookie('csrftoken');

const Logout = props => {
	localStorage.removeItem('user');

	fetch(`/rest-auth/logout/`, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken
		}
	}).then(res => console.log(res.json()));
	window.location.href = '/';
	return <div></div>;
};

export default Logout;
