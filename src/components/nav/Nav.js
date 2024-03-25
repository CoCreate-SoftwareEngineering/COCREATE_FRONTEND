import React, { useState, useEffect } from "react";
import "./Nav.css";
import NotificationBox from "../notification_box/NotificationBox.js";
import logoImg from "../../media/Co_Create_Logo_blue.png";
import msgImg from "../../media/Msg_Icon.png";
import profileImg from "../../media/Darwizzy.jpg";
import userImg1 from "../../media/ProfileImg1.jpg";
import { Link } from "react-router-dom";

const OurNav = () => {
  //Lambda style of return, is more compact and cleaner

  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch user data from backend when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from your API endpoint
      //Apparently the below line needs to replace "/api/users/me" with the correct endpoint to fetch the user's data in your backend API
      //IDK what that means doe
      const response = await fetch("/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add any necessary authentication headers
          // such as authorization token
          //This is some shitty GPT code. God knows what this does
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };  

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
            <Link to="/profile">
              <img
                className="Userpic"
                src={profileImg}
                width="47"
                height="47"
              ></img>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <div className="Username">{user ? `${user.firstName} ${user.lastName}` : "Loading..."}</div>
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
          <li style={{marginRight:0, width:50}}>
            <div className="dropdown">
              <button
                className="btn btn-secondary DropBtn"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={msgImg}
                  alt="CoCreate"
                  width="50"
                  height="30"
                ></img>
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
                      <Link to="/home">
                        <img
                          className="ProfilePic"
                          src={userImg1}
                          width="50"
                          height="50"
                        ></img>
                      </Link>
                    </li>
                    <li className="Message">
                      <Link to="/home">
                        <img
                          className="ProfilePic"
                          src={userImg1}
                          width="50"
                          height="50"
                        ></img>
                      </Link>
                    </li>
                    <li className="Message">
                      <Link to="/home">
                        <img
                          className="ProfilePic"
                          src={userImg1}
                          width="50"
                          height="50"
                        ></img>
                      </Link>
                    </li>
                    <li className="Message">
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

export default OurNav;
