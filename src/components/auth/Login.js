import React, { useState, Fragment } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'

import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

import { auth } from './FireBase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import "./Login.css";
import logoImg from "../../media/Co_Create_Logo_blue.png";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const alerts = useSelector(state => state.alert); // Access redux alert state


	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	// Link user with their firebase account or make them on
	const handleFireBaseLoginOrCreateAccount = async () => {
		try {
			// Attempt to signin with firebase
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log("USER LOGGED IN WITH FIREBASE: ", userCredential.user);
		}catch(error) {
			console.error('FIREBASE ERROR: ', error.message);
			// If the user does not exist, create their account
			if(error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential'){
				try {
					const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);					
					console.log("NEW USER MADE: ", newUserCredential.user)
				}catch (registrationError){
					console.error("REGISTER ERROR: ", registrationError.message)
				}
			}
		}
	}



	//Forgotten password link
	const forgotPassword = () => {
		alert("Forgotten password!");
	};

	//Sign up link
	const signUp = () => {
		alert("Sign up!");
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		await handleFireBaseLoginOrCreateAccount();
		login(email, password);
	};

	// Navigate if logged in
	if (isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div className="main-container">

			{/* display alerts */}			
			<div className="logo-left-container">
				<img src={logoImg} class="logo"></img>
			</div>
			<div className="right-container">

			{alerts.map(alert => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            ))}
				<h1>Login</h1>
				<br />
				<form onSubmit={(e) => onSubmit(e)}>
					<label id ="uniqueLabel" class ="unique-label-style">Username</label>

					<input
					id="uniqueInput"
					className="login-input input-box unique-input-style"
					type="text"
					placeholder="email"
					value={email}
					name="email"
					onChange={(e) => onChange(e)}
				/>
					<br />
					<br />
					<br />
					<br />
					<br />
					
					<label id ="uniqueLabel" class ="unique-label-style">Password</label>
					
					<input
						id = "uniqueInput"
						className="login-input"
						type="password"
						class="input-box unique-input-style"
						name="password"
						value={password}
						placeholder="*********"
						onChange={(e) => onChange(e)}
					/>
					<br />
					<br />
					<br />

					<p className="text-before-link">
						Forgotten password?{" "}
						{/* <Link className="link" to="/login">Reset password here</Link>*/}{" "}
					</p>
					
					<button className="login-button" type="submit">
						Submit
					</button>
				</form>
				
				<p className="text-before-link">
					New to CoCreate?{" "}
					<Link className="link" to="/register">Register</Link>
				</p>
			</div>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});


export default connect(mapStateToProps, { login })(Login);
