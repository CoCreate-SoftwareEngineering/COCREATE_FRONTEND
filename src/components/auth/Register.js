import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { createProfile } from "../../actions/profile";
import PropTypes from "prop-types";

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
			await register({ firstName, lastName, email, password });
			createProfile();
		}
	};

	// Navigates if logged in
	// if (isAuthenticated){
	//   return <Navigate to="/dashboard"/>
	// }

	return (
		<Container className="form-container">
			<Form onSubmit={(e) => onSubmit(e)}>
				<h1 className="register-form-title form-title">Sign Up</h1>
				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="First Name"
						name="firstName"
						value={firstName}
						onChange={(e) => onChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Last Name"
						name="lastName"
						value={lastName}
						onChange={(e) => onChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
					{/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="passwordConfirmation"
						value={passwordConfirmation}
						onChange={(e) => onChange(e)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Text className="text-muted">Already have an account?</Form.Text>
					<Form.Text className="text-muted">
						<Link className="form-link" to="/login">
							Log in
						</Link>
					</Form.Text>
				</Form.Group>
				<Button variant="primary" type="submit">
					Sign Up
				</Button>
			</Form>
		</Container>
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
