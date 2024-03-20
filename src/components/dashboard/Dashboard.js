import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

import Spinner from "../main/Spinner";
import Body from "../main/Body";
import JoinRoomForm from "./room_form/JoinRoomForm";
import Nav from "../nav/Nav";

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
}) => {
	useEffect(() => {
		getCurrentProfile();
		console.log("GETTING PROFILE");
	}, [loading]);
	console.log(profile);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Nav />

			{profile == null ? (
				<Fragment>
					<Body />
					{/* <AddModal/> */}
				</Fragment>
			) : (
				<Fragment>
					<h1>Projects</h1>
					<JoinRoomForm
						uuid={uuid}
						setRoomJoined={setRoomJoined}
						setUser={setUser}
						socket={socket}
					/>
					{profile.rooms.map(
						(room, index) => room && <li key={index}>{room.roomName}</li>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	rooms: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	// rooms: state.profile.profile.rooms,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
