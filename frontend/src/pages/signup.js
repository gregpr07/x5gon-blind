import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

const Signup = props => {
	const [userName, setUserName] = useState('');
	return (
		<Layout>
			<form className="maxer-form mx-auto">
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
					<select className="form-control" id="exampleFormControlSelect1">
						<option>Teacher</option>
						<option>Blindman</option>
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
