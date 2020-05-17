const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {title: "Weather app!", name: "Nathan"})
})


app.get('/help', (req, res) => {
    res.render('help', {title: "Help page", name: "Nathan"})
})

app.get('/about', (req, res) => {
    res.render('about', {title: "About page", name: "Nathan"})
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "Please provide an address for the forecast!"
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {

        if(error) {
            return res.send({error})
        }
    
        forecast(lat, long, (error, forecastData) => {
    
            if(error) {
                return res.send({ error })
            }
            
            res.send({
                location: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {title: "404", errorMessage: "help articile not found", name: "Nathan"})
})

app.get('*', (req, res) => {
    res.render('404', {title: "404", errorMessage: "Can't find that page", name: "Nathan"})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
