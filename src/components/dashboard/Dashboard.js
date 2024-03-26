import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import {
	getRoom,
	updateRoomId,
	clearRoom,
	getAllRoomNames,
} from "../../actions/rooms";

import Spinner from "../main/Spinner";
import Body from "../main/Body";
import JoinRoomForm from "./room_form/JoinRoomForm";
import Nav from "../nav/Nav";
import Help from "./Help/HelpButton";

import { Link } from "react-router-dom";

import ToggleableHeading from "./ToggleableHeading/ToggleableHeading.js";

import "./Dashboard.css";

import io from "socket.io-client";
import EventCalendar from '../dashboard/calendar/EventCalendar.js';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading, roomNames },
	uuid,
	setRoomJoined,
	setUser,
	socket,
	rooms,
	socketJoinRoom,
	getRoom,
	clearRoom,
	getAllRoomNames,
	// setRoomId,
	// roomId,
	// room: {
	// 	roomLoading,
	// 	room: { roomId },
	// },
}) => {
	// const [roomNames, setRoomNames] = useState([]);

	useEffect(() => {
		getCurrentProfile();
		console.log("GETTING PROFILE");
	}, [loading]);

	useEffect(() => {
		clearRoom();
	}, []);
	console.log(profile);

	useEffect(() => {
		getAllRoomNames();
	}, []);

	const handleChooseRoom = (room) => {
		console.log("0.INTIAL ROOM ID");
		// console.log(roomId);
		socketJoinRoom(room);
		// setRoomId(room.roomId);
		updateRoomId(room);
		getRoom(room);
		console.log("1.DASHBOARD HANDLER: CREATED FOR: " + room);
		// console.log(roomId);
	};


	return profile && roomNames === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Nav user={user} />

			{profile == null ? (
				<Fragment></Fragment>
			) : (
				<Fragment>
					{/* {profile.rooms.map(
						(room, index) => room && <li key={index}>{room.roomName}</li>
					)} */}
					<div className="content">
						  <span> <EventCalendar/> </span>
              <div className="row">
							<ToggleableHeading
								uuid={uuid}
								setRoomJoined={setRoomJoined}
								setUser={setUser}
								socket={socket}
								heading="Projects"
								notiAmountCons={profile.roomIds.length} // dynamically set notification amount
								rowContent={
									<div className="projects-container">
										<JoinRoomForm
											uuid={uuid}
											setRoomJoined={setRoomJoined}
											setUser={setUser}
											socket={socket}
											socketJoinRoom={socketJoinRoom}
											// roomId={roomId}
										/>
										{/* add all projects in data structure to projects section */}
										{roomNames.map((room, index) => (
											<Link
												key={index}
												to={`/${profile.roomIds[index]}`}
												onClick={() => {
													handleChooseRoom(profile.roomIds[index]);
												}}
											>
												<div className="item">
													<p>{room}</p>
												</div>
											</Link>
										))}
									</div>
								}
							/>
						</div>
					</div>
					<div>
						<Help />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getRoom: PropTypes.func.isRequired,
	updateRoomId: PropTypes.func.isRequired,
	clearRoom: PropTypes.func.isRequired,
	getAllRoomNames: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	room: state.room,
});

export default connect(mapStateToProps, {
	getCurrentProfile,
	getRoom,
	updateRoomId,
	clearRoom,
	getAllRoomNames,
})(Dashboard);
