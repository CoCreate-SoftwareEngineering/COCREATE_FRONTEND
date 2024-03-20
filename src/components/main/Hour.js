import React from 'react'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Hour = ({data, lat}) => {
    // console.log(location)
    const likelihood = true

    const isLikely = (data, lat, likelihood) => {
        const {time, sunrise, sunset, kpIndex, cloudCoverage} = data
        const timeVar = new Date()
        const sunriseVar = new Date()
        const sunsetVar = new Date()
        
        timeVar.setHours(time)
        sunriseVar.setHours(sunrise.split(":")[0], sunrise.split(":")[1])
        sunsetVar.setHours(sunset.split(":")[0], sunset.split(":")[1])

        console.log("GO")

        if(
            lat >= 60 && kpIndex >= 5 ||
            lat >= 62 && kpIndex >= 4 ||
            lat >= 65 && kpIndex >= 3 ||
            lat >= 68 && kpIndex >= 2 ||
            lat >= 70 && kpIndex >= 1
            // between certain coordinates dependant on k index and low cloud coverage and within dark hours
        ){
            if(timeVar < sunriseVar && timeVar < sunsetVar) {
                console.log("COOL")
                if(cloudCoverage < 5){
                    return likelihood = true
                }
                else {
                    return likelihood = false
                }
            }
            else {
                return likelihood = false
            }
        }
        else {
            return likelihood = false
        }
    }
  return (
      <div className="hourly grid">
      {data.map((entry) => {
          const isLikelyy = isLikely(entry, lat, likelihood)
          return (
                <div className="hour grid" key={entry}>
                    <p className="hour-p ff-roboto">{entry.time}:00</p>
                    <div className="liklihood">
                        <p className={isLikelyy ?"likely":"unlikely"}>{isLikelyy ? "Likely" : "Unlikely"}</p>
                    </div>
                </div>
          )
      })}
    </div>
  )
}

// Hour.propTypes = {
//     profile: PropTypes.object.isRequired,
//   }
  
//   const mapStateToProps = state => ({
//     profile: state.profile,
//   })

export default Hour