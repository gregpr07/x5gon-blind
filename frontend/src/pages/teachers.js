import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { Bubble } from 'react-chartjs-2';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const Teachers = props => {
	const Chart = () => {
		const [players, setPlayers] = useState(null);
		useEffect(() => {
			fetch(`${props.requestLink}/teachers/players`)
				.then(res => res.json())
				.then(json => {
					setPlayers(json);
				});
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);
		return (
			<Bubble
				data={{
					datasets: [
						{
							label: 'Players',
							data: players,
							backgroundColor: 'red',
							borderColor: 'rgb(255, 99, 132)'
						}
					]
				}}
				options={{
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
	const NavRouter = () => {
		return (
			<div className="mb-5">
				<Link to="/" className="mx-3">
					Home
				</Link>
				<Link to="/players" className="mx-3">
					All players
				</Link>
				<Link to="/newmaterial" className="mx-3">
					Add material
				</Link>
			</div>
		);
	};

	const NewMaterial = () => {
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
		const HandleSubmit = e => {
			e.preventDefault();
			const arr = () => {
				var x = [];
				for (var i = 0; i < 10; i++) {
					x.push(parseInt(e.target[i + 3].value));
				}
				return x;
			};
			fetch(`${props.requestLink}/api/material/add`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: e.target[0].value,
					dname: e.target[1].value,
					url: e.target[2].value,
					vector: arr()
				})
			})
				.then(res => res.json())
				.then(json => console.log(json));
		};
		return (
			<div className="maxer-800 mx-auto">
				<form onSubmit={HandleSubmit}>
					<div className="form-row">
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Name"
								required
							/>
						</div>
						<div className="col">
							<input
								type="text"
								className="form-control"
								placeholder="Display Name"
								required
							/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="inputUrl">Url</label>
						<input
							type="text"
							className="form-control"
							id="inputUrl"
							placeholder="https://"
							required
						/>
					</div>
					{questions.map((question, index) => (
						<div key={index} label={index}>
							<div className="form-group maxer-540 mx-auto" key={index}>
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
					))}
					<button type="submit" className="button-green px-5 mb-2 mt-4">
						Sign Up
					</button>
				</form>
			</div>
		);
	};

	return (
		<Layout>
			<Router basename="teachers">
				<NavRouter />
				<Route exact path="/">
					Teacher menu
				</Route>
				<Route path="/players">
					<div>All users</div>
					<Chart />
				</Route>
				<Route path="/newmaterial">
					<NewMaterial />
				</Route>
			</Router>
		</Layout>
	);
};

export default Teachers;
