// import React, { useRef, useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import settingsIcon from '../../media/button-images/icon_settings.png'
// import { Link } from 'react-router-dom';
// import IconButton from './IconButton';
// import './GroupSettings/Gsettings.js';

// const options = [
// 	{
// 		name: "<<",
// 		scroll: false,
// 		backdrop: false,
// 	},
// ];

// const ToolBar = ({ handleToolChange, tool, name, ...props }) => {
// 	const [show, setShow] = useState(false);

// 	//Video chat state
// 	const [ myStream, setMyStream ] = useState()
// 	const [ peerVideos, setPeerVideos ] = useState([])
// 	const [ connectionRefs, setConnections ] = useState([])

// 	const myVideo = useRef()

// 	const handleClose = () => setShow(false);
// 	const toggleShow = () => setShow((s) => !s);

// 	const [value, setNewValue] = useState("");
// 	function handleChange(event) {
// 		let value = event.target.value;
// 		setNewValue(value);
// 		handleToolChange(value);
// 	}

// 	useEffect(() => {
// 		navigator.mediaDevices.getUserMedia({ video: true, audio: true}).then((stream) => {
// 			setMyStream(stream)
// 			myVideo.current.srcObject = stream;
// 			addPeerVideo(stream)
// 			addPeerVideo(stream)
// 			addPeerVideo(stream)
// 		})
// 		console.log("Useeffect")
// 	}, [])

// 	const addPeerVideo = (videoRef) => {
//         setPeerVideos(prevUserVideos => [...prevUserVideos, videoRef]);
//     };

//     const removePeerVideo = (userId) => {
//         const newVideos = peerVideos
//         delete newVideos[userId]
//         setPeerVideos(newVideos)
//     };

//     const addConnectionRef = (connectionRef) => {
//         setConnections(prevConnections => [...prevConnections, connectionRef]);
//     };

//     const destroyAllConnections = () => {
//         connectionRefs.forEach(connectionRef => {
//             if (connectionRef && connectionRef.current) {
//                 connectionRef.current.destroy();
//             }
//         });
//     };

//     // Example of removing a connection reference from the array
//     const removeConnectionRef = (userId) => {
//         const newRefs = connectionRefs
//         delete connectionRefs[userId]
//         setConnections(newRefs)
//     };

// 	const joinRoomVideo = () => {

// 	}

// 	return (
// 		<>
// 			<Button onClick={toggleShow} className="tool-bar-button">
// 				{name}
// 			</Button>
// 			<Offcanvas
// 				className="tool-bar-page"
// 				show={show}
// 				onHide={handleClose}
// 				{...props}
// 			>
// 				<Offcanvas.Header closeButton>
// 					<Offcanvas.Title>Tools</Offcanvas.Title>
// 				</Offcanvas.Header>
// 				<Offcanvas.Body>
// 					<div className="tool-menu">
// 						<Link to='/gsettings'>
//                         			<IconButton image={settingsIcon} />
//                     		</Link>
// 						<input
// 							type="radio"
// 							id="selection"
// 							checked={tool === "selection"}
// 							value={"selection"}
// 							onChange={() => handleToolChange("selection")}
// 						/>

// 						<label htmlFor="selection">Selection</label>
// 						<input
// 							type="radio"
// 							id="line"
// 							checked={tool === "line"}
// 							onChange={() => handleToolChange("line")}
// 						/>
// 						<label htmlFor="line">Line</label>
// 						<input
// 							type="radio"
// 							id="rectangle"
// 							checked={tool === "rectangle"}
// 							onChange={() => handleToolChange("rectangle")}
// 						/>
// 						<label htmlFor="rectangle">Rectangle</label>
// 						<input
// 							type="radio"
// 							id="pencil"
// 							checked={tool === "pencil"}
// 							onChange={() => handleToolChange("pencil")}
// 						/>
// 						<label htmlFor="pencil">Pencil</label>
// 						<input
// 							type="radio"
// 							id="text"
// 							checked={tool === "text"}
// 							onChange={() => handleToolChange("text")}
// 						/>
// 						<label htmlFor="text">Text</label>
// 					</div>
// 					<Button onClick={joinRoomVideo}>Join Video Call</Button>
// 					{myStream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
// 					{peerVideos.map((videoSrc, index) => (
//                             <video key={index} playsInline ref={videoRef => {
//                                 if (videoRef) {
//                                     videoRef.srcObject = videoSrc;
//                                 }
//                             }} autoPlay style={{ width: "300px" }} />
//                         ))}
// 				</Offcanvas.Body>
// 			</Offcanvas>
// 		</>
// 	);
// };

