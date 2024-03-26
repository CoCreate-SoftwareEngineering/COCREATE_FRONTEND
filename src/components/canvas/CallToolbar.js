import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import settingsIcon from "../../media/button-images/icon_settings.png";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";
import "./GroupSettings/Gsettings.js";
import "./CallToolbar.css";

const options = [
	{
		name: "<<",
		scroll: false,
		backdrop: false,
	},
];

const CallToolbar = ({ name, ...props }) => {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);

    //Video chat state
	const [myStream, setMyStream] = useState();
	const [peerVideos, setPeerVideos] = useState([]);
	const [connectionRefs, setConnections] = useState([]);

    const myVideo = useRef();

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setMyStream(stream);
				console.log(stream)
				myVideo.current.srcObject = stream;
			});
		console.log("Useeffect");
	}, [myVideo.current]);

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
					<Offcanvas.Title>Calls</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div className="call-tool-menu">
                        <Button onClick={() => {console.log("join video button")}}>Join Video Call</Button>
                        {myStream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                        <p1>Text</p1>
                        <p1>Text2</p1>
                        <p1>Text3</p1>
                        {/* {peerVideos.map((videoSrc, index) => (
                            <video key={index} playsInline ref={videoRef => {
                                if (videoRef) {
                                    videoRef.srcObject = videoSrc;
                                }
                            }} autoPlay style={{ width: "300px" }} />
                        ))}
                        {myStream && (
						<video
							playsInline
							muted
							ref={myVideo}
							autoPlay
							style={{ width: "300px" }}
						/>
					)}
					{peerVideos.map((videoSrc, index) => (
						<video
							key={index}
							playsInline
							ref={(videoRef) => {
								if (videoRef) {
									videoRef.srcObject = videoSrc;
								}
							}}
							autoPlay
							style={{ width: "300px" }}
						/>
					))} */}
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

const CallToolbarWrapper = ({ tool, handleToolChange }) => {
	return (
		<>
			{options.map((props, idx) => (
				<CallToolbar
					tool={tool}
					handleToolChange={handleToolChange}
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