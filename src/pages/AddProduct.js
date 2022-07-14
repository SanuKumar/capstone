import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Prompt, useHistory } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddProduct = ({ fetchProductCallBack }) => {
  let history = useHistory();
  let initialValue = {
    title: "",
    description: "",
    manufacture: "",
    category: "",
    price: "",
    rating: 3,
    quantity: "",
    thumbnail: "",
    images: []
  }
  const [formData, setFormData] = useState(initialValue)
  const [modifiedField, setModifiedField] = useState(false)

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

  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (handleValidation) {
      { formData.thumbnail ? formData.images[0] = formData.thumbnail : formData.images[0] = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=" }
      let res = await axios.post(`http://localhost:3002/products`, formData)
      if (res.statusText === 'Created') {
        setFormData(initialValue)
        toast.success("Product Created Successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        await timeout(1000);
        history.push("/")
        return fetchProductCallBack()
      } else {
        toast.error("Error while Adding Product", {
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
      <ToastContainer />
      <div style={{ float: "right", margin: "-5rem 1rem" }}>
        <Button onClick={() => history.push("/")}>Go Home</Button>
      </div>
      <Container>
        <div><h2>Add New Product</h2></div>
        <br />
        <form>
          <Row>
            <Col xs={12} sm={6}><strong>Product Name: </strong></Col>
            <Col xs={12} sm={6}>
              <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={6}><strong>Product Description: </strong></Col>
            <Col xs={12} sm={6}>
              <textarea type="text" name="description" value={formData.description} onChange={handleChange} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={6}><strong>Manufacture: </strong></Col>
            <Col xs={12} sm={6}>
              <input type="text" name="manufacture" value={formData.manufacture} onChange={handleChange} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={6}><strong>Category</strong></Col>
            <Col xs={12} sm={6}>
              <input type="text" name="category" value={formData.category} onChange={handleChange} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={6}><strong>Price</strong></Col>
            <Col xs={12} sm={6}>
              <input type="number" name="price" value={formData.price} onChange={handleChange} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={6}><strong>Quantity</strong></Col>
            <Col xs={12} sm={6}>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12} sm={6}><strong>Image Url</strong></Col>
            <Col xs={12} sm={6}>
              <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
            </Col>
          </Row>
          <br />
          <div style={{ marginTop: "2rem" }}>
            <Button type="submit" onClick={handleAddProduct}>Add Product</Button>
          </div>
        </form>
      </Container>
      <Prompt when={modifiedField} message={`Are you sure want to exit without saving?!!`} />
    </>
  )
}

export default AddProduct