// const Example = ({ tool, handleToolChange }) => {
// 	return (
// 		<>
// 			{options.map((props, idx) => (
// 				<ToolBar
// 					tool={tool}
// 					handleToolChange={handleToolChange}
// 					key={idx}
// 					{...props}
// 					placement={"end"}
// 				/>
// 			))}
// 		</>
// 	);
// };

// // render(<Example />);
// export default Example;
import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import settingsIcon from '../../media/button-images/icon_settings.png'
// import line from '../../media/button-images/icon_line.png'
// import rectangle from '../../media/button-images/icon_rectangle.png'
// import pencil from '../../media/button-images/icon_pencil.png'
// import pointer from '../../media/button-images/icon_pointer.png'
// import text from '../../media/button-images/icon_text.png'
import { Link } from 'react-router-dom';
import IconButton from './IconButton';
import './GroupSettings/Gsettings.js';
import './ToolBar.css';


const options = [
	{
		name: "^",
		scroll: false,
		backdrop: false,
	},
];

const ToolBar = ({ handleToolChange, tool, name, ...props }) => {
	const [show, setShow] = useState(false);

	//Video chat state
	const [myStream, setMyStream] = useState();
	const [peerVideos, setPeerVideos] = useState([]);
	const [connectionRefs, setConnections] = useState([]);

	const myVideo = useRef();

	const handleClose = () => setShow(false);
	const toggleShow = () => setShow((s) => !s);

	const [value, setNewValue] = useState("");
	function handleChange(event) {
		let value = event.target.value;
		setNewValue(value);
		handleToolChange(value);
	}

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setMyStream(stream);
				myVideo.current.srcObject = stream;
				addPeerVideo(stream);
				addPeerVideo(stream);
				addPeerVideo(stream);
			});
		console.log("Useeffect");
	}, []);

	const addPeerVideo = (videoRef) => {
		setPeerVideos((prevUserVideos) => [...prevUserVideos, videoRef]);
	};

	const removePeerVideo = (userId) => {
		const newVideos = peerVideos;
		delete newVideos[userId];
		setPeerVideos(newVideos);
	};

	const addConnectionRef = (connectionRef) => {
		setConnections((prevConnections) => [...prevConnections, connectionRef]);
	};

	const destroyAllConnections = () => {
		connectionRefs.forEach((connectionRef) => {
			if (connectionRef && connectionRef.current) {
				connectionRef.current.destroy();
			}
		});
	};

	// Example of removing a connection reference from the array
	const removeConnectionRef = (userId) => {
		const newRefs = connectionRefs;
		delete connectionRefs[userId];
		setConnections(newRefs);
	};

	const joinRoomVideo = () => {};

	return (
		<>
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
						<Link to="/gsettings">
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
						<Button onClick={joinRoomVideo} className= "vbtn"> Join Video Call</Button>
					{myStream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
					{peerVideos.map((videoSrc, index) => (
                            <video key={index} playsInline ref={videoRef => {
                                if (videoRef) {
                                    videoRef.srcObject = videoSrc;
                                }
                            }} autoPlay style={{ width: "300px" }} />
                        ))}
				    <Button  className= "vbtn">Share File</Button>
					</div>					
					{/* </div> */}
					<Button onClick={joinRoomVideo}>Join Video Call</Button>
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
					))}

				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

const Example = ({ tool, handleToolChange }) => {
	return (
		<>
			{options.map((props, idx) => (
				<ToolBar
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
export default Example;
