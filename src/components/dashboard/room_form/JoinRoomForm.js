import React, { useState, Fragment } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

// Imports
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { addRoom } from "../../../actions/profile";
import { createRoom } from "../../../actions/profile";

import "./JoinRoomForm.css";

const JoinRoomForm = ({
	uuid,
	user,
	setRoomJoined,
	socket,
	createRoom,
	addRoom,
	socketJoinRoom,
}) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [roomId, setRoomId] = useState("");
	const [roomName, setRoomName] = useState("");
	const [joinName, setJoinName] = useState("");
	const [joinRoomId, setJoinRoomId] = useState("");

	const navigate = useNavigate();

	const handleJoinSubmit = (e) => {
		e.preventDefault();

		const roomData = {
			roomId,
			roomName: roomName,
			userId: uuid(),
			userName: joinName,
			host: false,
			presenter: false,
		};

		socketJoinRoom(roomData);
		// socket.emit("userJoined", roomData);
		addRoom({ roomId: roomId, roomName: "roomName" });
		console.log("Room form submit");
		navigate(`/${roomId}`);
	};

	const handleCreateSubmit = async (e) => {
		e.preventDefault();
		if (!roomName) return toast.dark("Please enter your name!");

		const roomData = {
			roomId,
			userId: uuid(),
			userName: "username",
			host: true,
			presenter: true,
		};

		// socket.emit("userJoined", roomData);
		socketJoinRoom(roomData);

		await createRoom({
			roomName: roomName,
			roomId: roomId,
			elements: [],
		});
		addRoom({ roomId: roomId, roomName: roomName });
		navigate(`/${roomId}`);
	};

	return (
		<Fragment>
			<div className="add-project-container">
				<Button
					variant="primary"
					onClick={handleShow}
					className="add-location-btn"
				>
					+
				</Button>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Join or Create a Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="join-room-container">
						<div className="col-md-5 p-5 border mx-auto my-auto">
							<h1 className="text-center text-primary mb-4">Join Room</h1>
							<form onSubmit={handleJoinSubmit}>
								<div className="form-group my-2">
									<input
										type="text"
										className="form-control outline-0"
										value={roomId}
										onChange={(e) => setRoomId(e.target.value)}
										placeholder="Room Id"
										style={{
											boxShadow: "none",
										}}
									/>
								</div>
								<div className="form-group mt-3">
									<button type="submit" className="form-control btn btn-dark">
										Join
									</button>
								</div>
							</form>
						</div>
						<div className="col-md-5 p-5 border mx-auto my-auto">
							<h1 className="text-center text-primary mb-4">Create Room</h1>
							<form onSubmit={handleCreateSubmit}>
								<div className="form-group my-2">
									<input
										type="text"
										placeholder="Room Name"
										className="form-control"
										value={roomName}
										onChange={(e) => setRoomName(e.target.value)}
									/>
								</div>
								<div className="input-group my-2 border align-items-center">
									<input
										type="text"
										className="form-control border-0 outline-0"
										placeholder="Room ID"
										value={roomId}
										readOnly={true}
										style={{
											boxShadow: "none",
											zIndex: "0 !important",
											fontsize: "0.89rem !important",
										}}
									/>
									<div className="input-group-append">
										<button
											className="btn btn-outline-primary  border-0 btn-sm"
											type="button"
											onClick={() => setRoomId(uuid())}
										>
											Generate
										</button>										
									</div>
									
								</div>
								<CopyToClipboard
											text={roomId}
											onCopy={() =>
												toast.success("Room Id Copied To Clipboard!")
											}
										>
											<button
												className="btn btn-outline-dark border-0 btn-sm"
												type="button"
											>
												Copy
											</button>
										</CopyToClipboard>
								<div className="form-group mt-3">
									<button type="submit" className="form-control btn btn-dark">
										Create Room
									</button>
								</div>
							</form>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</Fragment>
	);
};

JoinRoomForm.propTypes = {
	createRoom: PropTypes.func.isRequired,
	addRoom: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.user,
});

export default connect(mapStateToProps, { createRoom, addRoom })(JoinRoomForm);
