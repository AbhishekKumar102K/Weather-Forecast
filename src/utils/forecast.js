const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=cb6520c20b314d813d06958288958f5b&query=' + lat + ',' + lon
    request({ url, json: true }, (error,{body}) => {
        // console.log(response.body.current)
        if(error)
            callback("Unable to connect to the weather service", undefined)
        else if (body.error)
            callback("Unable to find location",undefined)    
        else
            callback(undefined, "It is currently " + body.current.temperature + " degrees out. It feels like "+body.current.feelslike)
    })
}

module.exports = forecast