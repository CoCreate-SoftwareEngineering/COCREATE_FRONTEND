import React, {useState, Fragment} from 'react'
import {Link, useNavigate, Navigate} from 'react-router-dom'
import axios from 'axios'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'
import'./Login.css'
import logoImg from '../../media/Co_Create_Logo_blue.png'


const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const onChange = e => 
      setFormData({...formData, [e.target.name]: e.target.value})

  //Forgotten password link
  const forgotPassword = () => {
    alert("Forgotten password!")
  }

//Sign up link
  const signUp = () => {
    alert("Sign up!")
  }

  const onSubmit = async e => {
    e.preventDefault()
    login(email, password)
  }







  
  return (
    <div className="main-container">
            <div className="logo-left-container">
                <img src={logoImg} class="logo"></img>
            </div>
            <div className="right-container">
                <h1>Login</h1><br/>
                <form onSubmit={e => onSubmit(e)}>
                <label>Username</label><br/>
                <input className="login-input" type="text" class="user" placeholder='email' value={email} name="email" onChange={e => onChange(e)}/><br/>
                <label>Password</label><br/>
                <input className = "login-input" type="password" class="pass" name="password" value={password}  placeholder='*********' onChange={e => onChange(e)}/><br/>
                <p className='text-before-link'>Forgotten password? {/* <Link className="link" to="/login">Reset password here</Link>*/} </p>
                <button className = "login-button" type='submit' >Submit</button>
                </form>
                <p className='text-before-link'>New to CoCreate? {/*<Link className="link" to="/register">Register</Link>*/} </p>
              
                
            </div>
            
        </div>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login);