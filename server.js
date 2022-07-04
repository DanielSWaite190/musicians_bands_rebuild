//  FOR ADDITIONAL TESTING PURPOSES
const {Band, Musician} = require('./index')
const express = require('express');
const path = require('path');

const curentFile = path.basename(__filename);
const app = express()
const port = 3000;

app.listen(port, () => {console.log(`musicians-bands(rebuilt) app, ${curentFile}`)})

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.get('/', (request, response) => {
    response.json("Hi Mom")
})
app.get('/restaurants', async(request, response) => {
    response.json(await Band.findAll())
})
app.post('/restaurants', async(request, response) => {
    Band.create(request.body)
    response.json(await Band.findAll())
})
app.delete('/restaurants/:id', async(request, response) => {
    Band.destroy({
        where: {id: request.params.id}
    })
    response.json(await Band.findAll())
})