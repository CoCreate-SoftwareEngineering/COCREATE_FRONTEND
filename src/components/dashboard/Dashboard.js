import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

import Spinner from "../main/Spinner";
import Body from "../main/Body";
import JoinRoomForm from "./room_form/JoinRoomForm";
import Nav from "../nav/Nav";
import Help from "./Help/HelpButton"

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
						heading = "Projects"
						notiAmountCons = {profile.rooms.length} // dynamically set notification amount
						rowContent={
							
							<div className = "projects-container">
								<JoinRoomForm
									uuid={uuid}
									setRoomJoined={setRoomJoined}
									setUser={setUser}
									socket={socket}
								/>
								{/* add all projects in data structure to projects section */}
								{profile.rooms.map((room, index) => 
									<Link key={index} to="/"><div className='item'>{profile.rooms.roomName}</div></Link>
								)}
							</div>
						}/>
					</div>
					</div>
					<div><Help/></div>
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
