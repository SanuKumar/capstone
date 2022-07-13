import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Container, Alert, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const [registerUser, setRegisterUser] = useState([])
  let history = useHistory()
  let initialData = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    location: "",
    number: "",
    id: ""
  }
  const [userData, setUserData] = useState(initialData)
  const [formSuccess, setFormSuccess] = useState(false)

  const fetchUser = async () => {
    let { data } = await axios.get(`http://localhost:3001/users`)
    setRegisterUser(data)
  }
  useEffect(() => {
    fetchUser()
  }, [])


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const timeout = () => {
    return new Promise(res => setTimeout(res, 1000));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userData.email && userData.password) {
      let existingUser = registerUser.find((user) => {
        if (user.email === userData.email && user.password === userData.password) {
          return user
        }
      })
      if (existingUser) {
        alert("User already exists")
      } else {
        let res = await axios.post(`http://localhost:3001/users`, userData)
        if (res.status === 201) {
          setUserData(initialData)
          setFormSuccess(true)
          await timeout(2000);
          history.push("/login")
        }
        setFormSuccess(false)
      }
    } else {
      alert("Please Enter Details for Registration")
    }
  }

  console.log("userData", userData)

  return (
    <>
      {formSuccess &&
        <div>
          <Alert key="success" variant="success">
            You have Register Successfully
          </Alert >
        </div>
      }
      <Container>
        <div><h2>Register User</h2></div>
        <br />
        <form>
          <Row>
            <Col>Email</Col>
            <Col> <input type="text" name="email" value={userData.email} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col>Password</Col>
            <Col>  <input type="text" name="password" value={userData.password} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col>First Name</Col>
            <Col><input type="text" name="firstname" value={userData.firstname} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col>Last Name</Col>
            <Col><input type="text" name="lastname" value={userData.lastname} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col>Location</Col>
            <Col><input type="text" name="location" value={userData.location} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col>Mobile Number</Col>
            <Col><input type="text" name="number" value={userData.number} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col></Col>
            <Col><Button type='submit' onClick={handleSubmit}>Register</Button></Col>
          </Row>
        </form>
      </Container>
    </>
  )
}

export default Register