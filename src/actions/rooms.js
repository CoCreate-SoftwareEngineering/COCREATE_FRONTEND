import axios from "axios";
import {
	GET_ROOM,
	GET_ROOM_ERROR,
	SAVE_ROOM,
	SAVE_ROOM_ERROR,
	LOADING,
	UPDATE_ELEMENTS,
	UPDATE_ROOMID,
	CREATE_ROOM_SUCCESS,
	CREATE_ROOM_FAIL,
	CLEAR_ROOM,
	RENAME_ROOM_SUCCESS,
	RENAME_ROOM_FAIL,
	GET_ROOM_NAMES,
	ADD_MEMBER,
} from "./types";

export const dataBase_saveElements = (elements, roomId) => async (dispatch) => {
	console.log("Start save elements");
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	console.log("ROOM ID: ");
	console.log(roomId);

	const body = JSON.stringify({
		roomId,
		elements,
	});

	console.log(body);

	try {
		const res = await axios.put(
			"http://localhost:8000/api/rooms",
			body,
			config
		);
		console.log("Elements has been PUT");
		console.log(res.data);
		dispatch({
			type: SAVE_ROOM,
			payload: res.data,
		});
	} catch (err) {
		// const errors = err.respone.data.errors;
		console.log("Elements PUT Fail");
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
			console.log("Room created successfully");
		} catch (err) {
			const errors = err.respone.data.errors;
			console.log("Room POST Fail");
			dispatch({
				type: CREATE_ROOM_FAIL,
				payload: { msg: err.response.statusText, status: err.response.status },
			});
		}
	};

export const getRoom = (roomId) => async (dispatch) => {
	try {
		console.log("2.GETTING ROOM");
		console.log(roomId);
		if (typeof roomId != "undefined") {
			const res = await axios.get(`http://localhost:8000/api/rooms/${roomId}`);
			console.log("Getted room: ");
			console.log(res.data);
			dispatch({
				type: GET_ROOM,
				payload: res.data,
			});
			// return res.data;
		}
	} catch (err) {
		console.log("Failed get room elements");
	}
};

export const updateElementsAction = (elements) => (dispatch) => {
	dispatch({
		type: UPDATE_ELEMENTS,
		payload: elements,
	});
};

export const updateRoomId = (roomId) => (dispatch) => {
	dispatch({
		type: UPDATE_ROOMID,
		payload: roomId,
	});
};

export const clearRoom = () => (dispatch) => {
	dispatch({
		type: CLEAR_ROOM,
	});
};

export const updateRoomName = (roomId, rename) => async (dispatch) => {
	console.log("RENAME ROOM FUNCTION");
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	console.log("trying");

	const body = JSON.stringify({
		roomId: roomId,
		roomName: rename,
	});

	try {
		console.log("Sending ROOM");
		const res = await axios.put(
			"http://localhost:8000/api/rooms/name",
			body,
			config
		);
		dispatch({
			type: RENAME_ROOM_SUCCESS,
			payload: rename,
		});
		console.log("Room created successfully");
	} catch (err) {
		const errors = err.respone.data.errors;
		console.log("Room POST Fail" + errors);
		dispatch({
			type: RENAME_ROOM_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

export const getAllRoomNames = () => async (dispatch) => {
	console.log("THIS");
	try {
		console.log("GETTING ALL ROOM NAMES");
		const res = await axios.get("http://localhost:8000/api/rooms/");
		console.log(res.data);
		dispatch({
			type: GET_ROOM_NAMES,
			payload: res.data,
		});
	} catch (err) {
		console.log("ERROR GETTING ROOM NAMES");
	}
};
export const addMemberToRoom = (roomId) => async (dispatch) => {
	console.log("ADDING MEMBER");

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	console.log("trying");

	const body = JSON.stringify({
		roomId: roomId,
	});
	try {
		console.log("ADDING MEMBER");
		const res = await axios.put(
			"http://localhost:8000/api/rooms/addMember",
			body,
			config
		);
		console.log("Response data");
		console.log(res.data);
		dispatch({
			type: ADD_MEMBER,
			payload: res.data,
		});
	} catch (err) {
		console.log("ERROR ADDING MEMBERS");
	}
};
export const addMemberToRoomFromSettings =
	(roomId, email) => async (dispatch) => {
		console.log("ADDING MEMBER");

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		console.log("trying");

		const body = JSON.stringify({
			roomId: roomId,
			email: email,
		});
		try {
			console.log("ADDING MEMBER");
			const res = await axios.put(
				"http://localhost:8000/api/profile/rooms/addMember",
				body,
				config
			);
			console.log("Response data");
			console.log(res.data);
			dispatch({
				type: ADD_MEMBER,
				payload: res.data,
			});
		} catch (err) {
			console.log("ERROR ADDING MEMBERS");
		}
	};
