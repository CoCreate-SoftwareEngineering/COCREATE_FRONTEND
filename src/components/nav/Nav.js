import "./Nav.css";
import NotificationBox from "../notification_box/NotificationBox.js";
import logoImg from "../../media/Co_Create_Logo_blue.png";
import msgImg from "../../media/Msg_Icon.png";
import profileImg from "../../media/Darwizzy.jpg";
import userImg1 from "../../media/ProfileImg1.jpg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const OurNav = ({ user, isAuthenticated }) => {
	//Lambda style of return, is more compact and cleaner

	return (
		<div className="Outside">
			<div>
				<ul>
					<li>
						<Link to="/home">
							<img src={logoImg} width="50" height="50"></img>
						</Link>
					</li>
					<li>
						<Link to="/home">
							<img
								className="ProfilePic"
								src={profileImg}
								width="47"
								height="47"
							></img>
						</Link>
					</li>
					<li>
						<Link to="/home">
							<div className="Username">
								<p>{/* {user.firstName} {user.lastName} */}</p>
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
						<div class="dropdown">
							<button class="DropBtn">
								<img src={msgImg} alt="CoCreate" width="50" height="50"></img>
							</button>
							<div class="dropdown-menu MsgGrid dropdown-menu-end">
								<div>
									<h2 class="DropdownHeader">
										Messages
										<span class="AddSymbols">+ &#x1F4DE; &#128249;</span>
									</h2>
									<ul class="DropdownLinks">
										<li class="Message">
											<Link to="/home">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li class="Message">
											<Link to="/home">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li class="Message">
											<Link to="/home">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li class="Message">
											<Link to="/home">
												<img
													className="ProfilePic"
													src={userImg1}
													width="50"
													height="50"
												></img>
											</Link>
										</li>
										<li class="Message">
											<Link to="/home">
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
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps)(OurNav);
