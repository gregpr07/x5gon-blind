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
import '../css/teacher.css';

const csrftoken = getCookie('csrftoken');

defaults.global.animation = false;

const Header = () => {
	return (
		<header className="bg-white" style={{ zIndex: '-100' }}>
			<div className="mx-auto maxer contents">
				<div className="row no-gutters my-auto mt-md-0">
					<div className="col-md-12 col-lg-6 my-auto">
						<div className="main-content pl-1 ml-4">
							<h1 className="text-black text-main-header">Understand</h1>
							<h4 className="body-2">your students with</h4>
							<h1 className="text-black text-main-header">
								<b className="d-block">PYTHIA</b>
							</h1>
							<p className="mt-3 pt-3 text-black w-100 body-2 pb-2 pr-4 pr-md-3">
								Understand your students' accessibility preferences and monitor
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
const Footer = () => {
	return (
		<div className="navbar navbar-dark bg-dark">
			<div className="mx-auto p-64">
				<Link to="/" className="mx-3 text-green">
					Home
				</Link>
				<a
					href="/static/Non_profesional_background.pdf"
					className="mx-3 text-green"
				>
					Teacher guide
				</a>
				<a href="/static/Technical_background.pdf" className="mx-3 text-green">
					Technical documentation
				</a>
			</div>
		</div>
	);
};

const Teachers = props => {
	const [authTokens, setAuthTokens] = useState(localStorage.getItem('user'));
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const [selectedClassroom, setSelectedClassroom] = useState('');
	const [classrooms, setClassrooms] = useState([]);
	const [username, setUsername] = useState();

	//? functions
	const defaultCheck = () => {
		// fetch to get if user logged in, available classes and such
		if (authTokens) {
			fetch(`/teacher/default/`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
				}
			})
				.then(res => {
					if (res.status !== 200) {
						throw 'error';
					}
					return res.json();
				})
				.then(json => {
					console.log(json);
					setIsLoggedIn(json['is_staff']); //json
					setClassrooms(json.classesCreated);
					setUsername(json.username);
				})
				.catch(rejection => {
					console.log(rejection);
					setTokens();
				});
		}
	};
	const setTokens = data => {
		if (data) {
			localStorage.setItem('user', data);
			//setAuthTokens(data);
			window.location.reload();
		} else {
			localStorage.removeItem('user');
			setAuthTokens(data);
		}
	};

	useEffect(() => {
		defaultCheck();
	}, []);

	//? components
	const ClassSelector = () => {
		const handleClass = name => {
			if (name === selectedClassroom) {
				//pass
			} else {
				setSelectedClassroom(name);
			}
		};
		return (
			<div className="dropdown">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					{selectedClassroom ? selectedClassroom : 'Select classroom'}
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{classrooms.map(single => (
						<div
							className={
								'dropdown-item ' +
								(selectedClassroom === single ? 'active' : '')
							}
							onClick={() => handleClass(single)}
							key={single}
						>
							{single}
						</div>
					))}
				</div>
			</div>
		);
	};

	const NavRouter = () => {
		const routes = [
			{
				link: '/',
				name: 'Home'
			},
			{
				link: '/newmaterial',
				name: 'Add material'
			},
			/* 			{
				link: '/student/name',
				name: 'Single student'
			}, */
			/* 			{
				link: '/students',
				name: 'All students'
			}, */
			{
				link: '/classrooms',
				name: 'My Classrooms'
			}
		];
		return (
			<div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="navbar-brand">Pythia</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="my-3 mx-auto text-white teacher-nav collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav mr-auto">
						{routes.map(route => (
							<li className="nav-item" key={route.name}>
								<Link to={route.link} className="nav-link">
									{route.name}
								</Link>
							</li>
						))}
					</ul>
					<ul className="navbar-nav ml-auto">
						<a className="nav-link pl-md-4" href={'/logout'}>
							Logout{username ? ' (' + username + ')' : ''}
						</a>
					</ul>
				</div>
			</div>
		);
	};
	const NewMaterial = () => {
		const [addedSuccesfully, setAddedSuccesfully] = useState(false);
		const [failed, setFailed] = useState(false);
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
					vector: arr(),
					add_to: selectedClassroom
				})
			})
				.then(res => res.json())
				.then(json => {
					console.log(json);
					setAddedSuccesfully(true);
					setFailed(false);
				})
				.catch(err => {
					setFailed(true);
					setAddedSuccesfully(false);
				});
			window.scrollTo(0, 0);
		};
		return (
			<div className="maxer-800 mx-auto px-3 px-lg-0">
				{addedSuccesfully ? (
					<div className="alert alert-success">Material added succesfully</div>
				) : null}
				{failed ? (
					<div className="alert alert-danger">Material not added</div>
				) : null}
				<h4>Introduction</h4>
				<p className="maxer-625 py-3">
					Attribute representation serves as the basis for recommendation
					system. Recommender sees the materials just as collection of their
					attributes; it is important for the attribute description to be
					accurate and comprehensive. Attribute description is based on ISO
					40500:2012 standard.
				</p>
				{selectedClassroom ? (
					<p>
						Material will be added to <b>{selectedClassroom}</b>
					</p>
				) : (
					<p className="text-primary">
						Select classroom to add new material to it automatically
					</p>
				)}
				<ClassSelector />
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
									backgroundColor: '#009CCC75'
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
			const range = 200;

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
			const colors = ['#4877FF50', '#17285D45', '#00AD5780'];
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

		const StudentVisits = object => {
			return (
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
									className={
										'text-' + (visit.engagement ? 'success' : 'danger')
									}
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
		};

		if (isError) {
			return (
				<div className="maxer-1000 mx-auto">User doesn't have any data</div>
			);
		}

		return (
			<div className="maxer-1000 mx-auto">
				{studentInfo ? (
					<div className="row">
						<h4 className="mx-auto mt-1 mb-4">
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
	const Classrooms = () => {
		const [detclassrooms, setDetclassrooms] = useState([]);
		useEffect(() => {
			console.log(detclassrooms);
			fetch(`/teacher/myclassrooms/`)
				.then(res => res.json())
				.then(json => {
					console.log(json);
					setDetclassrooms(json);
				});
		}, []);

		return (
			<div className="maxer mx-auto px-5">
				<h3>My classrooms</h3>

				<div className="mt-4">
					{detclassrooms.map(classs => (
						<Link
							to={'/classrooms/' + classs.name}
							className="card card-my-classrooms p-3 my-3 maxer-500"
							key={classs.name}
							onClick={() => setSelectedClassroom(classs.name)}
						>
							<div className="row">
								<div className="col">
									<h4 className="card-title text-dark">{classs.name}</h4>
									<h6 className="card-subtitle text-muted">Created by you</h6>
								</div>
								<div className="col">
									<p className="text-muted p-0 m-0">
										Materials: {classs.materials}
									</p>
									<p className="text-muted p-0 m-0">
										Students: {classs.students}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className="pt-3">
					<Link to="/create-classroom">Create a new classroom</Link>
				</div>
			</div>
		);
	};
	const Classroom = props => {
		const title = props.match.params.name;
		const [materials, setMaterials] = useState([]);
		useEffect(() => {
			fetch(`/teacher/classroom/${title}/`)
				.then(res => res.json())
				.then(json => setMaterials(json.materials));
		}, []);
		const Materials = mats => {
			return (
				<div>
					<h5>Materials</h5>
					<ul class="list-group maxer-500">
						{mats.map(mat => (
							<li class="list-group-item">{mat}</li>
						))}
					</ul>
				</div>
			);
		};
		const AllStudents = props => {
			const [studentSet, setStudents] = useState([]);
			const [redirectTo, setRedirectTo] = useState(null);
			const [isError, setIsError] = useState(false);
			const classtitle = props.title;

			// to only render once

			useEffect(() => {
				if (classtitle) {
					fetch(`/teacher/players/${classtitle}/`)
						.then(res => res.json())
						.then(json => {
							setStudents(json);
							console.log(json);
						})
						.catch(err => {
							console.log(err);
							setIsError(true);
						});
				}
				// eslint-disable-next-line react-hooks/exhaustive-deps
			}, []);

			const Chart = () => {
				return (
					<Bubble
						data={{
							datasets: studentSet
						}}
						options={{
							onClick: function(evt, item) {
								try {
									console.log('legend onClick', item);
									const datasetIndex = item[0]._datasetIndex;
									const index = item[0]._index;
									const user = studentSet[datasetIndex].data[index].user;
									setRedirectTo(user);
								} catch {
									console.log('Change filter');
								}
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
				);
			};
			const ListAll = () => {
				return (
					<div className="row bg-light p-md-5 p-2 mt-5">
						{studentSet.map((set, index) => (
							<div className="col" key={index}>
								{set.label}
								<ul className="list-group my-3">
									{set.data.map((person, indexx) => (
										<li className="list-group-item" key={indexx}>
											<Link to={'/students/' + person.user}>{person.user}</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				);
			};

			return (
				<div className="maxer mx-auto py-4 px-5">
					{redirectTo ? <Redirect to={`/students/${redirectTo}`} /> : null}
					{isError ? (
						<div className="alert alert-warning">
							Visualation need at least two students with data
						</div>
					) : null}

					<Chart />
					<ListAll />
				</div>
			);
		};
		return (
			<div className="maxer mx-auto px-md-5 text-dark">
				<h4 className="py-3">Classroom: {title}</h4>
				<AllStudents title={title} />
				<div className="p-64 px-4">{Materials(materials)}</div>
				<div className="mt-4">
					<p>Danger zone</p>
					<Link
						to={'/edit-classroom/' + title}
						className="btn btn-warning mr-3"
					>
						Edit class details
					</Link>
					<button className="btn btn-danger">Delete classroom</button>
				</div>
			</div>
		);
	};
	const CreateClassroom = () => {
		const [classroom, setClassroom] = useState();
		const [description, setDescription] = useState();
		const [students, setStudents] = useState([]);
		const [materials, setMaterials] = useState([]);

		const [selStudents, setSelStudents] = useState([]);
		const [selMaterials, setSelMaterials] = useState([]);

		const [addedSuccesfully, setAddedSuccesfully] = useState(false);
		const [failed, setFailed] = useState(false);

		const handleResponse = json => {
			setStudents(json.students);
			setMaterials(json.materials);
		};

		const handleClick = (item, state, setstate) => {
			if (state.includes(item)) {
				setstate(state.filter(i => i !== item));
			} else {
				setstate([...state, item]);
			}
			console.log(selMaterials);
		};

		const handleSubmit = e => {
			e.preventDefault();
			fetch(`/teacher/create-classroom/`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
				},
				body: JSON.stringify({
					name: classroom,
					description: description,
					materials: selMaterials,
					students: selStudents
				})
			})
				.then(res => res.json())
				.then(json => {
					console.log(json);
					setAddedSuccesfully(true);
					setFailed(false);
				})
				.catch(err => {
					setFailed(true);
					setAddedSuccesfully(false);
				});
			window.scrollTo(0, 0);
		};

		useEffect(() => {
			fetch(`/teacher/all_stuff/`)
				.then(res => res.json())
				.then(json => {
					console.log(json);
					handleResponse(json);
				});
		}, []);

		return (
			<div className="maxer mx-auto px-md-5 text-dark">
				{addedSuccesfully ? (
					<div className="alert alert-success">Classroom added succesfully</div>
				) : null}
				{failed ? (
					<div className="alert alert-danger">Classroom not added</div>
				) : null}
				<h4 className="py-3">Classroom creator</h4>
				<div className="px-4 maxer-800">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="inputTitle">Title</label>
							<input
								type="text"
								className="form-control"
								id="inputTitle"
								placeholder="Title of classroom"
								required
								value={classroom}
								onChange={e => setClassroom(e.target.value)}
								maxLength="100"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputDescription">Description</label>
							<input
								type="text"
								className="form-control"
								id="inputDescription"
								placeholder="Description of classroom"
								required
								value={description}
								onChange={e => setDescription(e.target.value)}
								maxLength="200"
							/>
						</div>
						<div className="row selector-row">
							{/* materials */}
							<div className="form-group col">
								<label htmlFor="materials">Materials</label>
								<ul class="list-group" id="materials">
									{materials.map(mat => (
										<li
											key={mat}
											class={
												'list-group-item list-group-item-action ' +
												(selMaterials.includes(mat) ? 'active' : '')
											}
											onClick={() =>
												handleClick(mat, selMaterials, setSelMaterials)
											}
										>
											{mat}
										</li>
									))}
								</ul>
							</div>
							{/* materials */}
							<div className="form-group col">
								<label htmlFor="materials">Students</label>
								<ul class="list-group" id="materials">
									{students.map(mat => (
										<li
											key={mat}
											class={
												'list-group-item list-group-item-action ' +
												(selStudents.includes(mat) ? 'active' : '')
											}
											onClick={() =>
												handleClick(mat, selStudents, setSelStudents)
											}
										>
											{mat}
										</li>
									))}
								</ul>
							</div>
						</div>
						<button className="btn btn-primary" type="submit">
							Create classroom
						</button>
					</form>
				</div>
			</div>
		);
	};
	const EditClassroom = props => {
		const title = props.match.params.name;
		const [classroom, setClassroom] = useState();
		const [description, setDescription] = useState();
		const [students, setStudents] = useState([]);
		const [materials, setMaterials] = useState([]);

		const [selStudents, setSelStudents] = useState([]);
		const [selMaterials, setSelMaterials] = useState([]);

		const [addedSuccesfully, setAddedSuccesfully] = useState(false);
		const [failed, setFailed] = useState(false);

		const handleResponse = json => {
			setStudents(json.students);
			setMaterials(json.materials);
			setSelMaterials(json.classmaterials);
			setSelStudents(json.classstudents);
			setClassroom(json.title);
			setDescription(json.description);
		};

		const handleClick = (item, state, setstate) => {
			if (state.includes(item)) {
				setstate(state.filter(i => i !== item));
			} else {
				setstate([...state, item]);
			}
			console.log(selMaterials);
		};

		const handleSubmit = e => {
			e.preventDefault();
			fetch(`/teacher/update-classroom/`, {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-CSRFToken': csrftoken
				},
				body: JSON.stringify({
					currentname: title,
					name: classroom,
					description: description,
					materials: selMaterials,
					students: selStudents
				})
			})
				.then(res => res.json())
				.then(json => {
					console.log(json);
					setAddedSuccesfully(true);
					setFailed(false);
				})
				.catch(err => {
					setFailed(true);
					setAddedSuccesfully(false);
				});
			window.scrollTo(0, 0);
		};

		useEffect(() => {
			fetch(`/teacher/classroominfo/${title}/`)
				.then(res => res.json())
				.then(json => {
					console.log(json);
					handleResponse(json);
				});
		}, []);

		return (
			<div className="maxer mx-auto px-md-5 text-dark">
				{addedSuccesfully ? (
					<div className="alert alert-success">
						Classroom changed succesfully
					</div>
				) : null}
				{failed ? (
					<div className="alert alert-danger">Classroom not added</div>
				) : null}
				<h4 className="py-3">Classroom editor ({title})</h4>
				<div className="px-4 maxer-800">
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="inputTitle">Title</label>
							<input
								type="text"
								className="form-control"
								id="inputTitle"
								placeholder="Title of classroom"
								required
								value={classroom}
								onChange={e => setClassroom(e.target.value)}
								maxLength="100"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputDescription">Description</label>
							<input
								type="text"
								className="form-control"
								id="inputDescription"
								placeholder="Description of classroom"
								required
								value={description}
								onChange={e => setDescription(e.target.value)}
								maxLength="200"
							/>
						</div>
						<div className="row selector-row">
							{/* materials */}
							<div className="form-group col">
								<label htmlFor="materials">Materials</label>
								<ul class="list-group" id="materials">
									{materials.map(mat => (
										<li
											key={mat}
											class={
												'list-group-item list-group-item-action ' +
												(selMaterials.includes(mat) ? 'active' : '')
											}
											onClick={() =>
												handleClick(mat, selMaterials, setSelMaterials)
											}
										>
											{mat}
										</li>
									))}
								</ul>
							</div>
							{/* materials */}
							<div className="form-group col">
								<label htmlFor="materials">Students</label>
								<ul class="list-group" id="materials">
									{students.map(mat => (
										<li
											key={mat}
											class={
												'list-group-item list-group-item-action ' +
												(selStudents.includes(mat) ? 'active' : '')
											}
											onClick={() =>
												handleClick(mat, selStudents, setSelStudents)
											}
										>
											{mat}
										</li>
									))}
								</ul>
							</div>
						</div>
						<button className="btn btn-warning mr-3" type="submit">
							Update classroom
						</button>
						<Link
							to={'/classrooms/' + title}
							className="btn btn-primary"
							type="submit"
						>
							Cancel
						</Link>
					</form>
				</div>
			</div>
		);
	};
	return (
		<div>
			<Router basename="teachers">
				{!authTokens || !isLoggedIn ? (window.location = '/login') : null}
				<NavRouter />
				<div className="p-128">
					<Switch>
						<Route exact path="/" component={Header} />
						<Route exact path="/newmaterial" component={NewMaterial} />
						<Route exact path="/students/:id" component={SingleStudent} />
						<Route exact path="/classrooms" component={Classrooms} />
						<Route exact path="/create-classroom" component={CreateClassroom} />
						<Route
							exact
							path="/edit-classroom/:name"
							component={EditClassroom}
						/>
						<Route exact path="/classrooms/:name" component={Classroom} />
					</Switch>
				</div>
				<Footer />
			</Router>
		</div>
	);
};

export default Teachers;
