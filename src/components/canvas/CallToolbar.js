import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import settingsIcon from "../../media/button-images/icon_settings.png";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";
import "./GroupSettings/Gsettings.js";
import "./CallToolbar.css";
import TextField from '@mui/material/TextField';
import ChatArea from "./ChatArea.js";

const options = [
	{
		name: "<<",
		scroll: false,
		backdrop: false,
	},
];

const CallToolbar = ({ name, peerSockets, callUser, ...props }) => {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);

    //Video chat state
	const [myStream, setMyStream] = useState();
	const [peerVideos, setPeerVideos] = useState([]);
	const [connectionRefs, setConnections] = useState([]);

    const myVideo = useRef();


	const joinRoomVideo = () => {};

	return (
		<>
			<Button onClick={toggleShow} className="call-tool-bar-button">
				{name}
			</Button>
			<Offcanvas
				className="call-tool-bar-page"
				show={show}
				onHide={handleClose}
				{...props}
			>
				<Offcanvas.Header closeButton>
				<span className="numonline">{`Online: ${peerSockets.length}`}</span>	<Offcanvas.Title>Calls</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div className="call-tool-menu">
						<ChatArea/>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

const CallToolbarWrapper = ({ tool, handleToolChange, peerSockets, callUser }) => {
	return (
		<>
			{options.map((props, idx) => (
				<CallToolbar
					tool={tool}
					handleToolChange={handleToolChange}
                    peerSockets={peerSockets}
                    callUser={callUser}
					key={idx}
					{...props}
					placement={"end"}
				/>
			))}
		</>
	);
};

// render(<Example />);
export default CallToolbarWrapper;