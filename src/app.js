const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek Kumar'
    })
})

app.get('/help',(req,res)=> {
    res.render('help', {
        msg: 'This is the help section. How may I help you?',
        title: 'Help',
        name: 'Abhishek Kumar'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About Me',
        name: 'Abhishek Kumar'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=> {
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error,forecastData)=> {
            if(error)
                return res.send({error})

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})




app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Abhishek Kumar',
        errorMsg: 'Help article not found.'
    })
})  


app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Abhishek Kumar',
        errorMsg: 'Page not found'
    })
})  


app.listen(3000, ()=> {
    console.log('Server up')
})