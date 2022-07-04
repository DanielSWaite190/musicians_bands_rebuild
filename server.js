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

app.get('/restaurants', async(request, response) => {
    response.json(await Band.findAll())
})

app.post('/restaurants', async(request, response) => {
    Band.create(request.body)
    response.json(await Band.findAll())
})

app.get('/test/:id', async(request, response) => {
    // const five = await Band.findByPk({
    //     where: {id: request.params.id}
    // })
    // response.json(five)
    const rw = await Band.findByPk(request.params.id)
    response.json(rw.name)

})

app.delete('/restaurants/:id', async(request, response) => {
    Band.destroy({
        where: {id: request.params.id}
    })
    response.json(await Band.findAll())
})