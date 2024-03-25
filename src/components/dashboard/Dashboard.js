import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { getRoom, updateRoomId, clearRoom } from "../../actions/rooms";

import Spinner from "../main/Spinner";
import Body from "../main/Body";
import JoinRoomForm from "./room_form/JoinRoomForm";
import Nav from "../nav/Nav";
import Help from "./Help/HelpButton";

import { Link } from "react-router-dom";

import ToggleableHeading from "./ToggleableHeading/ToggleableHeading.js";

import "./Dashboard.css";

import io from "socket.io-client";

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
	uuid,
	setRoomJoined,
	setUser,
	socket,
	rooms,
	socketJoinRoom,
	getRoom,
	clearRoom,
	// setRoomId,
	// roomId,
	// room: {
	// 	roomLoading,
	// 	room: { roomId },
	// },
}) => {
	useEffect(() => {
		getCurrentProfile();
		console.log("GETTING PROFILE");
	}, [loading]);

	useEffect(() => {
		clearRoom();
	}, []);
	console.log(profile);

	const handleChooseRoom = (room) => {
		console.log("0.INTIAL ROOM ID");
		// console.log(roomId);
		socketJoinRoom(room.roomId);
		// setRoomId(room.roomId);
		updateRoomId(room.roomId);
		getRoom(room.roomId);
		console.log("1.DASHBOARD HANDLER: CREATED FOR: " + room.roomId);
		// console.log(roomId);
	};

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Nav user={user} />

			{profile == null ? (
				<Fragment>
					<div>
						<h1>ERROR GETTING PROFILE</h1>
					</div>
				</Fragment>
			) : (
				<Fragment>
					{/* {profile.rooms.map(
						(room, index) => room && <li key={index}>{room.roomName}</li>
					)} */}
					<div className="content">
						<div className="row">
							<ToggleableHeading
								uuid={uuid}
								setRoomJoined={setRoomJoined}
								setUser={setUser}
								socket={socket}
								heading="Projects"
								notiAmountCons={profile.rooms.length} // dynamically set notification amount
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
										{profile.rooms.map((room, index) => (
											<Link
												key={index}
												to={`/${room.roomId}`}
												onClick={() => {
													handleChooseRoom(room);
												}}
											>
												<div className="item">
													<p>{room.roomName}</p>
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
})(Dashboard);
