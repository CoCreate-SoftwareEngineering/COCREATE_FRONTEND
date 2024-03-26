import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import Landing from "./components/main/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/main/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CanvasPage from "./components/canvas/CanvasPage";

import Gsettings from './components/canvas/GroupSettings/Gsettings'; 

//import SimplePeer from './libs/simplepeer.min.js'
import Peer from 'simple-peer';

// import "bootstrap/dist/css/bootstrap.min.css";

// import { io } from "socket.io-client";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

// const useHistory = (initialState) => {
// 	const [index, setIndex] = useState(0);
// 	const [history, setHistory] = useState([initialState]);

// 	const setState = (action, overwrite = false) => {
// 		const newState =
// 			typeof action === "function" ? action(history[index]) : action;
// 		if (overwrite) {
// 			const historyCopy = [...history];
// 			historyCopy[index] = newState;
// 			setHistory(historyCopy);
// 		} else {
// 			const updatedState = [...history].slice(0, index + 1);
// 			setHistory([...updatedState, newState]);
// 			setIndex((prevState) => prevState + 1);
// 		}
// 	};

// 	const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
// 	const redo = () =>
// 		index < history.length - 1 && setIndex((prevState) => prevState + 1);

// 	return [history[index], setState, undo, redo];
// };

const server = "http://localhost:8000";

const io = require("socket.io-client");

console.log("pre socket")
	const socket = io(server, {
		withCredentials: true,
		extraHeaders: {
			"my-custom-header": "abcd",
		},
	});
	console.log("Opening socket id: " + socket.id)

const App = () => {
	const [user, setUser] = useState(null);
	// const [elements, setElements, undo, redo] = useHistory([]);
	const [elements, setElements] = useState([]);

	//Video calling state
	const [ myStream, setMyStream ] = useState(null)
	const [ peerVideos, setPeerVideos ] = useState([])
	const [ connectionRefs, setConnections ] = useState([])
	const [ peerSockets, setPeerSockets ] = useState([])
	const [ calling, setCalling ] = useState(false)

	socket.on("connect", () => {
		console.log("Connected to Socket.io server");
	});

	socket.on("roomUsers", (socketIds) => {
		//console.log("RECEIVED ROOM USERS")
		console.log("Got list of sockets in room: " + socketIds)
		socketIds.forEach((id) => {
			addPeerSocket(id)
		})

	})

	socket.on("callUser", (data) => {
		answerCall(data)
	})

	const callUser = (socketId) => {
		console.log("Making peer object")
		const peer = new Peer ({
			initiator: true,
			trickle: false,
			stream: myStream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: socketId,
				signalData: data,
				from: socket.id,
			})
		})
		peer.on("stream", (stream) => {
			addPeerVideo(stream)
		})
		socket.on("callAccepted", (signal) => {
			setCalling(true)
			peer.signal(signal)
		})
		addConnectionRef(peer)
	}

	const answerCall = (callData) => {
		setCalling(true)
		console.log("Making peer object")
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: myStream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: callData.from, from: socket.id })
		})
		peer.on("stream", (stream) => {
			addPeerVideo(stream)
		})
		peer.signal(callData.signal)
		addConnectionRef(peer)
	}


	const socketJoinRoom = (data) => {
		socket.emit("userJoined", data);
		console.log("Room Joined");
	};

	const socketUpdateElements = (newElement) => {
		console.log(newElement);
		if (elements.typeof != "undefined") {
			// setElements((elements) => [...elements, newElement]);
			setElements(newElement, true);
		}
		console.log("socketUpdateElements: ");
		console.log(elements);
	};

	const socketEmitElements = (elements) => {
		socket.emit("elements", elements);
		console.log("socketEmitElements");
	};

	useEffect(() => {

		console.log("getting user data");
		store.dispatch(loadUser());
		socket.on("servedElements", (receivedElements) => {
			console.log("BEEN SERVERD ELEMENTS");
			if (elements != receivedElements) {
				socketUpdateElements(receivedElements);
			}
		});
	}, []);

	const joinRoomVideo = () => {
		console.log("Call button clicked")
		peerSockets.forEach((id) => {
			console.log("Calling " + id)
			callUser(id)
		})
		//console.log("My id: " + socket.id)
	}

	const addPeerSocket = (socketId) => {
		setPeerSockets(prevPeerSockets => [... prevPeerSockets, socketId])
	}

	const removePeerSocket = (socketId) => {
		setPeerSockets(prevPeerSockets => [... prevPeerSockets, socketId])
	}

	const addPeerVideo = (videoRef) => {
        setPeerVideos(prevUserVideos => [...prevUserVideos, videoRef]);
    };
	
    const removePeerVideo = (userId) => {
        const newVideos = peerVideos
        delete newVideos[userId]
        setPeerVideos(newVideos)
    };

    const addConnectionRef = (connectionRef) => {
        setConnections(prevConnections => [...prevConnections, connectionRef]);
    };

    const destroyAllConnections = () => {
        connectionRefs.forEach(connectionRef => {
            if (connectionRef && connectionRef.current) {
                connectionRef.current.destroy();
            }
        });
    };

    // Example of removing a connection reference from the array
    const removeConnectionRef = (userId) => {
        const newRefs = connectionRefs
        delete connectionRefs[userId]
        setConnections(newRefs)
    };

	// UUID Function to be moved
	const uuid = () => {
		let S4 = () => {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (
			S4() +
			S4() +
			"-" +
			S4() +
			"-" +
			S4() +
			"-" +
			S4() +
			"-" +
			S4() +
			S4() +
			S4()
		);
	};

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Alert />
					{/* Have to style Alert */}
					<Routes>
						<Route exact path="/" element={<Landing />}></Route>
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/gsettings" element={<Gsettings />} />
						<Route
							exact
							path="/dashboard"
							element={
								// <PrivateRoute>
								<Dashboard
									uuid={uuid}
									socket={socket}
									socketJoinRoom={socketJoinRoom}
									elements={elements}
								/>
								// </PrivateRoute>
							}
						/>
						<Route
							exact
							path="/:roomId"
							element={
								<CanvasPage
									userData={user}
									socket={socket}
									elements={elements}
									setElements={setElements}
									socketEmitElements={socketEmitElements}
									myStream={myStream}
									setMyStream={setMyStream}
									peerVideos={peerVideos}
									setPeerVideos={setPeerVideos}
									connectionRefs={connectionRefs}
									setConnections={setConnections}
									joinRoomVideo={joinRoomVideo}
									peerSockets={peerSockets}
									setPeerSockets={setPeerSockets}
									// undo={undo}
									// redo={redo}
									// useHistory={useHistory}
								/>
							}
						/>
						{/* <Route exact path="/canvas" element={<CanvasPage userData={user} socket={socket}/>} /> */}
					</Routes>
					{/* <Header/>
          <Body/> */}
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;