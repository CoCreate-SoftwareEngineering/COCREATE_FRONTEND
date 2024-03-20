import React from 'react'
import {Route, Navigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Dashboard from '../dashboard/Dashboard'

const PrivateRoute = ({component: Component, auth: {isAuthenticated, loading}, children, ...rest}) => {
    // return !isAuthenticated && !loading ? children : <Navigate to='/login' />
    return !isAuthenticated && !loading ? (<Navigate to='/login' />) : children
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)