//  FOR ADDITIONAL TESTING PURPOSES
const {Band, Musician, Song} = require('./index')
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
app.get('/bands', async(request, response) => {
    response.json(await Band.findAll())
})
app.post('/bands', async(request, response) => {
    Band.create(request.body)
    response.json(await Band.findAll())
})

app.put('/bands/:id', async(request, response) => {
    Band.update(request.body,{
        where: {id: request.params.id}
    })
    response.json(await Band.findAll())
})


app.get('/allsongs', async(request, response) => {
    let linkinPark = await Band.create({name: 'Linkin Park' , genre: 'Hard Rock', showCount: 74})
    let newDivide = await Song.create( {title: 'newDivide' , year: 2009})
    let WhatIveDone = await Song.create( {title: 'What I\'ve Done' , year: 2007})

    await linkinPark.addSong(newDivide)
    await linkinPark.addSong(WhatIveDone)
    
    let selena = await Band.create({name: 'Selena Gomez And The Scene' , genre: 'Pop', showCount: 13})
    let love = await Song.create( {title: 'Love You Like A Love Song' , year: 2011})
    let rr = await Song.create( {title: 'Round & Round' , year: 2010})

    await selena.addSong(love)
    await selena.addSong(rr)

    // //response.json(await linkinPark.getSongs())


    s = await Musician.create({ name: 'Selena', instrument: 'Voice' })
    selena.addMusician(s)

    response.json(await Band.findAll({
        include: [
            {model: Musician},
            {model: Song}
        ]
    }));
})



app.delete('/bands/:id', async(request, response) => {
    Band.destroy({
        where: {id: request.params.id}
    })
    response.json(await Band.findAll())
})