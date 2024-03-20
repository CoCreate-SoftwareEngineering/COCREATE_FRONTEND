import React, {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()
    login(email, password)
  }

  // Navigate if logged in
  if (isAuthenticated){
    return <Navigate to="/dashboard"/>
  }
  
  return (
    <Container className="form-container">
        <Form onSubmit={e => onSubmit(e)}>
          <h1 className="register-form-title form-title">Log In</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={e => onChange(e)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
                Don't have an account?
            </Form.Text>
            <Form.Text className="text-muted">
                <Link className="form-link" to="/register">Sign up</Link>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
    </Container>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)