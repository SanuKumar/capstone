import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'

const About = () => {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "-4rem 0 2rem 0" }}>About Product Inventory</h2>
      <Container>
        <Row>
          <Col xs={12} sm={6}><Card>
            <Card.Img variant="top" height={400} width={200} src="https://static.vecteezy.com/system/resources/previews/005/441/345/non_2x/inventory-management-with-goods-demand-and-stock-supply-tiny-person-concept-vector.jpg" alt="about" />
          </Card></Col>
          <Col xs={12} sm={6}>
            <div style={{ fontSize: "25px", textAlign: "justify" }}>Product Inventory means all inventory of the Seller to the extent used or held for use primarily
              in the Business, including all finished goods, sub-assemblies, works in process
              and raw materials (if any), as of the Closing Date.
            </div>
            <hr />
            <h4>Features Available</h4>
            <ul>
              <li>Add, Edit and Delete Product</li>
              <li>User's Registration</li>
              <li>Top Product Rated Chart</li>
            </ul>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default About