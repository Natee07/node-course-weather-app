const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6664aa31988521f1af91779e616c811&query=' + long + ',' + lat + '&units=m'

    request({ url, json: true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to weather service!')
        } 
        else if (body.error)
        {
            callback('Unable to find location')
        }
        else
        {
            const currentTemp = body.current.temperature
            const feelsLike = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            //callback(undefined, {currentTemp: currentTemp, description: description, feelsLike: feelsLike})
            callback(undefined, 'It is currently ' + currentTemp + ' degrees and ' + description + ' outside.  It feels like ' + feelsLike)
        }
    })
}


module.exports = forecast