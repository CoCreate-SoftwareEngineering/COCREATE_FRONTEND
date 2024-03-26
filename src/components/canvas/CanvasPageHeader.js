import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { logout } from "../../actions/auth";
import profilePicture from "../../person-icon.jpg";
import FilesList from "./FileSharing/FilePage";

// import logo from "../../../public/person-icon.jpg"

const CanvasPageHeader = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
	logout,
	roomId,
	room: { room },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	const [showFilesModal, setShowFilesModal] = useState(false);

	const handleFilesModalShow = () => {
		console.log("Opening Files Modal");
		setShowFilesModal(true);
	  };
	  
	  // Debug: Log when modal is being closed to track unexpected triggers
	  const handleFilesModalClose = () => {
		console.log("Closing Files Modal");
		setShowFilesModal(false);
	  };

	return (
		<header className="canvas-header flex text-white">
			<div className="profile flex">
				{/* <img src={profilePicture} className="profile-img" alt="Picture" width="500" height="600"></img> */}
				{/* Have to add to backend */}
				<h2 className="fs-24" style={{ color: "white" }}>
					{user && user.firstName} {user && user.lastName}
				</h2>
			</div>
			<div className="title">
				<h2 className="" style={{ color: "white" }}>
					{room.roomName}					
				</h2>
			</div>
			<div className="menu">
				<Link to="/dashboard">Dashboard</Link>
			</div>

			<div>
				<button onClick={handleFilesModalShow}>Files</button>
				<FilesList show = {showFilesModal} onClose={handleFilesModalClose} roomId={room.roomId} roomName={room.roomName} />
			</div>

		</header>
	);
};

CanvasPageHeader.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	room: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	room: state.room,
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(
	CanvasPageHeader
);
