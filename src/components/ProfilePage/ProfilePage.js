import profileImg from '../../media/Darwizzy.jpg';
import { Link } from 'react-router-dom'
import logoImg from "../../media/Co_Create_Logo_blue.png";
import './ProfilePage.css'
import React, { useState } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const ProfilePage = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading}
}) => {
  
   // State to track the width value
   const [width, setWidth] = useState(80); // Set initial width value to 80

   // Function to handle width change
   const handleWidthChange = (event) => {
       const newWidth = parseInt(event.target.value);
       if (!isNaN(newWidth) && newWidth >= 0 && newWidth <= 100) {
           setWidth(newWidth);
       }
   };
  
   return (
    <section style={{ backgroundColor: '#EFE7E7' }}>
        <div className="container py-5" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <div className="row align-items-stretch"> {/* Added align-items-stretch class */}
                <div className="col">
                    <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                        <ol className="breadcrumb mb-0">
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">
                                    <img src={logoImg} alt="Home" className="rounded-circle img-fluid" style={{ width: '47px' }} />
                                </Link>
                            </li>
                            <li className="breadcrumb-item active inter-font" style={{ fontFamily: 'sans-serif' }} aria-current="page">User Profile</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row align-items-stretch"> {/* Added align-items-stretch class */}
                <div className="col-lg-4">
                    <div className="card mb-4 h-100"> {/* Added h-100 class */}
                        <div className="card-body text-center d-flex flex-column justify-content-between h-100"> {/* Added d-flex, flex-column, and justify-content-between classes */}
                            <div className="d-flex justify-content-center">
                                <img src={profileImg} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                            </div>
                            <h5 className="my-3" style={{ fontFamily: 'Inter, sans-serif' }}>{`${user.firstName} ${user.lastName}`}</h5>
                            <p className="text-muted mb-4"></p>
                            <div className="d-flex justify-content-center mb-2">
                                {/* <button type="button" className="btn btn-outline-primary ms-1">Check User Details</button> */}
                                <button type="button" className="btn btn-danger ms-1" style={{ fontWeight: 'bold', color: 'white' }}>DELETE ACCOUNT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4 h-100"> {/* Added h-100 class */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0 user-details-heading">User Details</p>
                                </div>
                            </div>


                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">First Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.firstName}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Last Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.lastName}</p>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

ProfilePage.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(
	ProfilePage
);