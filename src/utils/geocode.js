const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaGFyaXNoa2F2YXRla2FyIiwiYSI6ImNrYTZocmpxeDA4bnIyd21udDI1Z3h0MTEifQ.lYW0VCkaYJL9fmghFtaeow&limit=1';

    request({url:url, json:true}, (error, response) => {
            const data = response.body;
            const featureData = data.features[0];
            if(error) {
                callback("error", undefined);
            } else {
               callback(undefined, featureData)
            }
        
        })
}

module.exports = geocode