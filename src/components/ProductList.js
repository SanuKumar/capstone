import React, { useState } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
import "./ProductList.css"
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"

const ProductList = ({ products, loading, isUserLoggedIn }) => {
  let history = useHistory();
  const [customField, setCustomField] = useState({ title: true, manufacture: true, rating: true })

  const handleAddProduct = () => {
    if (isUserLoggedIn) {
      history.push('/addproduct')
    } else {
      toast.error("Please login to Add Product", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const handleEditProduct = (id) => {
    if (isUserLoggedIn) {
      history.push({
        pathname: `/product/${id}`,
        state: { edit: true }
      })
    }
    else {
      toast.error("Please login to Edit Product", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  const timeout = () => {
    return new Promise(res => setTimeout(res, 1000));
  }

  const handleDeleteProduct = async (id) => {
    if (isUserLoggedIn) {
      if (window.confirm("Are you sure want to delete Product")) {
        let res = await axios.delete(`http://localhost:3002/products/${id}`)
        if (res.status === 200) {
          toast.success("Product Deleted Successfully", {
            position: toast.POSITION.TOP_CENTER
          });
          await timeout(2000);
          window.location.reload();
        } else {
          toast.success("Error while Deleting Product", {
            position: toast.POSITION.TOP_CENTER
          });
        }
      }
    } else {
      toast.error("Please login to Delete Product", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const handleViewProduct = (id) => {
    if (isUserLoggedIn) {
      history.push(`/product/${id}`)
    } else {
      toast.error("Please login to View Product Details", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const onSiteChanged = (e) => {
    const { name, checked } = e.target
    setCustomField({
      ...customField,
      [name]: checked ? true : false
    })
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <Row style={{ marginTop: '-4rem' }}>
          <Col xs={10} sm={8} >
            <h2>Customise Product Fields</h2>
            <form style={{ fontSize: "20px" }}>
              <label>Title</label>{" "}
              <input
                type="checkbox"
                name="title"
                checked={customField.title}
                onChange={onSiteChanged}
              />{" "}
              <label>Manufacture</label>{" "}
              <input
                type="checkbox"
                name="manufacture"
                checked={customField.manufacture}
                onChange={onSiteChanged}
              />{" "}
              <label>Rating</label>{" "}
              <input
                type="checkbox"
                name="rating"
                checked={customField.rating}
                onChange={onSiteChanged}
              />
            </form>
          </Col>
          <Col xs={18} sm={4}>
            <Button onClick={handleAddProduct} style={{ float: "right" }}>Add Product</Button>
          </Col>
        </Row>
      </Container>

      <br />
      {
        loading ?
          <Loader /> :
          <Container>
            <Row className="justify-content-md-center">
              {products.length ? products.map((p) => {
                return (
                  <Col xs={12} sm={6} md={6} lg={3} key={p.id}>
                    <Card key={p.id} style={{ margin: '0.2rem' }}>
                      <Card.Img variant="top" onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=";
                      }} src={p.thumbnail} height={250} width={250} style={{ padding: "0.3rem" }} onClick={() => handleViewProduct(p.id)} />
                      <Card.Body>
                        {customField.title && <Card.Title className='card-text-formatter'>{p.title}</Card.Title>}
                        {customField.manufacture && <Card.Title className='card-text-formatter'>{p.manufacture}</Card.Title>}
                        {customField.rating && <Card.Title className='card-text-formatter'><ReactStars edit={false} size={25} value={p.rating} /></Card.Title>}
                        <Card.Text className='card-text-formatter'>
                          {p.description}
                        </Card.Text>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>

                          <Button variant="primary" onClick={() => handleEditProduct(p.id)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              }) : <h5>No Product Found</h5>}
            </Row>
          </Container >
      }
    </>

  )
}

export default ProductList