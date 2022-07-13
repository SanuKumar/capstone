import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ({ updateLocalStorage }) => {
  let history = useHistory()
  const [usersData, setUsersData] = useState([])
  const [formData, setFormData] = useState({ email: "", password: "" })

  const fetchUser = async () => {
    let { data } = await axios.get(`http://localhost:3001/users`)
    setUsersData(data)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.email && formData.password) {
      let res = usersData.find((user) => {
        if (user.email === formData.email && user.password === formData.password) {
          return user
        }
      })
      if (res) {
        alert("User Successfully Logged In")
        localStorage.setItem('isUserLoggedIn', JSON.stringify(res))
        updateLocalStorage(JSON.stringify(res))
        history.push('/')
        window.location.reload();
      } else {
        toast.error('Please Check the Enter Credential\'s')
      }
    } else {
      toast.error("Please Enter Login Details")
    }
  }

  return (
    <>
      <ToastContainer />
      <Container>
        <div><h2>Login</h2></div>
        <br />
        <form>
          <Row>
            <Col sm={12} md={2}>Email</Col>
            <Col><input type="text" name="email" value={formData.email} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={2}>Password</Col>
            <Col><input type="text" name="password" value={formData.password} onChange={handleChange} /></Col>
          </Row>
          <br />
          <Row>
            <Col sm={12} md={2}></Col>
            <Col><Button type='submit' onClick={handleSubmit}>Login</Button></Col>
          </Row>
        </form>
      </Container>
    </>
  )
}

export default Login