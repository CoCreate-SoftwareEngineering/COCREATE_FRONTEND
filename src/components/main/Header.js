import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'
import {logout} from '../../actions/auth'
import profilePicture from '../../person-icon.jpg'
// import logo from "../../../public/person-icon.jpg"

const Header = ({getCurrentProfile, auth: {user}, profile: {profile, loading}, logout}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

  return (
    <header className="header flex text-white">
            <div className="profile flex">
                {/* <img src={profilePicture} className="profile-img" alt="Picture" width="500" height="600"></img> */}
                {/* Have to add to backend */}
                <h2 className="fs-24">{user && user.firstName} {user && user.lastName}</h2>
            </div>
            <div className="title">
                <h1 className="fs-28">AURORA TRACKER</h1>
            </div>
            <div className="menu">
                <a className="logOut" onClick={logout}>Log Out</a>
                {/* <i className="menu-icon fa-solid fa-bars fa-2xl"></i> */}
            </div>
    </header>
  )
}

Header.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({    
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, logout})(Header)