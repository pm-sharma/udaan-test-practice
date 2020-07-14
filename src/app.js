const path = require('path')
const express = require('express')
const bodyParser= require('body-parser')
const hbs = require('hbs')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 4000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Importing routers
const userRouter = require('./routers/user')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
// Registering routers
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is Running! on ' + port)
})