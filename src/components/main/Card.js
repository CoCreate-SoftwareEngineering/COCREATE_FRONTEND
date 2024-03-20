import React from 'react'

import Hour from './Hour.js'
import Day from './Day'

import {deleteLocation} from '../../actions/profile'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Card = ({locations, deleteLocation}) => {
    const onSubmit = async location => {
        console.log(location)
        console.log(location.id)
        // location.preventDefault()
        deleteLocation(location.id)
    }

    return (
        <div>
    {locations.map((location) => {
        console.log(location)
        return (
    <div className="card-main" key={location}>
        <div className="card-header grid">
            <h2>{location.name}</h2>
            <div className="delete-btn-container">
                <button className="delete-btn" onClick={() => onSubmit(location)}>
                    <i className="fa-solid fa-xmark fa-xl delete-icon"></i>
                </button>
            </div>
        </div>
        <div className="card-content flex">
            <Hour data={location.data.slice(0,8)} lat={location.lat}/>
            {/* <div className="hourly grid">
                <div className="hour grid">
                    <p className="hour-p ff-roboto">00:00</p>
                    <div className="liklihood">
                        <p className="likely">Likely</p>
                    </div>
                </div>
            </div> */}
            <Day data={location.data} lat={location.lat}/>
            {/* <div className="hourly grid">
                <div className="hour grid">
                    <p className="day-p">Monday</p>
                    <div className="liklihood">
                        <p className="unlikely">Unlikely</p>
                    </div>
                </div>
            </div> */}
            <div className="grid-stats grid">
                <div className="kp-index">
                    <p>KP-Index:</p>
                    <h2>{location.data[0].kpIndex}</h2>
                </div>
                <div className="clouds">
                    <p>Cloud Coverage:</p>
                    <h2>{location.data[0].cloudCoverage}%</h2>
                </div>
            </div>
            <div className="sunrise-sunset grid">
                <div className="sunrise">
                    <h2>Light from</h2>
                    <p>{location.data[0].sunrise}</p>
                </div>
                <div className="sunset">
                    <h2>Dark from</h2>
                    <p>{location.data[0].sunset}</p>
                </div>
            </div>
            {/* <div className="google-image">
                <img src="./images/map.jpg" alt=""/>
            </div> */}
        </div>
    </div>
        )
        })}
    </div>
    )
}

Card.propTypes = {
    deleteLocation: PropTypes.func.isRequired,
  }
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile,
    locationData: state.locationData
  })

export default connect(mapStateToProps, {deleteLocation})(Card)