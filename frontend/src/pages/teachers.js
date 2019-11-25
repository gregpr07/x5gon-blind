import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { Bubble } from 'react-chartjs-2';

const Teachers = props => {
	const [players, setPlayers] = useState(null);

	useEffect(() => {
		fetch(`${props.requestLink}/teachers/players`)
			.then(res => res.json())
			.then(json => {
				setPlayers(json);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const Chart = () => {
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

	return (
		<Layout>
			<div>All users</div>
			<Chart />
		</Layout>
	);
};

export default Teachers;
