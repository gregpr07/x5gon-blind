import React, { useEffect, useState } from 'react';
import { Bubble, Radar, Line, defaults } from 'react-chartjs-2';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { getCookie } from '../components/functions';

defaults.global.animation = false;

const Header = () => {
	return (
		<header className="bg-white" style={{ zIndex: '-100' }}>
			<div className="mx-auto maxer contents">
				<div className="row no-gutters my-auto mt-md-0">
					<div className="col-md-12 col-lg-6 my-auto">
						<div className="main-content pl-1 ml-4">
							<h1 className="text-black text-main-header">Undestand</h1>
							<h4 className="body-2">your</h4>
							<h1 className="text-black text-main-header">
								<b className="d-block">Students</b>
							</h1>
							<p className="mt-3 pt-3 text-black w-100 body-2 pb-2 pr-4 pr-md-3">
								Understand your students' accessibility progress and monitor
								their progress
							</p>
						</div>
					</div>
					<div className="col-md-12 col-lg-6 pt-md-0 pt-4">
						<div className="main-img animated fadeIn slower mx-auto mr-md-auto"></div>
					</div>
				</div>
			</div>
		</header>
	);
};

const Teachers = props => {
	var csrftoken = getCookie('csrftoken');
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const Login = () => {
		const [username, setUsername] = useState();
		const [password, setPassword] = useState();
		const handleLogin = e => {
			e.preventDefault();
			setIsLoggedIn(true);
		};
		return (
			<div className="full-screen">
				<div>
					<form onSubmit={handleLogin} className="maxer-form mx-auto">
						<div className="form-group">
							<input
								className="form-control"
								type="username"
								value={username}
								onChange={e => {
									setUsername(e.target.value);
								}}
								required
								placeholder="Choose username"
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								type="password"
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
								required
								placeholder="Choose password"
							/>
						</div>
						<div className="row">
							<div className="mx-auto">
								<button type="submit" className="button-green px-5 mb-2">
									Login
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	};
	const Chart = () => {
		const [studentSet, setStudents] = useState(null);
		const [redirectTo, setRedirectTo] = useState(null);

		useEffect(() => {
			fetch(`/teacher/players/`)
				.then(res => res.json())
				.then(json => {
					setStudents(json);
					console.log(json);
				});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		if (redirectTo) {
			return <Redirect to={`/teachers/student/${redirectTo}`} />;
		}

		return (
			<div className="maxer mx-auto">
				<Bubble
					data={{
						datasets: studentSet
					}}
					options={{
						onClick: function(evt, item) {
							console.log('legend onClick', item);
							const datasetIndex = item[0]._datasetIndex;
							const index = item[0]._index;
							const user = studentSet[datasetIndex].data[index].user;
							setRedirectTo(user);
						},
						tooltips: {
							callbacks: {
								label: (tooltipItem, data) => {
									// data for manipulation
									return data.datasets[tooltipItem.datasetIndex].data[
										tooltipItem.index
									].user;
								}
							}
						},
						scales: {
							yAxes: [
								{
									ticks: {
										display: false
									},
									gridLines: {
										display: false
									}
								}
							],
							xAxes: [
								{
									ticks: {
										display: false
									},
									gridLines: {
										display: false
									}
								}
							]
						}
					}}
				/>
			</div>
		);
	};
	const NavRouter = () => {
		return (
			<div className="navbar">
				<div className="my-3 mx-auto">
					<Link to="/" className="mx-3">
						Home
					</Link>
					<Link to="/students" className="mx-3">
						All students
					</Link>
					<Link to="/newmaterial" className="mx-3">
						Add material
					</Link>
					<Link to="/student/gregor" className="mx-3">
						Single student
					</Link>
				</div>
			</div>
		);
	};

	const NewMaterial = () => {
		const [addedSuccesfully, setAddedSuccesfully] = useState(false);
		const questions = [
			{
				q: 'Text alternatives: how much non-text content has text alternatives',
				a: [
					'AAA: all non-text content has text alternatives',
					'AA: majority of non-text content has text alternatives',
					'A: some non-text content has text alternatives',
					'Non-compliant: no text alternatives are provided'
				]
			},
			{
				q: 'Time-based media: now much of time based media has alternatives',
				a: [
					'AAA: all non-text content has text alternatives',
					'AA: majority of non-text content has text alternatives',
					'A: some non-text content has text alternatives',
					'Non-compliant: no text alternatives are provided'
				]
			},
			{
				q:
					'Adaptability: is content presented in a simplified way that is compatible with a screen reader',
				a: [
					'AAA: all content is presented in a simplified way',
					'AA: majority of content is presented in a simplified way',
					'A: only a small fraction of content is presented in a simplified way',
					'Non-compliant: no content is presented in a simplified way'
				]
			},
			{
				q:
					'Distinguishability: is viewing of web content simplified for the user',
				a: [
					'AAA: foreground and background color can be modified',
					'AA: Sound management mechanism is separated from system for web site navigation',
					'A: colors do not carry information',
					'Non-compliant: content is nod made easily distinguishable for the user'
				]
			},
			{
				q:
					'Keyboard accessibility: is the web content accessible with the keyboard',
				a: [
					'AAA: the whole web site is accessible with the keyboard',
					'AA: most of the web site is accessible with the keyboard',
					'A: main parts of web site are accessible with the keyboard',
					'Non-compliant: web content is completely inaccessible with the keyboard'
				]
			},
			{
				q:
					'Time limitation for interacting with the web content: is interaction with the web site time limited',
				a: [
					'AAA: web site contains no time limited content',
					'AA: user has the possibility to set speed of time limited content for all time limited content',
					'A: user has the possibility to set speed for most of time limited content',
					'Non-compliant: web content requires a lot of time-limited interaction'
				]
			},
			{
				q: 'Navigation: does the website support easy navigation',
				a: [
					'AAA: purpose and location (inside the same web site/outside) is clear from the name of the link',
					'AA: web content supports different ways to navigate to it',
					'A: navigation sequence between web contents is logical and intuitive',
					'Non-compliant: navigation on the web content is difficult and unintuitive'
				]
			},
			{
				q: 'Readability: is the content readable and understandable',
				a: [
					'AAA: the content has support for different levels of reading (simplified versions of content are available)',
					'AA: All parts of web content (if applicable) have marked the language in which they are written',
					'A: It is marked in which language the web site is written',
					'Non-compliant: web content is written in different languages and is written in difficult to understand style'
				]
			},
			{
				q:
					'Predictability: are web sites organized in a logical and predictable way',
				a: [
					'AAA: Bigger changes to the user interface that happen automatically can be disabled',
					'AA: Navigation of the website is consistent across all parts of the website',
					'A: Changes to the user interface do not happen automatically',
					'Non-compliant: interaction of web site with the user is inherently unpredictable'
				]
			},
			{
				q:
					'Help with input: Web site automatically detects and corrects input mistakes from the user',
				a: [
					'AAA: Web site provides context aware help with instructions and recommendations for input',
					'AA: In case the user makes an input mistake web site automatically suggests corrections',
					'A: Web site automatically detects input mistake',
					'Non-compliant: there is no help with user input'
				]
			}
		];
		const topics = [
			'Perception',
			null,
			null,
			null,
			'Operability',
			null,
			null,
			'Understandability',
			null,
			null
		];
		const HandleSubmit = e => {
			e.preventDefault();
			const arr = () => {
				var x = [];
				for (var i = 0; i < 10; i++) {
					x.push(parseInt(e.target[i + 3].value));
				}
				return x;
			};
			fetch(`/api/material/add`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
				},
				body: JSON.stringify({
					name: e.target[0].value,
					dname: e.target[1].value,
					url: e.target[2].value,
					vector: arr()
				})
			})
				.then(res => res.json())
				.then(json => {
					console.log(json);
					setAddedSuccesfully(true);
				});
		};
		return (
			<div className="maxer-800 mx-auto pt-4">
				{addedSuccesfully ? (
					<div className="alert alert-success">Material added succesfully</div>
				) : null}
				<h4>Introduction</h4>
				<p className="maxer-625 py-3">
					Attribute representation serves as the basis for recommendation
					system. Recommender sees the materials just as collection of their
					attributes; it is important for the attribute description to be
					accurate and comprehensive. Attribute description is based on ISO
					40500:2012 standard.
				</p>
				<hr />

				<form onSubmit={HandleSubmit}>
					<div className="form-row pb-4">
						<div className="col">
							<label htmlFor="name">Name of the material</label>
							<input
								id="name"
								type="text"
								className="form-control"
								placeholder="Name"
								required
							/>
						</div>
						<div className="col">
							<label htmlFor="dname">Name of the material (public)</label>

							<input
								id="dname"
								type="text"
								className="form-control"
								placeholder="Display Name"
								required
							/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputUrl">Link of the material</label>
						<input
							type="text"
							className="form-control"
							id="inputUrl"
							placeholder="https://"
							required
						/>
					</div>
					{questions.map((question, index) => (
						<>
							{topics[index] ? (
								<h4 className="py-1 my-0">{topics[index]}</h4>
							) : null}
							<div key={index} label={index}>
								<div className="form-group maxer-625 mt-2" key={index}>
									<label htmlFor="Select1" className="text-dark">
										{question.q}
									</label>
									<select className="form-control" id="Select1">
										{question.a.map((a, index) => (
											<option value={3 - index} key={index}>
												{a}
											</option>
										))}
									</select>
								</div>
							</div>
						</>
					))}
					<div className="pb-5">
						<button type="submit" className="button-green px-3 mb-2 mt-4">
							Add material
						</button>
					</div>
				</form>
			</div>
		);
	};

	const SingleStudent = props => {
		const currentUser = props.match.params.id;
		const [studentInfo, setStudentInfo] = useState(null);
		const [isError, setIsError] = useState(false);

		useEffect(() => {
			fetch(`/teacher/present/${currentUser}`)
				.then(res => res.json())
				.then(json => {
					if (json === 'Error') {
						setIsError(true);
					}
					setStudentInfo(json);
					console.log(json);
				});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		/* 		useEffect(() => {
			const interval = setInterval(() => {
				fetch(`/teacher/present/${currentUser}`)
					.then(res => res.json())
					.then(json => {
						setStudentInfo(json);
						console.log(json);
					});
			}, 1000);
			return () => clearInterval(interval);
		}, []); */

		const SpiderChart = () => {
			const summary = studentInfo.annotated_summary;
			var data = [];
			summary[1].map(item => {
				data.push(item.value);
			});
			console.log(data);
			return (
				<div className="fadeInDown">
					<Radar
						data={{
							labels: summary[0],
							datasets: [
								{
									label: '',
									data: data,
									backgroundColor: '#7EB7DF75'
								}
							]
						}}
						options={{
							legend: {
								display: false
							},
							scale: {
								ticks: {
									suggestedMin: 0
								}
							}
						}}
					/>
				</div>
			);
		};

		const GaussianDistro = () => {
			const range = 100;

			const val = 8.3 * 3;
			const dx = (val * 2) / range;
			var xrange = [-val];
			for (let i = 0; i < range; i++) {
				xrange.push(xrange[xrange.length - 1] + dx);
			}
			const normdist = (xarr, mu, sig) => {
				var yarr = [];
				xarr.map(x => {
					yarr.push(
						(1 / (sig * (2 * 3.14) ** 2)) *
							2.81 ** ((-1 / 2) * (x - mu / sig) ** 2)
					);
				});
				return yarr;
			};

			const summary = studentInfo.annotated_summary;

			console.log(summary);
			const colors = ['#7EB7DF75', '#EA9AAD85', '#7EB27B75'];
			return (
				/* ! display poiting line at 0 */
				<Line
					data={{
						labels: xrange,
						datasets: summary[1].map((el, index) => {
							return {
								label: summary[0][index],
								data: normdist(xrange, el.mu, el.sigma),
								backgroundColor: colors[index]
							};
						}),
						lineAtIndex: 0
					}}
					options={{
						legend: {
							display: true
						},
						scales: {
							xAxes: [
								{
									display: false,

									gridLines: {
										color: 'rgba(0, 0, 0, 0)'
									}
								}
							],
							yAxes: [
								{
									display: false,
									gridLines: {
										color: 'rgba(0, 0, 0, 0)'
									}
								}
							]
						},
						elements: {
							point: {
								radius: 0
							}
						}
					}}
				/>
			);
		};

		const StudentVisits = object => (
			<div className="card">
				<ul className="list-group list-group-flush">
					<li
						className={'list-group-item'}
						data-toggle="tooltip"
						data-placement="top"
						title="New to old"
					>
						User visit history
					</li>
					{object.visits.map((visit, index) => (
						<li key={index} className={'list-group-item'}>
							<a
								className={'text-' + (visit.engagement ? 'success' : 'danger')}
								href={visit.material_id__url}
								target="blank"
								data-toggle="tooltip"
								data-placement="top"
								title={visit.timeOfVisit}
							>
								{visit.material_id__name}
							</a>
						</li>
					))}
				</ul>
			</div>
		);

		if (isError) {
			return (
				<div className="maxer-1000 mx-auto">User doesn't have any data</div>
			);
		}

		return (
			<div className="maxer-1000 mx-auto">
				{studentInfo ? (
					<div className="row">
						<h4 className="mx-auto mt-3 mb-5">
							Current student: <b>{studentInfo.user}</b>
						</h4>
						<div className="col-9">
							<SpiderChart />
							<GaussianDistro />
						</div>
						<div className="col">
							<StudentVisits visits={studentInfo.visits} />
						</div>
					</div>
				) : (
					<div className="d-flex justify-content-center">
						<div className="spinner-grow" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<div>
			{isLoggedIn ? (
				<>
					<Router basename="teachers">
						<NavRouter />
						<Switch>
							<Route exact path="/" component={Header} />

							<Route path="/students" component={Chart} />

							<Route path="/newmaterial" component={NewMaterial} />
							<Route path="/student/:id" component={SingleStudent} />
						</Switch>
					</Router>
				</>
			) : (
				<div className="h-100 row align-items-center">
					<div className="col pt-35p">
						<Login />
					</div>
				</div>
			)}
		</div>
	);
};

export default Teachers;
