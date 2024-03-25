import React from "react";
import "../ToolBar.js";
import "./Gsettings.css";
import { Link } from "react-router-dom";
import user1 from "../../../media/ProfileImg1.jpg";
import user2 from "../../../media/Darwizzy.jpg";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getRoom, updateRoomName } from "../../../actions/rooms";
import { addMember } from "../../../actions/profile";

const Gsettings = ({ room: { room }, updateRoomName, getRoom, addMember }) => {
	const [isRemoveVisible] = useState(true);
	const [open, setOpen] = useState(false);
	const [rename, setRename] = useState("");
	const [member, setMember] = useState("");

	const handleRemoveClick = (event) => {
		if (!event.target.classList.contains("admin")) {
			if (window.confirm("Are you sure you want to remove this member?")) {
				event.target.parentNode.remove();
			}
		}
	};
	const handleAddMember = (e) => {
		e.preventDefault();
		console.log("Add Member clicked");
		addMember(room.roomId, member);
		setOpen(true);
	};
	const handleAdmin = (event) => {
		console.log("admin clicked");
		if (window.confirm("Are you sure you want to make this user admin?")) {
			console.log("admin clicked");
		}
	};

	const handleRename = (e) => {
		e.preventDefault();
		console.log("HANDLE RENAME");
		console.log(rename);
		updateRoomName(room.roomId, rename);
		// setRename("");
		getRoom(room.roomId);
	};
	return (
		<div className="section">
			<button className="closebtn">
				<Link to="/canvas">
					<h3>x</h3>
				</Link>
			</button>
			<h2>Settings</h2>
			<div className="options">Members</div>
			<div className="UserPic-container">
				{isRemoveVisible && (
					<div className="picitem" onClick={handleRemoveClick}>
						<img
							className="UserPic"
							src={user1}
							width="50"
							height="50"
							alt=""
						></img>
						<div className="tool">Remove</div>
						<Button
							type="button"
							size="small"
							className="admin"
							onClick={handleAdmin}
						>
							Make admin
						</Button>
					</div>
				)}
				{isRemoveVisible && (
					<div className="picitem" onClick={handleRemoveClick}>
						<img
							className="UserPic"
							src={user2}
							width="50"
							height="50"
							alt=""
						></img>
						<div className="tool">Remove</div>
						<Button
							type="button"
							size="small"
							className="admin"
							onClick={handleAdmin}
						>
							Make admin
						</Button>
					</div>
				)}
				{isRemoveVisible && (
					<div className="picitem" onClick={handleRemoveClick}>
						<img
							className="UserPic"
							src={user2}
							width="50"
							height="50"
							alt=""
						></img>
						<div className="tool">Remove</div>
						<Button
							type="button"
							size="small"
							className="admin"
							onClick={handleAdmin}
						>
							Make admin
						</Button>
					</div>
				)}
				{isRemoveVisible && (
					<div className="picitem" onClick={handleRemoveClick}>
						<img
							className="UserPic"
							src={user1}
							width="50"
							height="50"
							alt=""
						></img>
						<div className="tool">Remove</div>
						<Button
							type="button"
							size="small"
							className="admin"
							onClick={handleAdmin}
						>
							Make admin
						</Button>
					</div>
				)}
				{isRemoveVisible && (
					<div className="picitem" onClick={handleRemoveClick}>
						<img
							className="UserPic"
							src={user2}
							width="50"
							height="50"
							alt=""
						></img>
						<div className="tool">Remove</div>
						<Button
							type="button"
							size="small"
							className="admin"
							onClick={handleAdmin}
						>
							Make admin
						</Button>
					</div>
				)}
				{isRemoveVisible && (
					<div className="picitem" onClick={handleRemoveClick}>
						<img
							className="UserPic"
							src={user2}
							width="50"
							height="50"
							alt=""
						></img>
						<div className="tool">Remove</div>
						<Button
							type="button"
							size="small"
							className="admin"
							onClick={handleAdmin}
						>
							Make admin
						</Button>
					</div>
				)}
			</div>
			<Button
				type="button"
				size="small"
				onClick={() => setOpen(true)}
				className="tool"
			>
				Add +
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Add member</DialogTitle>
				<DialogContent>
					<form
						onSubmit={(e) => {
							handleAddMember(e);
						}}
					>
						<TextField
							name="username"
							label="email"
							size="small"
							className="event-ienput"
							value={member}
							onChange={(e) => setMember(e.target.value)}
						/>
						<DialogActions>
							<Button type="reset" size="small" onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button type="submit" size="small">
								Save
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>

			<div className="options">
				<form
					onSubmit={(e) => {
						handleRename(e);
					}}
				>
					Rename{" "}
					<span className="Textfield">
						<input
							type="text"
							value={rename}
							onChange={(e) => setRename(e.target.value)}
						/>
						<Button type="submit" size="small" className="save">
							Save
						</Button>
					</span>{" "}
				</form>
			</div>
			<Button type="button" size="small" className="leavegrp">
				Leave group
			</Button>
			<Button type="button" size="small" className="leavegrp">
				Delete group
			</Button>
		</div>
	);
};

Gsettings.propTypes = {
	// getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getRoom: PropTypes.func.isRequired,
	// updateRoomId: PropTypes.func.isRequired,
	// clearRoom: PropTypes.func.isRequired,
	room: PropTypes.object.isRequired,
	updateRoomName: PropTypes.func.isRequired,
	addMember: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	room: state.room,
});

export default connect(mapStateToProps, {
	updateRoomName,
	getRoom,
	addMember,
})(Gsettings);
