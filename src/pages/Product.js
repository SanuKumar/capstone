import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import axios from "axios"
import { Carousel, Card, Container, Row, Col, Button } from 'react-bootstrap';
import Loader from "../components/Loader"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Product = ({ fetchProductCallBack }) => {
  let history = useHistory();
  const location = useLocation();
  const { id } = useParams()
  const [productData, setProductData] = useState({})
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:3002/products/${id}`)
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

  const timeout = (time) => {
    return new Promise(res => setTimeout(res, time));
  }

  const handleValidation = () => {
    if (!formData.title || !formData.manufacture || !formData.price || !formData.quantity) {
      return false
    }
    return true
  }

  const handleUpdateProduct = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      formData.thumbnail ? formData.images[0] = formData.thumbnail : formData.images[0] = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
      let res = await axios.patch(`http://localhost:3002/products/${formData.id}`, formData)
      if (res.statusText == 'OK') {
        toast.success("Product updated successfully!!", {
          position: toast.POSITION.TOP_CENTER
        });
        await timeout(1000);
        fetchProductCallBack()
        history.push('/')
      } else {
        toast.error("Error while updating product", {
          position: toast.POSITION.TOP_CENTER
        })
      }
    } else {
      toast.error("Please enter product details to add", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div style={{ float: "right", margin: "-5rem 1rem" }}>
        <Button onClick={() => history.push("/")}>Go Home</Button>
      </div>
      {loading ?
        <Loader />
        :
        <Container>
          <Row>
            <Col xs={12} sm={6} md={6} lg={5}>
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
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=";
                        }}
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
            <Col xs={12} sm={6} md={6} lg={5}>
              <Container>
                <form>
                  <Row>
                    <Col xs={12} sm={6}><strong>Manufacture: </strong></Col>
                    <Col xs={12} sm={6}>
                      {location.state?.edit ?
                        <input type="text" name="manufacture" value={formData.manufacture} onChange={handleChange} /> :
                        formData.manufacture}
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
                  <Row>
                    <Col xs={12} sm={6}><strong>Price ₹: </strong></Col>
                    <Col xs={12} sm={6}>
                      {location.state?.edit ?
                        <input type="number" name="price" value={formData.price} onChange={handleChange} /> :
                        formData.price}
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={12} sm={6}><strong>Quantity:</strong></Col>
                    <Col xs={12} sm={6}>
                      {location.state?.edit ?
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} /> :
                        formData.quantity}
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={12} sm={6}><strong>Rating:</strong></Col>
                    <Col xs={12} sm={6}>
                      {location.state?.edit ?
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} /> :
                        formData.rating}
                    </Col>
                  </Row>
                  <br />
                  {location.state?.edit &&
                    <Row>
                      <Col xs={12} sm={6}><strong>Image URL</strong></Col>
                      <Col xs={12} sm={6}>
                        <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />

                      </Col>
                    </Row>
                  }
                  <br />
                  {location.state?.edit &&
                    <div style={{ marginTop: "2rem" }}>
                      <Button type="submit" onClick={handleUpdateProduct}>Update Product</Button>
                    </div>
                  }
                </form>
              </Container>
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default Product