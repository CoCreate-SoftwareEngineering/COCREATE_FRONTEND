import React, {Fragment, Container, useState, useEffect} from 'react'
import Card from './Card'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {addLocation} from '../../actions/profile'
import {getLocationData} from '../../actions/profile'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'



const Body = ({addLocation, profile:{profile,loading,locations}, getLocationData}) => {
  const [locationData_li, setLocationData_li] = useState([])
  const location = profile.locations
  var counter = 0
  var i = 0
  console.log(location.length)
  useEffect(() => {
    for (i=0; i<location.length; i++) {
      console.log(counter)
      console.log(i)
      getLocationData(location[i].locationId, location[i].locationName, location[i].Lat, location[i].Lon).then(output => setLocationData_li(locationData_li => [...locationData_li, output]))
      console.log("working")
      counter += 1
      // setLocationData_li(...locationData_li, locationData)
    }
  }, [])

  console.log("Data")
  console.log(locationData_li)
  console.log(location)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    locatioName:'',
    latitude: '',
    longitude: '',
  })

  const {locationName, latitude, longitude} = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()
    addLocation({locationName, latitude, longitude})

    // if(!latitude){
    //   setAlert("Passwords do not match", "danger")
    // }
    // else{
    //   register({latitude, longitude})
    //   }
  }

  return (
    <Fragment>
      <section className="grid">

        <div className="btn-container">
          <button className="add-btn" onClick={handleShow}>
              <span className="add-text">Add</span>
              <i className="fa-solid fa-plus">
              </i>
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => onSubmit(e)}>
                <Form.Group className="mb-3 modal-content" controlId="formBasicName">
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control type="text" placeholder="Location...." name="locationName" value={locationName} onChange={e => onChange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3 modal-content" controlId="formBasicName">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type="text" placeholder="Latitude...." name="latitude" value={latitude} onChange={e => onChange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3 modal-content" controlId="formBasicName">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type="text" placeholder="Longitude...." name="longitude" value={longitude} onChange={e => onChange(e)}/>
                </Form.Group>
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text> */}
                
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Set Home" />
                </Form.Group> */}
                <Form.Group className="mb-3">
                  <Button variant="primary" onClick={handleClose} className="modal-add-btn" type="submit">
                    Add
                  </Button>
                </Form.Group>
               
            </Form>  
          </Modal.Body>
        </Modal>
      
      <Card locations={locationData_li}/>

      </section>
    </Fragment>
  )
}

Body.propTypes = {
  addLocation: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.object.isRequired,
  getLocationData: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile,
  locationData: state.locationData
})

export default connect(mapStateToProps, {addLocation, getLocationData})(Body)