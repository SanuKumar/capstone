import React from 'react'
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Container } from 'react-bootstrap';

const ChartPage = ({ products }) => {
	const data = {
		labels: products.map((product) => product.title),
		datasets: [
			{
				label: "Price",
				data: products.map((product) => product.quantity),
				fill: true,
				backgroundColor: "rgb(255, 99, 132)"
			},
			{
				label: "Rating",
				data: products.map((product) => product.rating),
				fill: false,
				backgroundColor: "rgb(54, 162, 235)"
			}
		]
	};
	return (
		<>
			<div style={{ textAlign: "center", marginTop: "-4rem" }}><h2>Top Rated Product</h2></div>
			<Container>
				<Bar data={data} />
			</Container>
		</>
	)
}

export default ChartPage