import React from 'react'
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { Container, Row, Col } from 'react-bootstrap';

const ChartPage = ({ products }) => {
	let topProducts = products && products.filter((p) => {
		if (p.rating > 3)
			return p
	})
	const data = {
		labels: topProducts && topProducts.map((product) => product.name),
		datasets: [
			{
				label: "Price",
				data: topProducts && topProducts.map((product) => product.quantity),
				fill: true,
				backgroundColor: "rgb(255, 99, 132)"
			},
			{
				label: "Rating",
				data: topProducts && topProducts.map((product) => product.rating),
				fill: false,
				backgroundColor: "rgb(54, 162, 235)"
			}
		]
	};
	return (
		<>
			<div style={{ textAlign: "center", marginTop: "-4rem" }}><h2>Top Rated Product Above 3 Stars</h2></div>
			<Container>
				<Row>
					<Col xs={12} sm={12} md={8} lg={10}>
						<Bar data={data} />
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</>
	)
}

export default ChartPage