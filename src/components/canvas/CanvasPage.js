import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Container from "react-bootstrap/Container";

import CanvasPageHeader from "../main/CanvasPageHeader";
import Spinner from "../main/Spinner";
// import AddModal from './AddModal'
// import Body from '../main/Body'
import Canvas from "./Canvas";
import Example from "./ToolBar";

const CanvasPage = ({
	socket,
	userData,
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [loading]);

	const [tool, setTool] = useState("line");

	function handleToolChange(newTool) {
		setTool(newTool);
	}

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			{/* <Container className="container"> */}
			<CanvasPageHeader />
			<Example tool={tool} handleToolChange={handleToolChange} />
			<Canvas
				tool={tool}
				handleToolChange={handleToolChange}
				user={userData}
				socket={socket}
			/>
			{/* </Container> */}
		</Fragment>
	);
};

// Dashboard.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(CanvasPage);
