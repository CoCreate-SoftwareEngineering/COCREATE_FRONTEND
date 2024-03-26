import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	LOCATION_SUCCESS,
	LOCATION_FAIL,
	LOCATION_DATA_SUCCESS,
	LOCATION_DATA_FAIL,
	LOCATION_DELETE_SUCCESS,
	LOCATION_DELETE_FAIL,
	ADD_ROOM_SUCCESS,
	ADD_ROOM_FAIL,
	CREATE_PROFILE,
	CREATE_PROFILE_ERROR,
	GET_ROOM_NAMES,
	LEAVE_ROOM,
} from "../actions/types";

const initialState = {
	profile: null,
	loading: true,
	error: {},
	roomNames: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case CREATE_PROFILE:
		case LOCATION_SUCCESS:
		case LOCATION_DELETE_SUCCESS:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case PROFILE_ERROR:
		case CREATE_PROFILE_ERROR:
		case LOCATION_FAIL:
		case LOCATION_DATA_FAIL:
		case LOCATION_DELETE_FAIL:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false,
			};
		case LOCATION_DATA_SUCCESS:
		case ADD_ROOM_SUCCESS:
			return {
				...state,
				loading: false,
				error: "working",
			};
		case LOCATION_DATA_FAIL:
		case ADD_ROOM_FAIL:
			return {
				...state,
				error: "payload",
				loading: false,
			};
		case GET_ROOM_NAMES:
			return {
				...state,
				roomNames: payload,
				loading: false,
			};
		case LEAVE_ROOM:
			return {
				...state,
				roomNames: payload,
				loading: false,
			};
		case LEAVE_ROOM:
			return {
				...state,
				roomNames: payload,
				loading: false,
			};
		default:
			return state;
	}
}
