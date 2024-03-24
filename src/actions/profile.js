import axios from "axios";
// import {setAlert} from './alert'

import {
	GET_PROFILE,
	PROFILE_ERROR,
	LOCATION_SUCCESS,
	LOCATION_FAIL,
	LOCATION_DATA_SUCCESS,
	LOCATION_DATA_FAIL,
	LOCATION_DELETE_SUCCESS,
	LOCATION_DELETE_FAIL,
	ADD_ROOM_SUCCESS,
	ADD_ROOM_FAIL,
	CREATE_ROOM_SUCCESS,
	CREATE_ROOM_FAIL,
	CREATE_PROFILE,
	CREATE_PROFILE_ERROR,
} from "./types";

import uuidv4 from "uuidv4";
// const uuidv4 = require("uuid/v4")
export const createProfile = () => async (dispatch) => {
	try {
		console.log("Creating profile in new Action");
		const res = await axios.post("http://localhost:8000/api/profile");
		dispatch({
			type: CREATE_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: CREATE_PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Get current users profile_error
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("http://localhost:8000/api/profile/me");
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Locations
export const addLocation =
	({ locationName, latitude, longitude }) =>
	async (dispatch) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			locations: {
				locationId: uuidv4(),
				locationName: locationName,
				Lat: latitude,
				Lon: longitude,
			},
		});

		try {
			const res = await axios.put(
				"http://localhost:8000/api/profile/location",
				body,
				config
			);
			console.log("Location Success");
			console.log(res.data);
			dispatch({
				type: LOCATION_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			const errors = err.respone.data.errors;
			console.log("Location Fail");
			dispatch({
				type: LOCATION_FAIL,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};

// Get Location Data
export const getLocationData =
	(locationId, name, lat, lon) => async (dispatch) => {
		try {
			const res = await axios.get(
				`http://localhost:8000/api/data/${lat}/${lon}`
			);
			console.log("Location Success");
			dispatch({
				type: LOCATION_DATA_SUCCESS,
				payload: res.data,
			});
			return {
				id: locationId,
				name: [name],
				data: res.data,
				lat: [lat],
				lon: [lon],
			};
		} catch (err) {
			const errors = err.response.data.errors;
			console.log("Location Fail");
			dispatch({
				type: LOCATION_DATA_FAIL,
				// payload: {msg: err.response.statusText, status: err.response.status}
			});
		}
	};

// Delete Location
export const deleteLocation = (locationId) => async (dispatch) => {
	try {
		console.log("GOING");
		const res = await axios.delete(
			`http://localhost:8000/api/profile/location/${locationId}`
		);
		console.log("DELETED");
		dispatch({
			type: LOCATION_DELETE_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		console.log("Location Delete Fail");
		dispatch({
			type: LOCATION_DELETE_FAIL,
			// payload: {msg: err.response.statusText, status: err.response.status}
		});
	}
};

// Add Room to profile (on joining a room)
export const addRoom =
	({ roomName, roomId }) =>
	async (dispatch) => {
		console.log("ADDING ROOM ACTION");
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			roomId: roomId,
			roomName: roomName,
		});

		try {
			const res = await axios.put(
				"http://localhost:8000/api/profile/rooms",
				body,
				config
			);
			dispatch({
				type: ADD_ROOM_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			// const errors = err.respone.data.errors;
			console.log("Room PUT Fail");
			dispatch({
				type: ADD_ROOM_FAIL,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};

// Add Room to room database (on creating a room)
export const createRoom =
	({ roomName, roomId, elements }) =>
	async (dispatch) => {
		console.log("CREATE ROOM FUNCTION");
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		console.log("trying");

		const body = JSON.stringify({
			roomId: roomId,
			roomName: roomName,
			elements: elements,
		});

		try {
			console.log("Sending ROOM");
			const res = await axios.post(
				"http://localhost:8000/api/rooms",
				body,
				config
			);
			console.log("Room has been POST");
			console.log(res.data);
			dispatch({
				type: CREATE_ROOM_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			const errors = err.respone.data.errors;
			console.log("Room POST Fail");
			dispatch({
				type: CREATE_ROOM_FAIL,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};
