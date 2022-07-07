const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        Band.create({name: "Insync", showCount: 50})
        const actual = await Band.findByPk(1)
        
        expect(actual.name).toBe("Insync");
        expect(actual.showCount).toBe(50); // <-- testing showCount 
    })

    test('can create a Musician', async () => {
        Musician.create({name: "Justin Timberlake"})
        const actual = await Musician.findByPk(1)
        expect(actual.name).toBe("Justin Timberlake");

    })

    test('can change a Band', async () => {
        Band.update({name: "Maroon 5"},{
            where: {id: 1}
        })
        const actual = await Band.findByPk(1)
        expect(actual.name).toBe("Maroon 5");
    })
    
    test('can remove a Band', async () => {
        Band.destroy({
            where: {id: 1}
        })
        const actual = await Band.findByPk(1)
        expect(actual).toBe(null);
    })

    test('can create a Song', async () => {
        Song.create({title: "Stronger", year: 2007})
        const actual = await Song.findByPk(1)
        expect(actual.title).toBe("Stronger");
        expect(actual.year).toBe(2007);
    })

    test('Band can have many songs', async () => {
        let linkinPark = await Band.create({name: 'Linkin Park' , genre: 'Hard Rock', showCount: 74})
        let newDivide = await Song.create( {title: 'newDivide' , year: 2009})
        let WhatIveDone = await Song.create( {title: 'What I\'ve Done' , year: 2007})

        await linkinPark.addSong(newDivide)
        await linkinPark.addSong(WhatIveDone)

        const songs = await linkinPark.getSongs()
        expect(songs.length).toBe(2)
    })

    test('Band can have many songs', async () => {
        let selena = await Band.create({name: 'Selena Gomez And The Scene' , genre: 'Pop', showCount: 13})
        let love = await Song.create( {title: 'Love You Like A Love Song' , year: 2011})
        let rr = await Song.create( {title: 'Round & Round' , year: 2010})

        await selena.addSong(love)
        await selena.addSong(rr)

        s = await Musician.create({ name: 'Selena', instrument: 'Voice' })
        selena.addMusician(s)

        const songs = await selena.getSongs()
        const musicians = await selena.getMusicians()

        expect(songs.length).toBe(2)
        expect(musicians.length).toBe(1)
    })

    test('Band can have many Musicians', async () => {
        await sequelize.sync({ force: true }); // recreate db
        let BigBang = await Band.create({ name: 'BIGBANG', genre: 'KPOP' }); //create band
        let GD = await Musician.create({ name: 'G-Dragon', instrument: 'Voice' }); //create musician
        let Top = await Musician.create({ name: 'TOP', instrument: 'Voice' }); //create musician
    
        await BigBang.addMusician(GD); //add musician to band
        await BigBang.addMusician(Top); //add musician to band
    
        const musicians = await BigBang.getMusicians(); //get all musicians in band - returns an array
    
        expect(musicians.length).toBe(2); //we've added two musicians, so the length should be two
        expect(musicians[0] instanceof Musician).toBeTruthy; //checks that the value at index 0 of the list - a musician object, is in fact a musician object
      });
})