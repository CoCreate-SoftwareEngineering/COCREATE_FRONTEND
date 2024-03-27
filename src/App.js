import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import Header from "./components/main/Header";
import Body from "./components/main/Body";
import Card from "./components/main/Card";
import Landing from "./components/main/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/main/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CanvasPage from "./components/canvas/CanvasPage";
import Faq from "./components/main/Faq";

import Gsettings from "./components/canvas/GroupSettings/Gsettings";

//KACPER WUZ HEER
import ProfilePage from './components/ProfilePage/ProfilePage';
import Chat from './components/messaging/Chat';
import FAQ from './components/dashboard/FAQ/faq'
//KACPER ESCAPES

// import "bootstrap/dist/css/bootstrap.min.css";

// import { io } from "socket.io-client";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import peer from "simple-peer";
import room from "./reducers/room";

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

const App = () => {
	const [user, setUser] = useState(null);
	// const [elements, setElements, undo, redo] = useHistory([]);
	const [elements, setElements] = useState([]);
	const [roomId, setRoomId] = useState("");

	const [ messages, setMessages] = useState([])

	const [peerSockets, setPeerSockets ] = useState([])

	const addPeerSocket = (peerSocketId) => {
		setPeerSockets((prevPeerSockets) => [...prevPeerSockets, peerSocketId]);
	  };

	const server = "http://localhost:8000";

	const io = require("socket.io-client");

	const socket = io(server, {
		withCredentials: true,
		extraHeaders: {
			"my-custom-header": "abcd",
		},
	});

	const sendRoomMessage = (message) => {
		socket.emit("chatMessage", {message: message, room: roomId})
	}

	socket.on("chatMessage", (message) => {
		setMessages((prevMessages) => [...prevMessages, message]);
	})

	//KACPER WUZ HEER
	socket.on('MsgConnection', () => {
        console.log(`I'm connected with the back-end`);
	});
	//KACPER ESCAPES

	socket.on("connect", () => {
		console.log("Connected to Socket.io server");
	});

	socket.on("roomUsers", (socketIds) => {
		//console.log("RECEIVED ROOM USERS")
		console.log("my id: " + socket.id)
		console.log("got list of people in: " + socketIds)

		setPeerSockets(socketIds)
		
		// socketIds.forEach((id) => {
		// 	addPeerSocket(id)
		// })

	})

	useEffect(() => {
		console.log("peerSockets updated to: " + peerSockets)
	}, [peerSockets])

	const socketJoinRoom = (roomId) => {
		socket.emit("userJoined", roomId);
		setRoomId(roomId);
		console.log("Room Joined");
	};

	const callUser = (id) => {
		console.log("calling user " + id)
	}

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

	const socketDisconnect = () => {
		socket.disconnect();
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
						<Route exact path = "/profilepage" element={<ProfilePage/>}></Route>
						<Route exact path="/chat" element={<Chat />} />
						<Route exact path="/faq" element={<FAQ />} />
						<Route
							exact
							path="/dashboard"
							element={
								<PrivateRoute>
									<Dashboard
										uuid={uuid}
										socket={socket}
										socketJoinRoom={socketJoinRoom}
										elements={elements}
										setRoomId={setRoomId}
										roomId={roomId}
									/>
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/:roomId"
							element={
								<PrivateRoute>
									<CanvasPage
										userData={user}
										socket={socket}
										elements={elements}
										setElements={setElements}
										socketEmitElements={socketEmitElements}
										peerSockets={peerSockets}
										callUser={callUser}
										sendRoomMessage={sendRoomMessage}
										messages={messages}
										// roomId={roomId}
										socketDisconnect={socketDisconnect}
										// undo={undo}
										// redo={redo}
										// useHistory={useHistory}
									/>
								</PrivateRoute>
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
