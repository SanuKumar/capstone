import React from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const ProductList = ({ products }) => {
	return (
		<Container>
			<Row className="justify-content-md-center">
				{products.length ? products.map((p) => {
					return (
						<Col xs={12} sm={6} md={6} lg={3} >
							<Card key={p.id} style={{ margin: '0.2rem' }}>
								<Card.Img variant="top" src={p.image} height={250} width={250} style={{ padding: "1rem" }} />
								<Card.Body>
									<Card.Title className='card-text-formatter'>{p.title}</Card.Title>
									<Card.Text className='card-text-formatter'>
										{p.description}
									</Card.Text>
									<div style={{ display: "flex", justifyContent: "space-between" }}>
										<Button variant="primary">Edit</Button>
										<Button variant="danger">Delete</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
					)
				}) : <h5>No Product Found</h5>}
			</Row>
		</Container >
	)
}

export default ProductList