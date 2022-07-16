import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Prompt, useHistory } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Formik, useFormikContext, Form } from 'formik'
import * as Yup from "yup"
import 'react-toastify/dist/ReactToastify.css'

const AddProduct = ({ fetchProductCallBack }) => {
  let history = useHistory();
  let initialValue = {
    name: "",
    description: "",
    manufacture: "",
    category: "",
    price: "",
    rating: "",
    quantity: "",
    thumbnail: "",
    images: []
  }
  const [formData, setFormData] = useState(initialValue)
  const numberCheck = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter product name'),
    description: Yup.string().required("Description is required"),
    price: Yup.string().required("Price is required").matches(numberCheck, 'Price is not valid'),
    rating: Yup.string().required("Rating is required").matches(numberCheck, 'Rating is not valid').min(1, "to short").max(1, "to long"),
    quantity: Yup.string().required("Quantity is required").matches(numberCheck, 'Quantity is not valid'),
    manufacture: Yup.string().required("Manufacture is required"),
    category: Yup.string().required("Category is required"),
    thumbnail: Yup.string(),
  })

  const timeout = (time) => {
    return new Promise(res => setTimeout(res, time));
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


  const handleAddProduct = async (values) => {
    values.thumbnail ? values.images[0] = values.thumbnail : values.images[0] = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
    try {
      let res = await axios.post(`http://localhost:3002/products`, values)
      if (res.statusText === 'Created') {
        setFormData(initialValue)
        toast.success("Product created successfully", {
          position: toast.POSITION.TOP_CENTER
        });
        await timeout(1000);
        history.push("/")
        return fetchProductCallBack()
      }
    } catch (error) {
      console.log(error)
      toast.error("Error while adding product", {
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
      <Container>
        <div><h2>Add New Product</h2></div>
        <br />
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleAddProduct(values)
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
                <Col xs={12} sm={6}><strong>Product Name: </strong></Col>
                <Col xs={12} sm={6}>
                  <input
                    name="name"
                    {...getFieldProps("name")}
                  />
                  <span className='form-error-msg'>{errors.name && touched.name && errors.name}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={6}><strong>Product Description: </strong></Col>
                <Col xs={12} sm={6}>
                  <textarea
                    name="description"
                    {...getFieldProps("description")}
                  />
                  <span className='form-error-msg'>{errors.description && touched.description && errors.description}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={6}><strong>Manufacture: </strong></Col>
                <Col xs={12} sm={6}>
                  <input
                    name="manufacture"
                    {...getFieldProps("manufacture")}
                  />
                  <span className='form-error-msg'>{errors.manufacture && touched.manufacture && errors.manufacture}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={6}><strong>Price</strong></Col>
                <Col xs={12} sm={6}>
                  <input
                    name="price"
                    {...getFieldProps("price")}
                  />
                  <span className='form-error-msg'>{errors.price && touched.price && errors.price}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={6}><strong>Quantity</strong></Col>
                <Col xs={12} sm={6}>
                  <input
                    name="quantity"
                    {...getFieldProps("quantity")}
                  />
                  <span className='form-error-msg'>{errors.quantity && touched.quantity && errors.quantity}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={6}><strong>Category</strong></Col>
                <Col xs={12} sm={6}>
                  <input
                    name="category"
                    {...getFieldProps("category")}
                  />
                  <span className='form-error-msg'>{errors.category && touched.category && errors.category}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={6}><strong>Rating:</strong></Col>
                <Col xs={12} sm={6}>
                  <input
                    name="rating"
                    {...getFieldProps("rating")}
                  />
                  <span className='form-error-msg'>{errors.rating && touched.rating && errors.rating}</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={12} sm={6}><strong>Image Url</strong></Col>
                <Col xs={12} sm={6}>
                  <input
                    name="thumbnail"
                    {...getFieldProps("thumbnail")}
                  />
                  <span className='form-error-msg'>{errors.thumbnail && touched.thumbnail && errors.thumbnail}</span>
                </Col>
              </Row>
              <br />
              <div style={{ marginTop: "2rem" }}>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                >
                  Add Product
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  )
}

export default AddProduct