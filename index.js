const {Band} = require('./Band')
const {Song} = require('./Song')
const {Musician} = require('./Musician')

/**
 * TODO: Create assoications between Musician and Band models
 * 
 *  Clue#1:  Each musician instance must belong to a band
 *  Clue#2: Bands can have multiple musicians
 * 
 *  To complete this task, you'll have to use the functions .belongsTo() and .hasMany() 
 */

Musician.belongsTo(Band)
Band.hasMany(Musician)
Song.hasMany(Band)

module.exports = {
    Band,
    Song,
    Musician
};