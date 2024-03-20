import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
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

import { io } from "socket.io-client";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	// SocketIO
	const server = "http://localhost:8000";
	const connectionOptions = {
		"force new connection": true,
		reconnectionAttempts: "Infinity",
		timeout: 10000,
		transports: ["websocket"],
	};
	const socket = io(server, connectionOptions);

	console.log(socket.connected);

	useEffect(() => {
		console.log("getting user data");
		store.dispatch(loadUser());
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

	const [userNo, setUserNo] = useState(0);
	const [roomJoined, setRoomJoined] = useState(false);
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);

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
								<PrivateRoute>
									<Dashboard
										uuid={uuid}
										setRoomJoined={setRoomJoined}
										setUser={setUser}
										socket={socket}
									/>
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/:roomId"
							element={<CanvasPage userData={user} socket={socket} />}
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
