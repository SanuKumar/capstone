import React, { useState } from 'react'
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
import "./ProductList.css"
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"

const ProductList = ({ products, loading, isUserLoggedIn, fetchProductCallBack }) => {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedId, setSelectedId] = useState("")
  const [customField, setCustomField] = useState({
    title: true,
    manufacture: true,
    rating: true,
    description: true
  })

  const handleAddProduct = () => {
    if (isUserLoggedIn) {
      history.push('/addproduct')
    } else {
      toast.error("Please login to add product", {
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
      toast.error("Please login to edit product", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  const timeout = (time) => {
    return new Promise(res => setTimeout(res, time));
  }


  const handleViewProduct = (id) => {
    if (isUserLoggedIn) {
      history.push(`/product/${id}`)
    } else {
      toast.error("Please login to view product details", {
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
  const handleShow = (id) => {
    if (isUserLoggedIn) {
      setShow(true)
      setSelectedId(id)
    } else {
      toast.error("Please login to delete product", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  };

  const handleDeleteProduct = async () => {
    setShow(false)
    try {
      let res = await axios.delete(`http://localhost:3002/products/${selectedId}`)
      if (res.status === 200) {
        toast.success("Product deleted successfully!!", {
          position: toast.POSITION.TOP_CENTER
        });
        await timeout(500);
        fetchProductCallBack()
      }
    } catch (error) {
      toast.error("Error while deleting product", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Container className='container-wrapper'>
        <Row>
          <Col xs={10} sm={8} >
            <h2>Customise Product Fields</h2>
            <form className='form-wrapper'>
              <label>Title</label>
              <input
                type="checkbox"
                name="title"
                checked={customField.title}
                onChange={onSiteChanged}
              />
              <label>Manufacture</label>
              <input
                type="checkbox"
                name="manufacture"
                checked={customField.manufacture}
                onChange={onSiteChanged}
              />
              <label>Rating</label>
              <input
                type="checkbox"
                name="rating"
                checked={customField.rating}
                onChange={onSiteChanged}
              />
              <label>Description</label>
              <input
                type="checkbox"
                name="description"
                checked={customField.description}
                onChange={onSiteChanged}
              />
            </form>
          </Col>
          <Col xs={18} sm={4}>
            <Button onClick={handleAddProduct} style={{ float: "right" }}>Add Product</Button>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Are you sure want to delete the Product!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteProduct()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      {
        loading ?
          <Loader /> :
          <Container>
            <Row className="justify-content-md-center">
              {products ? products.map((p) => {
                return (
                  <Col xs={12} sm={6} md={6} lg={3} key={p.id}>
                    <Card key={p.id} className="card-wrapper">
                      <Card.Img
                        variant="top"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo=";
                        }}
                        src={p.thumbnail}
                        height={250}
                        width={250}
                        style={{ padding: "0.3rem", cursor: "pointer" }}
                        onClick={() => handleViewProduct(p.id)}
                      />
                      <Card.Body>
                        {customField.title &&
                          <Card.Title className='card-text-formatter'>
                            {p.title}
                          </Card.Title>}
                        {customField.manufacture &&
                          <Card.Title className='card-text-formatter'>
                            {p.manufacture}
                          </Card.Title>}
                        {customField.rating &&
                          <Card.Title className='card-text-formatter'>
                            <ReactStars
                              edit={false}
                              size={25}
                              value={parseInt(p.rating)}
                            />
                          </Card.Title>}
                        {customField.description &&
                          <Card.Text className='card-text-formatter'>
                            {p.description}
                          </Card.Text>
                        }
                        <div className='button-wrapper'>
                          <Button variant="primary" onClick={() => handleEditProduct(p.id)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleShow(p.id)}>Delete</Button>
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