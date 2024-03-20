import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}

	return <div>Landing</div>;
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
