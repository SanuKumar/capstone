import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import axios from "axios"
import { Carousel, Card, Container, Row, Col, Button } from 'react-bootstrap';
import Loader from "../components/Loader"

const Product = () => {
  let history = useHistory();
  const location = useLocation();
  const { id } = useParams()
  const [productData, setProductData] = useState({})
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (location.state?.edit === true) {

    }
  }, [location.state?.edit])

  console.log("location.state.name", location.state?.edit)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:3001/products/${id}`)
      setLoading(false)
      console.log("productData", data)
      setProductData(data)
      setFormData(data)
    }
    fetchData();
  }, [id]);

  console.log(formData, "formData")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container style={{ marginTop: "10rem" }}>
      <Button onClick={() => history.push("/")}>Go Home</Button>
      <Row>
        {loading ? <Loader /> : <>
          <Col>
            <Card>
              <Carousel variant="dark" indicators controls>
                {productData.images && productData.images.map((p) => (
                  <Carousel.Item key={p}>
                    <img
                      className="d-block w-100"
                      src={p}
                      alt="First slide"
                      height={400}
                      width={250}
                    />
                    <Carousel.Caption>
                      <h4 style={{ color: "Yellow" }}>{productData.brand}</h4>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body>
                <Card.Title>{productData.title}</Card.Title>
                <Card.Text>
                  {productData.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Container>
              <form>
                <Row>
                  <Col><strong>Brand: </strong></Col>
                  <Col><input type="text" name="brand" value={formData.brand} onChange={handleChange} /></Col>
                </Row>
                <Row>
                  <Col><strong>Category:</strong></Col>
                  <Col><input type="text" name="category" value={formData.category} onChange={handleChange} /></Col>
                </Row>
                <Row>
                  <Col><strong>Title: </strong></Col>
                  <Col><input type="text" name="title" value={formData.title} onChange={handleChange} /></Col>
                </Row>
                <Row>
                  <Col><strong>Description: </strong></Col>
                  <Col>{formData.description} </Col>
                </Row>
                <Row>
                  <Col><strong>Rating: </strong></Col>
                  <Col>{formData.rating}</Col>
                </Row>
                <Row>
                  <Col><strong>₹: </strong></Col>
                  <Col><input type="number" name="price" value={formData.price} onChange={handleChange} /></Col>
                </Row>
                <div style={{ marginTop: "2rem" }}>
                  <Button type="submit" >Update Product</Button>
                </div>
              </form>
            </Container>
          </Col>
        </>}
      </Row>
    </Container>
  )
}

export default Product