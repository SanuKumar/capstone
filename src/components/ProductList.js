import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Row, Col, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Loader from './Loader';
import "./ProductList.css"
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { CgAddR } from 'react-icons/cg';
import { FcFilledFilter } from "react-icons/fc"

const ProductList = ({ products, loading, isUserLoggedIn, fetchProductCallBack, handleFilter }) => {
  let history = useHistory();
  const [delMulProduct, setDelMulProduct] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedId, setSelectedId] = useState("")
  const [customField, setCustomField] = useState({
    name: true,
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

  //delay the call by specific time
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
    setDelMulProduct([])
    setShow(false)
    try {
      let res = await axios.delete(`https://products-json-server.herokuapp.com/products/${selectedId}`)
      if (res.status === 200) {
        toast.success("Product deleted successfully!!", {
          position: toast.POSITION.TOP_CENTER
        });
        fetchProduct();
        await timeout(500);
        fetchProductCallBack()
      }
    } catch (error) {
      toast.error("Error while deleting product", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  const selectMultipleProduct = (id) => {
    if (delMulProduct.includes(id)) {
      let remove = delMulProduct.filter((p) => p != id)
      return setDelMulProduct(remove)
    }
    setDelMulProduct([...delMulProduct, id])
  }

  const deleteMultipleProducts = async () => {
    if (isUserLoggedIn) {
      if (window.confirm('Are you sure want to delete selected products')) {
        try {
          delMulProduct.map((did) => axios.delete(`https://products-json-server.herokuapp.com/products/${did}`))
          toast.success("Product's deleted successfully!!", {
            position: toast.POSITION.TOP_CENTER
          });
          fetchProduct();
          await timeout(500);
          fetchProductCallBack()
          setDelMulProduct([])
        } catch (error) {
          toast.error("Error while deleting product", {
            position: toast.POSITION.TOP_CENTER
          });
        }
      }
    } else {
      toast.error("Please login to delete products", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const [productArray, setProductArray] = useState([])

  useEffect(() => {
    fetchProduct();
  }, [])

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://products-json-server.herokuapp.com/products`)
      let data = [...res.data, { "name": "All", "category": "All" }]
      setProductArray(data)
    } catch (error) {
      console.log(error)
    }
  }

  const categoryName = [...new Map(productArray.map((item) => [item['category'].toUpperCase(), item.category.toUpperCase()])).values()]

  const filterData = (key) => {
    handleFilter(key)
  }

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Container className='container-wrapper'>
        <Row>
          <Col lg={9} md={9} sm={12} xs={12}>
            <h2 data-testid="product-field-header">Customise Product Fields
              <div style={{ height: "2px", width: "2px" }}>
                <DropdownButton id="dropdown-basic-button" variant="warning" title={<FcFilledFilter />}>
                  {categoryName && categoryName.map((c) => (
                    <Dropdown.Item key={c} onClick={() => filterData(c)}>{c.toUpperCase()}</Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </h2>
            <form className='form-wrapper'>
              <label htmlFor='name_id'>Product Name</label>
              <input
                type="checkbox"
                name="name"
                id="name_id"
                checked={customField.name}
                onChange={onSiteChanged}
              />
              <label htmlFor='manufacture_id'>Manufacture</label>
              <input
                type="checkbox"
                name="manufacture"
                id="manufacture_id"
                checked={customField.manufacture}
                onChange={onSiteChanged}
              />
              <label htmlFor='rating_id'>Rating</label>
              <input
                type="checkbox"
                name="rating"
                id="rating_id"
                checked={customField.rating}
                onChange={onSiteChanged}
              />
              <label htmlFor='description_id'>Description</label>
              <input
                type="checkbox"
                name="description"
                id="description_id"
                checked={customField.description}
                onChange={onSiteChanged}
              />
            </form>
          </Col>
          <Col lg={3} md={3} sm={12} xs={12}>
            <Row>
              <Col className='m-1'>
                <div>
                  {delMulProduct.length > 1 &&
                    <Button variant="danger" onClick={deleteMultipleProducts} style={{ width: "8rem" }}>
                      <span style={{ fontSize: "10px" }}>Delete Product's</span> <RiDeleteBin6Line style={{ marginTop: "-2px" }} />
                    </Button>
                  }
                </div>
              </Col>
              <Col className='m-1'>
                <div>
                  <Button onClick={handleAddProduct} data-testid="add-product-btn" style={{ width: "8rem" }}>
                    <span style={{ fontSize: "10px" }}>Add Product</span> <CgAddR style={{ marginTop: "-2px" }} />
                  </Button>
                </div>
              </Col>
            </Row>
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
          <Button variant="primary" onClick={handleDeleteProduct}>
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
              {products && products.length !== 0 ? products.map((p) => {
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
                        <div style={{ float: "right", marginLeft: "4px" }}>
                          <input
                            type="checkbox"
                            name="delete"
                            onChange={() => selectMultipleProduct(p.id)}
                          />
                        </div>
                        {customField.name &&
                          <Card.Title className='card-text-formatter'>
                            {p.name}
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
                          <Button variant="primary" onClick={() => handleEditProduct(p.id)}>Edit <AiOutlineEdit style={{ marginTop: "-2px" }} /></Button>
                          <Button variant="danger" onClick={() => handleShow(p.id)}>Delete <RiDeleteBin6Line style={{ marginTop: "-2px" }} /></Button>
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