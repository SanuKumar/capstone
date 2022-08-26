import React from 'react'
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap'

const About = () => {

  const imageList = [
    "https://www.smartertech.id/wp-content/uploads/2021/08/keeppack-1.png",
    "https://static.vecteezy.com/system/resources/previews/005/441/345/non_2x/inventory-management-with-goods-demand-and-stock-supply-tiny-person-concept-vector.jpg",
    "https://miro.medium.com/max/1000/1*ka3E4I_7AFezzqPH0K3Ncw.jpeg",
    "https://safsms.com/blog/wp-content/uploads/2017/06/what-is-inventory-management.png"
  ]

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "-4rem 0 2rem 0" }}>About Product Inventory</h2>
      <Container>
        <hr />
        <Row>
          <Col xs={12} sm={6}>
            <Card>
              <Carousel variant="dark" indicators controls>
                {imageList && imageList.map((img) => (
                  <Carousel.Item interval={1000} key={img}>
                    <Card.Img variant="top" height={400} width={200} src={img} alt="about" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card></Col>
          <Col xs={12} sm={6}>
            <div style={{ fontSize: "25px", textAlign: "justify" }}>
              Product inventory is used to record information about the amount of available goods 
              and products our company offers. Start by entering a product's name, inventory ID 
              number, description, manufacture, category, location, price and quantity.
            </div>
            <hr />
            <h4>Features Available</h4>
            <ul>
              <li>Add, Edit and Delete Product available for register user's</li>
              <li>Search and Filter products</li>
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