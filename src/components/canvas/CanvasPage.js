import React, { useEffect, useLayoutEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Container from "react-bootstrap/Container";

import CanvasPageHeader from "./CanvasPageHeader";
import Spinner from "../main/Spinner";
// import AddModal from './AddModal'
// import Body from '../main/Body'
import Canvas from "./Canvas";
import Example from "./ToolBar";
import { getRoom } from "../../actions/rooms";

const CanvasPage = ({
	socket,
	userData,
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
	elements,
	setElements,
	socketEmitElements,
	// roomId,
	socketDisconnect,
	getRoom,
	room: { roomLoading, room },
	// useHistory,
	// undo,
	// redo,
}) => {
	const [tool, setTool] = useState("line");
	// const [room, setRoom] = useState(null);

	useEffect(() => {
		getCurrentProfile();
	}, [loading]);

	useEffect(() => {
		// // getRoom(room.roomId);
		// setElements(room.elements);
		// console.log("CANVAS PAGE: GET ROOM");
		// console.log(room.elements);
		// console.log(elements);
	}, [roomLoading]);

	function handleToolChange(newTool) {
		setTool(newTool);
		console.log(tool);
	}

	return room === null ? (
		<Spinner />
	) : (
		<Fragment>
			{/* <Container className="container"> */}
			<CanvasPageHeader />
			<Example tool={tool} handleToolChange={handleToolChange} />
			<Canvas
				tool={tool}
				handleToolChange={handleToolChange}
				user={userData}
				socket={socket}
				elements={elements}
				setElements={setElements}
				socketEmitElements={socketEmitElements}
				socketDisconnect={socketDisconnect}

				// useHistory={useHistory}
				// undo={undo}
				// redo={redo}
			/>
			{/* </Container> */}
		</Fragment>
	);
};

CanvasPage.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getRoom: PropTypes.func.isRequired,
	room: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
	room: state.room,
});

export default connect(mapStateToProps, { getCurrentProfile, getRoom })(
	CanvasPage
);
