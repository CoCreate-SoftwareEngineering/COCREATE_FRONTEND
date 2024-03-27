import React, { useState, useEffect } from "react";
import "./Nav.css";
import NotificationBox from "../notification_box/NotificationBox.js";
import logoImg from "../../media/Co_Create_Logo_blue.png";
import msgImg from "../../media/Msg_Icon.png";
import profileImg from "../../media/Darwizzy.jpg";
import userImg1 from "../../media/ProfileImg1.jpg";
import { Link } from "react-router-dom";
import profile from "../../reducers/profile.js";

import { auth } from '../auth/FireBase-config.js'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import { logout } from "../../actions/auth";
import { signOut } from "firebase/auth";


const OurNav = ({ user, logout }) => {
	//Lambda style of return, is more compact and cleaner
	return (
		<div className="Outside">
			<div>
				<ul>
					<li>
						<Link to="/home">
							<img
								className="Logoimg"
								src={logoImg}
								width="50"
								height="50"
							></img>
						</Link>
					</li>
					<li>
						<Link to="/profilepage">
							<img
								className="Userpic"
								src={profileImg}
								width="47"
								height="47"
							></img>
						</Link>
					</li>
					<li>
						<Link to="/profilepage">
							<div className="Username">
								{/* {user.firstName} {user.lastName} */}
							</div>
						</Link>
					</li>
				</ul>
			</div>
			<div></div>
			<div>
				<ul>
					<li>
						<form className="SearchBar">
							<input
								className="nav-input"
								type="search"
								placeholder="Search"
								aria-label="Search"
							></input>
						</form>
					</li>
					<li>
						<button
							className=""
							onClick={async () => {
								logout();
								// disconnect from firebase
								await signOut(auth);
							}}
						>
							Logout
						</button>
					</li>
					<li style={{ marginRight: 0, width: 50 }}>
						<div className="dropdown">
							<button
								className="btn btn-secondary DropBtn"
								type="button"
								id="dropdownMenuButton"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<img src={msgImg} alt="CoCreate" width="50" height="30"></img>
							</button>
							<div className="dropdown-menu MsgGrid dropdown-menu-end">
								<div>
									<h2 className="DropdownHeader">
										Messages
										<span className="AddSymbols">+ &#x1F4DE; &#128249;</span>
									</h2>
									<ul className="DropdownLinks">
										<li className="Message">
											<Link to="/chat">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li className="Message">
											<Link to="/chat">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li className="Message">
											<Link to="/chat">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li className="Message">
											<Link to="/chat">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li className="Message">
											<Link to="/chat">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</li>
					<li className="NotificationBox">
						<NotificationBox num={5} />
					</li>
				</ul>
			</div>
		</div>
	);
};

OurNav.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	// user: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	// user: state.auth.user,
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(OurNav);
