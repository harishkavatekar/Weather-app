const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Harish Kavatekar'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Harish Kavatekar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name: 'Harish Kavatekar',
        message:'This os help message'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({
            error:"You must provide a location"
        })
    }

    geocode(address, (error, {center = [], place_name} = {})=> {
        let [latitude,longitude] = center;
    
        if(error) {
        return  res.send({
            error: error
        })
        }

        forecast(longitude, latitude, (error, {weather_descriptions = [], temperature, feelslike} = {}) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            if(weather_descriptions === undefined || temperature === undefined || feelslike === undefined) {
                return res.send({
                    error: "Invalid Location"
                })
            } else {
                res.send({
                    forecast: `${weather_descriptions[0]}. It is currently ${temperature} degrees out, but it feels like ${feelslike} degrees`,
                    location: place_name
                })
            }
            
            // console.log(place_name);
            // console.log(`${weather_descriptions[0]}. It is currently ${temperature} degrees out, but it feels like ${feelslike} degrees`);
        })
    })

})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        errormessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errormessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})