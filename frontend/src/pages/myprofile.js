import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import Navbar from '../components/navbar';

import { getCookie } from '../components/functions';

var csrftoken = getCookie('csrftoken');

const Myprofile = props => {
	const [profile, setProfile] = useState();
	const getStats = () => {
		fetch(`/api/myprofile/`)
			.then(res => res.json())
			.then(json => {
				console.log(json);
				setProfile(json);
			});
	};
	useEffect(() => {
		getStats();
	}, []);
	const UpgradeTeacher = () => {
		const postTeacher = () => {
			fetch(`/api/myprofile/upgradeteacher/`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
				}
			})
				.then(res => res.json())
				.then(json => {
					console.log(json);
					getStats();
				});
		};
		return (
			<div>
				<button className="btn btn-primary mt-3" onClick={postTeacher}>
					Upgrade to teacher account
				</button>
			</div>
		);
	};
	const PasswordReset = () => {
		const [oldPassword, setOldPassword] = useState('');
		const [password1, setPassword1] = useState('');
		const [password2, setPassword2] = useState('');

		const [isError, setIsError] = useState(false);
		const [successfully, setSucessfully] = useState(false);

		const resetPassword = e => {
			e.preventDefault();
			fetch(`/rest-auth/password/change/`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
				},
				body: JSON.stringify({
					old_password: oldPassword,
					new_password1: password1,
					new_password2: password2
				})
			})
				.then(res => res.json())
				.then(json => {
					setIsError(false);
					setSucessfully(true);
				})
				.catch(err => {
					setIsError(err);
					setSucessfully(false);
				});
		};
		return (
			<div className="mt-5">
				{isError ? <div className="alert alert-danger">{isError}</div> : null}
				{successfully ? (
					<div className="alert alert-success">
						Updated password successfully
					</div>
				) : null}
				<form onSubmit={resetPassword} className="maxer-form">
					<h5>Change your password</h5>
					<div className="form-group mb-4">
						<input
							className="form-control"
							type="password"
							value={oldPassword}
							onChange={e => {
								setOldPassword(e.target.value);
							}}
							placeholder="Your old password"
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							value={password1}
							onChange={e => {
								setPassword1(e.target.value);
							}}
							placeholder="Choose a password"
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							value={password2}
							onChange={e => {
								setPassword2(e.target.value);
							}}
							placeholder="Choose a password"
						/>
					</div>
					<button type="submit" className="btn btn-primary mb-2">
						Change password
					</button>
				</form>
			</div>
		);
	};
	return (
		<Layout>
			<Navbar />
			<div className="animated fadeIn text-dark">
				<div className="">
					<div className="text-green mx-auto">
						<h3>My profile</h3>
						{profile ? (
							<div className="text-white mt-4 text-left maxer-500 mx-auto">
								<h4>User: {profile.name}</h4>
								<h4>
									Type:{' '}
									{profile.type === 0
										? 'Blind student'
										: 'Partially blind student'}
								</h4>

								{profile.is_teacher ? (
									<h4>You are a teacher</h4>
								) : (
									<UpgradeTeacher />
								)}

								<PasswordReset />
							</div>
						) : null}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Myprofile;
