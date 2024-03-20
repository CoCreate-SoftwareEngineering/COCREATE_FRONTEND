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

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()
    login(email, password)
  }

  // Navigate if logged in
  if (isAuthenticated){
    return <Navigate to="/dashboard"/>
  }

  //sets up passwords verification
  // const[user, usernameVerify] = useState(false);
  // const[pass, passwordVerify] = useState(false);
  // const navigate = useNavigate();

  // //default username and password
  // let username = "joebloggs123";
  // let password1 = "password1";

  // //checks username
  // function checkUser(e){
  //     let userNameInput = e;
  //     if (userNameInput === username){
  //         usernameVerify(true);
  //     }
  //     else{
  //         usernameVerify(false);
  //     }
  // }

  // //checks password
  // function checkPass(e){
  //     let passWordInput = e;             
  //     if (passWordInput === password1){
  //         passwordVerify(true);
  //     }
  //     else{
  //         passwordVerify(false);
  //     }
  // }

  // //checks data and redirects to new page
  // const submitBtn = () => {
  //     if(user === true && pass=== true){
  //         alert("Correct");
  //         navigate('/home');
  //     }
  //     else{
  //         alert("Incorrect details, please re-enter");
  //     }
  // }
  
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
                {/* <Link onClick={forgotPassword}><p>Forgotten password?</p></Link> */}
                <button className = "login-button" type='submit' >Submit</button>
                </form>
                {/* <p>New to CoCreate? <Link class="link" ><b>Register</b></Link></p> */}
                
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

export default connect(mapStateToProps, {login})(Login)