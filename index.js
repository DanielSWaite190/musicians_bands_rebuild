const {Band} = require('./Band')
const {Song} = require('./Song')
const {Musician} = require('./Musician')

Musician.belongsTo(Band)
Band.hasMany(Musician)
Band.hasMany(Song)

module.exports = {Band, Song, Musician};