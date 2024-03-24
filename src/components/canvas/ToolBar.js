import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import settingsIcon from '../../media/button-images/icon_settings.png'
import { Link } from 'react-router-dom';
import IconButton from './IconButton';
import './GroupSettings/Gsettings.js';

const options = [
	{
		name: "<<",
		scroll: false,
		backdrop: false,
	},
];

const ToolBar = ({ handleToolChange, 
					tool, 
					name, 
					myStream, 
					setMyStream,
					peerVideos, 
					setPeerVideos,
					connectionRefs,
					setConnections, 
					joinRoomVideo, 
					...props }) => {
	console.log("Peer Videos 3: " + peerVideos)
	const [show, setShow] = useState(false);

	const myVideo = useRef()

	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);

	const [value, setNewValue] = useState("");
	function handleChange(event) {
		let value = event.target.value;
		setNewValue(value);
		handleToolChange(value);
	}

	useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true}).then((stream) => {
			setMyStream(stream)
			myVideo.current.srcObject = stream;
		})
		console.log("peerVideos: " + peerVideos)
	}, [])


	return (
		<>
			{console.log("PeerVideos3: " + peerVideos)}
			<Button onClick={toggleShow} className="tool-bar-button">
				{name}
			</Button>
			<Offcanvas
				className="tool-bar-page"
				show={show}
				onHide={handleClose}
				{...props}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Tools</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<div className="tool-menu">
						<Link to='/gsettings'>           
                        			<IconButton image={settingsIcon} />    
                    		</Link> 
						<input
							type="radio"
							id="selection"
							checked={tool === "selection"}
							value={"selection"}
							onChange={() => handleToolChange("selection")}
						/>

						<label htmlFor="selection">Selection</label>
						<input
							type="radio"
							id="line"
							checked={tool === "line"}
							onChange={() => handleToolChange("line")}
						/>
						<label htmlFor="line">Line</label>
						<input
							type="radio"
							id="rectangle"
							checked={tool === "rectangle"}
							onChange={() => handleToolChange("rectangle")}
						/>
						<label htmlFor="rectangle">Rectangle</label>
						<input
							type="radio"
							id="pencil"
							checked={tool === "pencil"}
							onChange={() => handleToolChange("pencil")}
						/>
						<label htmlFor="pencil">Pencil</label>
						<input
							type="radio"
							id="text"
							checked={tool === "text"}
							onChange={() => handleToolChange("text")}
						/>
						<label htmlFor="text">Text</label>
					</div>
					<Button onClick={() => joinRoomVideo()}>Join Video Call</Button>
					{console.log("peerVideos3: " + peerVideos)}
					{myStream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
					{peerVideos.map((videoSrc, index) => (
                            <video key={index} playsInline ref={videoRef => {
                                if (videoRef) {
                                    videoRef.srcObject = videoSrc;
                                }
                            }} autoPlay style={{ width: "300px" }} />
                        ))}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

const Example = ({ tool, handleToolChange, myStream, setMyStream, peerVideos, setPeerVideos, connectionRefs, setConnections, joinRoomVideo }) => {
	return (
		<>
			{options.map((props, idx) => (
				<ToolBar
					tool={tool}
					handleToolChange={handleToolChange}
					myStream={myStream}
					setMyStream={setMyStream}
					peerVideos={peerVideos}
					setPeerVideos={setPeerVideos}
					connectionRefs={connectionRefs}
					setConnections={setConnections}
					joinRoomVideo={joinRoomVideo}
					key={idx}
					{...props}
					placement={"end"}
				/>
			))}
		</>
	);
};

// render(<Example />);
export default Example;
