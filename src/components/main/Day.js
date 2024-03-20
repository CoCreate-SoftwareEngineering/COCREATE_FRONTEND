import React, {useState} from 'react'

const Day = ({data, lat}) => {
    const likelihood = true
    // const unlikely = () => setLikelihood(false)
    // const likely = () => setLikelihood(true)

    console.log("DAY--")
    console.log(data)

    // Creates object for each unique date
    var counter = 0
    const uniqueDates = [{date: data[0].date, kpIndex: [], cloudCoverage:[]}];
        for(var i=0;i<data.length;i++){
            console.log(uniqueDates[0]);
            if(!uniqueDates[counter].date.includes(data[i].date)){
                uniqueDates.push({date: data[i].date, kpIndex: [], cloudCoverage:[]});
                counter += 1
                console.log(counter)
            }
        }
    console.log("Unique Dates")
    console.log(uniqueDates)

    // Adds values to each date
    for(var j=0;j<uniqueDates.length;j++){
        for(var i=0;i<data.length;i++){
            if(data[i].date == uniqueDates[j].date){
                uniqueDates[j].kpIndex.push(data[i].kpIndex)
                uniqueDates[j].cloudCoverage.push(data[i].cloudCoverage)
            }
        }
    }

    console.log(uniqueDates)

    var averageUniqueDates = []

    for (var i=0;i<uniqueDates.length;i++){
        const kpIndex = uniqueDates[i].kpIndex.map(Number)
        const cloudCoverage = uniqueDates[i].cloudCoverage
        const averageKpIndex = (kpIndex) => Math.round(kpIndex.reduce((a, b) => a + b) / kpIndex.length)
        const averageCloud = (cloudCoverage) => Math.round(cloudCoverage.reduce((a, b) => a + b) / cloudCoverage.length)
        averageUniqueDates.push({date: uniqueDates[i].date, kpIndex: averageKpIndex(kpIndex), cloudCoverage: averageCloud(cloudCoverage)});
    }

    console.log("Average Dates")
    console.log(averageUniqueDates)
    

    const isLikely = (data, lat, likelihood) => {
        const {kpIndex, cloudCoverage} = data
        // const timeVar = new Date()
        // const sunriseVar = new Date()
        // const sunsetVar = new Date()
        
        // timeVar.setHours(time)
        // sunriseVar.setHours(sunrise.split(":")[0], sunrise.split(":")[1])
        // sunsetVar.setHours(sunset.split(":")[0], sunset.split(":")[1])

        // console.log("GO")
        if(
            lat >= 60 && kpIndex >= 5 ||
            lat >= 62 && kpIndex >= 4 ||
            lat >= 65 && kpIndex >= 3 ||
            lat >= 68 && kpIndex >= 2 ||
            lat >= 70 && kpIndex >= 1
            
            // between certain coordinates dependant on k index and low cloud coverage and within dark hours
        ){
            if(cloudCoverage < 5){
                likelihood = true
                return likelihood = true
            }
            else {
                likelihood = false
                return likelihood = false
            }
        }
        else {
            likelihood = false
            return likelihood = false
        }
    }
        
  return (
    <div className="hourly grid">
        {averageUniqueDates.map((entry) => {
            const isLikelyy = isLikely(entry, lat, likelihood)
            return(
                <div className="hour grid" key={entry}>
                    <p className="day-p">{entry.date}</p>
                    <div className="liklihood">
                        <p className={isLikelyy?"likely":"unlikely"}>{isLikelyy ? "Likely" : "Unlikely"}</p>
                    </div>
                </div>
            )
        })}
        
    </div>
  )
}

export default Day