import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory, Prompt } from 'react-router-dom'
import axios from "axios"
import { Carousel, Card, Container, Row, Col, Button } from 'react-bootstrap';
import Loader from "../components/Loader"
import { ToastContainer, toast } from 'react-toastify'
import { Formik, useFormikContext, Form } from 'formik'
import * as Yup from "yup"
import 'react-toastify/dist/ReactToastify.css'

const Product = ({ fetchProductCallBack }) => {
  let history = useHistory();
  const location = useLocation();
  const { id } = useParams()
  const initialValues = {
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    quantity: "",
    manufacture: "",
    category: "",
    thumbnail: "",
    images: []
  }
  const [productData, setProductData] = useState(initialValues)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:3002/products/${id}`)
      setLoading(false)
      setProductData(data)
    }
    fetchData();
  }, [id]);


  const timeout = (time) => {
    return new Promise(res => setTimeout(res, time));
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter product title'),
    description: Yup.string().required("Description is required"),
    price: Yup.string().required("Price is required"),
    rating: Yup.string().required("Rating is required"),
    quantity: Yup.string().required("Quantity is required"),
    manufacture: Yup.string().required("Manufacture is required"),
    category: Yup.string().required("Category is required"),
    thumbnail: Yup.string(),
  })

  const handleUpdateProduct = async (values) => {
    values.thumbnail ? values.images[0] = values.thumbnail : values.images[0] = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
    let res = await axios.patch(`http://localhost:3002/products/${values.id}`, values)
    if (res.statusText === 'OK') {
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
  }

  const PromptIfDirty = () => {
    const formik = useFormikContext();
    return (
      <Prompt
        when={formik.dirty && formik.submitCount === 0}
        message="Are you sure you want to leave? You have with unsaved changes."
      />
    );
  };


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
                  {productData?.images && productData.images.map((p) => (
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
                <Formik
                  initialValues={productData}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    handleUpdateProduct(values)
                    setSubmitting(false)
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    isSubmitting,
                    getFieldProps
                  }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                      <PromptIfDirty />
                      <Row>
                        <Col xs={12} sm={6}><strong>Manufacture: </strong></Col>
                        <Col xs={12} sm={6}>
                          {location.state?.edit ?
                            <>
                              <input
                                name="manufacture"
                                {...getFieldProps("manufacture")}
                              />
                              <span className='form-error-msg'>{errors.manufacture && touched.manufacture && errors.manufacture}</span>
                            </> :
                            values.manufacture}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col xs={12} sm={6}><strong>Category:</strong></Col>
                        <Col xs={12} sm={6}>
                          {location.state?.edit ?
                            <>
                              <input
                                name="category"
                                {...getFieldProps("category")}
                              />
                              <span className='form-error-msg'>{errors.category && touched.category && errors.category}</span>
                            </> :
                            values.category}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col xs={12} sm={6}><strong>Title: </strong></Col>
                        <Col xs={12} sm={6}>
                          {location.state?.edit ?
                            <>
                              <input
                                name="title"
                                {...getFieldProps("title")}
                              />
                              <span className='form-error-msg'>{errors.title && touched.title && errors.title}</span>
                            </>
                            :
                            values.title}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col xs={12} sm={6}><strong>Description: </strong></Col>
                        <Col xs={12} sm={6}>
                          {location.state?.edit ?
                            <>
                              <textarea
                                name="description"
                                {...getFieldProps("description")}
                              />
                              <span className='form-error-msg'>{errors.description && touched.description && errors.description}</span>
                            </>
                            :
                            values.description}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col xs={12} sm={6}><strong>Price ₹: </strong></Col>
                        <Col xs={12} sm={6}>
                          {location.state?.edit ? <>
                            <input
                              name="price"
                              {...getFieldProps("price")}
                            />
                            <span className='form-error-msg'>{errors.price && touched.price && errors.price}</span>
                          </> :
                            values.price}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col xs={12} sm={6}><strong>Quantity:</strong></Col>
                        <Col xs={12} sm={6}>
                          {location.state?.edit ? <>
                            <input
                              name="quantity"
                              {...getFieldProps("quantity")}
                            />
                            <span className='form-error-msg'>{errors.quantity && touched.quantity && errors.quantity}</span>
                          </> :
                            values.quantity}
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col xs={12} sm={6}><strong>Rating:</strong></Col>
                        <Col xs={12} sm={6}>
                          {location.state?.edit ? <>
                            <input
                              name="rating"
                              {...getFieldProps("rating")}
                            />
                            <span className='form-error-msg'>{errors.rating && touched.rating && errors.rating}</span>
                          </> :
                            values.rating}
                        </Col>
                      </Row>
                      <br />
                      {location.state?.edit &&
                        <Row>
                          <Col xs={12} sm={6}><strong>Image URL</strong></Col>
                          <Col xs={12} sm={6}>
                            <input
                              name="thumbnail"
                              {...getFieldProps("thumbnail")}
                            />
                            <span className='form-error-msg'>{errors.thumbnail && touched.thumbnail && errors.thumbnail}</span>
                          </Col>
                        </Row>
                      }
                      <br />
                      {location.state?.edit &&
                        <div style={{ marginTop: "2rem" }}>
                          <Button
                            type='submit'
                            disabled={isSubmitting}
                          >Update Product</Button>
                        </div>
                      }
                    </Form>
                  )}
                </Formik>
              </Container>
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}

export default Product