import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth as firebaseAuth } from './FireBase-config'


import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { createProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import "./Register.css";
import logoImg from "../../media/Co_Create_Logo_blue.png";


const Register = ({ setAlert, register, isAuthenticated, createProfile }) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	});

	const { firstName, lastName, email, password, passwordConfirmation } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== passwordConfirmation) {
			setAlert("Passwords do not match", "danger");
		} else {

			// link account to firebase
			try{
				const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
				console.log("IMPORTANT: Firebase user registered", userCredential.user);
								
			} catch (error) {
				console.log('Firebase registration error: ', error)
				setAlert(error.message, 'danger')
			}
			// Original register code
			await register({ firstName, lastName, email, password });
			createProfile();			
		}
	};

	// user already linked to firebase
	if (isAuthenticated){
		console.log("already signed in")
	}

	// Navigates if logged in
	if (isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<div className="register-main-container">
			<div className="register-logo-left-container">
				<img src={logoImg} className="logo" alt="logo"></img>
			</div>
			<div className="register-right-container">
				<Container className="register-form-container">
					<Form onSubmit={e => onSubmit(e)}>
						<h1 className="register-form-title">Sign Up</h1>
						<Form.Group className="register-form-group" controlId="formBasicFirstName">
							<Form.Label className="register-form-label">First Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="First Name"
								name="firstName"
								value={firstName}
								onChange={e => onChange(e)}
								className="register-form-input"
							/>
						</Form.Group>
						<Form.Group className="register-form-group" controlId="formBasicLastName">
							<br />
							<Form.Label className="register-form-label">Last Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Last Name"
								name="lastName"
								value={lastName}
								onChange={e => onChange(e)}
								className="register-form-input"
							/>
						</Form.Group>
						<Form.Group className="register-form-group" controlId="formBasicEmail">
							<br />
							<Form.Label className="register-form-label">Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								name="email"
								value={email}
								onChange={e => onChange(e)}
								className="register-form-input"
							/>
						</Form.Group>
						<Form.Group className="register-form-group" controlId="formBasicPassword">
							<br />
							<Form.Label className="register-form-label">Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								name="password"
								value={password}
								onChange={e => onChange(e)}
								className="register-form-input"
							/>
						</Form.Group>
						<Form.Group className="register-form-group" controlId="formBasicPasswordConfirmation">
							<br />
							<Form.Label className="register-form-label">Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								name="passwordConfirmation"
								value={passwordConfirmation}
								onChange={e => onChange(e)}
								className="register-form-input"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Text className="register-text-before-link">
								<span>Already have an account? </span>
								<Link className="register-form-link" to="/login">Log in</Link>
							</Form.Text>
						</Form.Group>
						<Button variant="primary" type="submit" className="register-sign-in-button">
							Sign Up
						</Button>
					</Form>
				</Container>
			</div>
		</div>
	);
	
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register, createProfile })(
	Register
);
