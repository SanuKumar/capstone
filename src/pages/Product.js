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
    const fetchData = async () => {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:3001/products/${id}`)
      setLoading(false)
      setProductData(data)
      setFormData(data)
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <>
      <div style={{ float: "right", margin: "-5rem 1rem" }}>
        <Button onClick={() => history.push("/")}>Go Home</Button>
      </div>
      <Container>
        <Row>
          {loading ?
            <Loader />
            : <>
              <Col xs={12} sm={6}>
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
              <Col xs={12} sm={6}>
                <Container>
                  <form>
                    <Row>
                      <Col xs={12} sm={6}><strong>Brand: </strong></Col>
                      <Col xs={12} sm={6}>
                        {location.state?.edit ?
                          <input type="text" name="brand" value={formData.brand} onChange={handleChange} /> :
                          formData.brand}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={12} sm={6}><strong>Category:</strong></Col>
                      <Col xs={12} sm={6}>
                        {location.state?.edit ?
                          <input type="text" name="category" value={formData.category} onChange={handleChange} /> :
                          formData.category}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={12} sm={6}><strong>Title: </strong></Col>
                      <Col xs={12} sm={6}>
                        {location.state?.edit ?
                          <input type="text" name="title" value={formData.title} onChange={handleChange} /> :
                          formData.title}
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={12} sm={6}><strong>Description: </strong></Col>
                      <Col xs={12} sm={6}>
                        {location.state?.edit ?
                          <textarea type="text" name="description" value={formData.description} onChange={handleChange} /> :
                          formData.description}
                      </Col>
                    </Row>
                    <br />
                    {!location.state?.edit &&
                      <Row>
                        <Col xs={12} sm={6}><strong>Rating: </strong></Col>
                        <Col xs={12} sm={6}>{formData.rating}</Col>
                      </Row>
                    }
                    <br />
                    <Row>
                      <Col xs={12} sm={6}><strong>₹: </strong></Col>
                      <Col xs={12} sm={6}>
                        {location.state?.edit ?
                          <input type="number" name="price" value={formData.price} onChange={handleChange} /> :
                          formData.price}
                      </Col>
                    </Row>
                    <br />
                    {location.state?.edit &&
                      <div style={{ marginTop: "2rem" }}>
                        <Button type="submit" onClick={handleSubmit}>Update Product</Button>
                      </div>
                    }
                  </form>
                </Container>
              </Col>
            </>}
        </Row>
      </Container>
    </>
  )
}

export default Product