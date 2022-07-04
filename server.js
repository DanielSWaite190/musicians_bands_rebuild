//Set the curent file name
const path = require('path');
const curentFile = path.basename(__filename);
const {Band, Musician} = require('./index')

//Express configuration
const express = require('express');
const app = express()
const port = 3000;

//Inishiate server
app.listen(port, () => {console.log(`musicians-bands(rebuilt) app, ${curentFile}`)})

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Routes
app.get('/', (request, response) => {
    response.json("Hi Mom")
})
app.post('/restaurants', async(request, response) => {
    Band.create(request.body)
    Band.create({danile: "is da best"})
    response.json(await Restaurant.findAll())
})