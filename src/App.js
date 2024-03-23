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

const App = () => {
	const [user, setUser] = useState(null);
	const [elements, setElements] = useState([]);

	const server = "http://localhost:8000";

	const io = require("socket.io-client");

	const socket = io(server, {
		withCredentials: true,
		extraHeaders: {
			"my-custom-header": "abcd",
		},
	});

	socket.on("connect", () => {
		console.log("Connected to Socket.io server");
	});

	const socketJoinRoom = (data) => {
		socket.emit("userJoined", data);
		console.log("Room Joined");
	};

	const socketUpdateElements = (elementsCopy) => {
		setElements(elementsCopy.canvasElementsGlobal);
		console.log("socketUpdateElements");
	};

	const socketEmitElements = (elements) => {
		socket.emit("elements", elements);
		console.log("socketEmitElements");
	};

	useEffect(() => {
		console.log("getting user data");
		store.dispatch(loadUser());
		socket.on("servedElements", (elements) => {
			console.log("BEEN SERVERD ELEMENTS");
			socketUpdateElements(elements);
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
