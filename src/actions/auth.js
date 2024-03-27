import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
	GET_PROFILE,
	PROFILE_ERROR,
} from "./types";

import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get("http://localhost:8000/api/auth");
		console.log("User loaded");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
		// try {
		// 	const res = await axios.get("http://localhost:8000/api/profile/me");
		// 	dispatch({
		// 		type: GET_PROFILE,
		// 		payload: res.data,
		// 	});
		// } catch (err) {
		// 	dispatch({
		// 		type: PROFILE_ERROR,
		// 		payload: { msg: err.response.statusText, status: err.response.status },
		// 	});
		// }
	} catch (err) {
		console.log("User load error");
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register =
	({ firstName, lastName, email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({ firstName, lastName, email, password });

		try {
			const res = await axios.post(
				"http://localhost:8000/api/users",
				body,
				config
			);

			await dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			// console.log("response user id:" + res.data);
			// await axios.post("http://localhost:8000/api/profile", config);

			dispatch(loadUser());
		} // In your registration action
		catch (err) {
			const errors = err.response.data.errors || [{ msg: 'An unexpected error occurred.' }];
		
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
			}
		
			dispatch({
				type: REGISTER_FAIL,
				payload: { msg: errors.map(error => error.msg).join(', '), status: err.response.status }
			});
		}
		
	};

// Login User
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			"http://localhost:8000/api/auth",
			body,
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({ type: LOGIN_FAIL });
	}
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
	console.log("Logout");
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};
