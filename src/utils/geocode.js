const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmF0ZWUwNyIsImEiOiJja2ExczVjamgwMjJzM21tZGFjdXB5cXYwIn0.AAMdlwvQQkSgvi64xVkEnw'

    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Unable to find location.  Try another search')
        } else {
            const lat = body.features[0].center[0]
            const long = body.features[0].center[1]
            const placeName = body.features[0].place_name
            callback(undefined, {lat: lat, long: long, name: placeName})
            //console.log("Lat is " + lat + " and long is " + long)
        }
    })
}

module.exports = geocode