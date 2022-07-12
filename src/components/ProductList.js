import React from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ProductList = ({ products }) => {
  let history = useHistory();
  return (
    <Container style={{ marginTop: "10rem" }}>
      <Row className="justify-content-md-center">
        {products.length ? products.map((p) => {
          return (
            <Col xs={12} sm={6} md={6} lg={3} key={p.id} onClick={() => history.push(`/product/${p.id}`)} >
              <Card key={p.id} style={{ margin: '0.2rem' }}>
                <Card.Img variant="top" src={p.thumbnail} height={250} width={250} style={{ padding: "0.3rem" }} />
                <Card.Body>
                  <Card.Title className='card-text-formatter'>{p.title}</Card.Title>
                  <Card.Text className='card-text-formatter'>
                    {p.description}
                  </Card.Text>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <Button variant="primary" onClick={() => history.push({
                      pathname: `/product-edit/${p.id}`,
                      state: { edit: true }
                    })}>Edit</Button>
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