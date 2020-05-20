const request = require('request');

const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=af214e59dd3dee4dda70bc7671c54bbf&query='+ lattitude +','+ longitude
    request({url: url, json: true}, (error, response) => {
        const data = response.body.current;

        if(error) {
            callback("Cannot contact the server", undefined);
        } else {
            callback(undefined, data);
        }
    })
}

module.exports = forecast