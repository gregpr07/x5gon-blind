import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

const Signup = props => {
	const [userName, setUserName] = useState('');
	const [userType, setUserType] = useState(0);

	const [isError, setIsError] = useState(false);
	const [successfully, setSucessfully] = useState(false);

	const postRegister = e => {
		e.preventDefault();
		console.log(userType);
		fetch(`${props.requestLink}/api/register/`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: userName,
				userType: userType
			})
		})
			.then(res => res.json())
			.then(json => {
				if (json === 'error') {
					setIsError(true);
					setSucessfully(false);
				} else {
					setIsError(false);
					setSucessfully(true);
				}
			});
	};
	return (
		<Layout>
			<Navbar />
			{isError ? (
				<div className="alert alert-danger">User already exists</div>
			) : null}
			{successfully ? (
				<div className="alert alert-success">
					Created user {userName} successfully{' '}
					<Link to="/login">You can now log in</Link>
				</div>
			) : null}
			<form onSubmit={postRegister} className="maxer-form mx-auto">
				<div className="form-group">
					<input
						className="form-control"
						type="username"
						value={userName}
						onChange={e => {
							setUserName(e.target.value);
						}}
						placeholder="Choose a username"
					/>
					<label htmlFor="exampleFormControlSelect1" className="mt-3">
						Choose what you are
					</label>
					<select
						className="form-control"
						id="exampleFormControlSelect1"
						value={userType}
						onChange={event => setUserType(event.target.value)}
					>
						<option value="0">Blindman</option>
						<option value="1">Teacher</option>
					</select>
				</div>
				<button type="submit" className="button-green px-5 mb-2">
					Sign Up
				</button>
			</form>
			<Link to="/login">Already have an account?</Link>
		</Layout>
	);
};

export default Signup;
